/**
 * Cloudflare Pages Function: recibe el formulario de contacto de la web
 * y lo reenvía por correo a Datuva mediante la API de Resend.
 *
 * Variables de entorno necesarias (Cloudflare → Settings → Environment variables):
 *   RESEND_API_KEY  — clave de API de Resend (secreto).
 *   CONTACT_TO      — destinatario. Por defecto manuelmoreira@datuva.es
 *   CONTACT_FROM    — remitente verificado en Resend. Por defecto web@datuva.es
 *
 * Sin RESEND_API_KEY la función responde 503 y el diálogo del navegador muestra
 * el correo y el teléfono directos, de modo que nunca se pierde un contacto.
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

interface Cuerpo {
  nombre?: string;
  bodega?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
  origen?: string;
  /** Honeypot: si viene relleno, es un bot. */
  website?: string;
}

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });

/** Recorta y escapa el texto que se incrusta en el HTML del correo. */
const limpiar = (valor: unknown, maxLongitud = 2000) =>
  String(valor ?? "")
    .trim()
    .slice(0, maxLongitud)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const ES_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;

  let cuerpo: Cuerpo;
  try {
    cuerpo = await request.json();
  } catch {
    return json({ error: "Cuerpo de la petición no válido." }, 400);
  }

  // Bot detectado: respondemos 200 para no darle pistas, pero no enviamos nada.
  if (cuerpo.website) return json({ ok: true });

  const nombre = limpiar(cuerpo.nombre, 120);
  const email = limpiar(cuerpo.email, 200);

  if (!nombre) return json({ error: "El nombre es obligatorio." }, 400);
  if (!ES_EMAIL.test(email)) return json({ error: "El correo no es válido." }, 400);

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return json(
      { error: "El formulario todavía no está configurado en el servidor." },
      503
    );
  }

  const destinatario = env.CONTACT_TO || "manuelmoreira@datuva.es";
  const remitente = env.CONTACT_FROM || "Web Datuva <web@datuva.es>";

  const bodega = limpiar(cuerpo.bodega, 160);
  const telefono = limpiar(cuerpo.telefono, 40);
  const mensaje = limpiar(cuerpo.mensaje, 4000);
  const origen = limpiar(cuerpo.origen, 80);

  const filas = [
    ["Nombre", nombre],
    ["Bodega", bodega],
    ["Correo", email],
    ["Teléfono", telefono],
    ["Origen", origen],
  ]
    .filter(([, valor]) => valor)
    .map(
      ([etiqueta, valor]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6b6b6b;white-space:nowrap">${etiqueta}</td>` +
        `<td style="padding:6px 0;font-weight:600">${valor}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;color:#1c1c1c">
      <h2 style="margin:0 0 18px;font-size:18px">Nueva solicitud desde datuva.es</h2>
      <table style="border-collapse:collapse;font-size:15px">${filas}</table>
      ${
        mensaje
          ? `<div style="margin-top:22px;padding:16px;background:#f5f0e8;border-radius:12px;font-size:15px;line-height:1.6;white-space:pre-wrap">${mensaje}</div>`
          : ""
      }
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: remitente,
        to: [destinatario],
        reply_to: email,
        subject: `Datuva · ${nombre}${bodega ? ` — ${bodega}` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      const detalle = await res.text();
      console.error("Resend devolvió un error", res.status, detalle);
      return json({ error: "No se pudo enviar el mensaje." }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("Fallo al contactar con Resend", err);
    return json({ error: "No se pudo enviar el mensaje." }, 502);
  }
};
