/**
 * Cloudflare Pages Function: recibe el formulario de contacto de la web,
 * lo guarda en Supabase (tabla public.web_leads) y avisa por correo con Resend.
 *
 * Los dos destinos son independientes y se intentan siempre los dos: basta con
 * que UNO funcione para dar el envío por bueno, de modo que un fallo de Resend
 * no pierde el contacto y un fallo de Supabase tampoco.
 *
 * Variables de entorno (Cloudflare → Settings → Environment variables):
 *   SUPABASE_URL       — https://mvqtgrmamxbxzbtxieez.supabase.co
 *   SUPABASE_ANON_KEY  — clave anon del proyecto (es pública por diseño; la
 *                        tabla solo admite INSERT, no se puede leer con ella).
 *   RESEND_API_KEY     — clave de API de Resend (secreto).
 *   CONTACT_TO         — destinatario. Por defecto manuelmoreira@datuva.es
 *   CONTACT_FROM       — remitente verificado en Resend. Por defecto web@datuva.es
 *
 * Si no hay ninguna de las dos configuradas, responde 503 y el diálogo del
 * navegador muestra el correo y el teléfono directos.
 */

interface Env {
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
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

/** Valor tal cual para guardar en base de datos: recortado y acotado. */
const recortar = (valor: unknown, maxLongitud: number) =>
  String(valor ?? "").trim().slice(0, maxLongitud);

/** Escapa el texto que se incrusta en el HTML del correo. */
const escapar = (valor: string) =>
  valor.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const ES_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Inserta el lead en public.web_leads vía PostgREST. Devuelve true si se guardó. */
async function guardarEnSupabase(env: Env, lead: Record<string, string>) {
  try {
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/web_leads`, {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_ANON_KEY as string,
        Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        nombre: lead.nombre,
        bodega: lead.bodega || null,
        email: lead.email,
        telefono: lead.telefono || null,
        mensaje: lead.mensaje || null,
        origen: lead.origen || null,
      }),
    });
    if (!res.ok) {
      console.error("Supabase rechazó el lead", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Fallo al guardar en Supabase", err);
    return false;
  }
}

/** Envía el aviso por correo con Resend. Devuelve true si se envió. */
async function avisarPorCorreo(env: Env, lead: Record<string, string>) {
  const filas = [
    ["Nombre", lead.nombre],
    ["Bodega", lead.bodega],
    ["Correo", lead.email],
    ["Teléfono", lead.telefono],
    ["Origen", lead.origen],
  ]
    .filter(([, valor]) => valor)
    .map(
      ([etiqueta, valor]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6b6b6b;white-space:nowrap">${etiqueta}</td>` +
        `<td style="padding:6px 0;font-weight:600">${escapar(valor)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;color:#1c1c1c">
      <h2 style="margin:0 0 18px;font-size:18px">Nueva solicitud desde datuva.es</h2>
      <table style="border-collapse:collapse;font-size:15px">${filas}</table>
      ${
        lead.mensaje
          ? `<div style="margin-top:22px;padding:16px;background:#f5f0e8;border-radius:12px;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapar(
              lead.mensaje
            )}</div>`
          : ""
      }
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM || "Web Datuva <web@datuva.es>",
        to: [env.CONTACT_TO || "manuelmoreira@datuva.es"],
        reply_to: lead.email,
        subject: `Datuva · ${lead.nombre}${lead.bodega ? ` — ${lead.bodega}` : ""}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Resend devolvió un error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Fallo al contactar con Resend", err);
    return false;
  }
}

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

  // Bot detectado: respondemos 200 para no darle pistas, pero no guardamos nada.
  if (cuerpo.website) return json({ ok: true });

  const lead = {
    nombre: recortar(cuerpo.nombre, 120),
    bodega: recortar(cuerpo.bodega, 160),
    email: recortar(cuerpo.email, 200),
    telefono: recortar(cuerpo.telefono, 40),
    mensaje: recortar(cuerpo.mensaje, 4000),
    origen: recortar(cuerpo.origen, 80),
  };

  if (!lead.nombre) return json({ error: "El nombre es obligatorio." }, 400);
  if (!ES_EMAIL.test(lead.email)) return json({ error: "El correo no es válido." }, 400);

  const hayBaseDatos = !!(env.SUPABASE_URL && env.SUPABASE_ANON_KEY);
  const hayCorreo = !!env.RESEND_API_KEY;
  if (!hayBaseDatos && !hayCorreo) {
    return json({ error: "El formulario todavía no está configurado en el servidor." }, 503);
  }

  // Se lanzan en paralelo: ninguno depende del otro.
  const [guardado, avisado] = await Promise.all([
    hayBaseDatos ? guardarEnSupabase(env, lead) : Promise.resolve(false),
    hayCorreo ? avisarPorCorreo(env, lead) : Promise.resolve(false),
  ]);

  if (!guardado && !avisado) {
    return json({ error: "No se pudo registrar el mensaje." }, 502);
  }

  // Si el correo falló pero el lead quedó guardado, avisamos en el log: hay que
  // mirar la tabla porque no habrá llegado ninguna notificación a la bandeja.
  if (guardado && !avisado) {
    console.warn("Lead guardado en web_leads pero SIN aviso por correo", lead.email);
  }

  return json({ ok: true, guardado, avisado });
};
