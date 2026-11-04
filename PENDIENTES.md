# Pendientes — datuva.es

Última actualización: 7 de agosto de 2026.

---

## 1. Secreto de Resend para recibir el aviso por correo — PENDIENTE

Sin esto **el lead se guarda igual** en `web_leads`, pero no llega ningún correo y
hay que mirar la tabla a mano.

**Supabase → Edge Functions → Secrets → New secret:**

```
RESEND_API_KEY = (la clave de API de Resend)
```

No hace falta redesplegar la función: los secretos se leen en cada invocación.

Requisito adicional: el dominio del remitente (`web@datuva.es`) tiene que estar
**verificado en Resend**, o Resend rechazará el envío aunque la clave sea válida.

**Cómo comprobar que funciona:** enviar el formulario y mirar
Supabase → Edge Functions → `contacto-web` → Logs. Si aparece
`lead guardado en web_leads SIN aviso por correo`, el secreto falta o el dominio
no está verificado.

---

## 2. Terminar la migración a Cloudflare Workers — OPCIONAL

Hoy la web la publica **GitHub Pages** (`.github/workflows/deploy-pages.yml`).
La configuración de Workers está lista y verificada en local, pero **nunca se ha
desplegado**. Ver el apartado «Despliegue» del README.

Mientras no se haga, `functions/api/contacto.ts` no se ejecuta. No es un problema:
el formulario usa la Edge Function de Supabase, que funciona igual desde cualquier
hosting.

Si algún día se completa:

1. `npx wrangler deploy` desde una máquina autenticada, o conectar `datuva-web` a
   Git en Cloudflare (Workers → Builds).
2. Apuntar el dominio a Cloudflare y desactivar el workflow de GitHub Pages.
   **No dejar los dos activos**: se pisan.
3. Opcional: `VITE_CONTACT_ENDPOINT=/api/contacto` para volver a la Pages Function
   en lugar de la de Supabase.

---

## 3. `og-image.png` pesa 1,1 MB — PENDIENTE

Por encima de unos 300 KB, WhatsApp no renderiza la miniatura al compartir el
enlace. Siendo WhatsApp un canal de captación, conviene comprimirla.

Objetivo: menos de 300 KB manteniendo 1200×630.

---

## 4. `www.datuva.es` vs `datuva.es` — PENDIENTE

Incoherencia de dominio canónico:

- El workflow escribe `www.datuva.es` en el `CNAME`.
- `index.html` declara `<link rel="canonical" href="https://datuva.es">` (sin www).
- `sitemap.xml` lista las URL sin www.

Para Google son dos sitios distintos. Hay que elegir uno y redirigir el otro.

---

## 5. El precio no indica si lleva IVA — MENOR

`ROISection.tsx` dice «desde 150 €/mes». En B2B español lo habitual es precisar
«+ IVA». Decisión comercial, no técnica.

---

## 6. Assets sin usar en el repositorio — MENOR

No afectan al bundle (Vite solo empaqueta lo que se importa), pero engordan el
repositorio:

- `src/assets/datuva-logo.jpg` — 1,7 MB
- `src/assets/hero-bodega.jpg` — 2,3 MB
- `src/assets/hero-vineyard.jpg`, `app-screenshot-login.jpg`

---

## Hecho y verificado

- Copy de SILICIE / INFOVI / libros JCyL precisada: Datuva **prepara y exporta**,
  la presentación la hace la bodega o su gestoría. Antes la web contradecía a los
  propios Términos y Condiciones.
- Diálogo de contacto sustituyendo los enlaces `mailto:`, que en móvil sin cliente
  de correo no hacían nada.
- Tabla `public.web_leads` con RLS de solo inserción. Verificado contra la base de
  datos: el rol `anon` inserta pero lee 0 filas.
- Edge Function `contacto-web` desplegada: guarda el lead y avisa por Resend.
- Home rehecha: rejilla de módulos con capturas reales de la app en lugar de diez
  secciones de pantalla completa idénticas.
- Paleta corregida: `--primary` era morado (301) y ahora es el azul de la marca.
- `logo.png` creado; los dos bloques de Schema.org apuntaban a un 404.
- Node 22 en el runner: wrangler 4 no funciona con Node 20.
