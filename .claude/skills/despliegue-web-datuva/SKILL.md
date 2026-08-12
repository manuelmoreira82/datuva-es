---
name: despliegue-web-datuva
description: Cómo se publica realmente datuva.es y qué verificar antes de tocarlo. Úsalo antes de modificar o borrar .github/workflows/, wrangler.jsonc, functions/, el CNAME o el script de build, y siempre que la tarea hable de deploy, hosting, dominio, canonical, sitemap o de que la web no se actualiza.
---

# Despliegue de la web — verificar antes de tocar

## La regla, escrita con sangre

**Verifica el mecanismo de despliegue REAL antes de tocarlo. No te fíes de la
documentación, ni siquiera de este archivo.**

Este repo decía «Cloudflare Pages» en su README y en realidad publicaba por GitHub
Pages. Alguien borró el workflow creyendo que Cloudflare ya publicaba y **la web se
quedó congelada**.

## Lo que hace hoy — verificado ago-2026

**Publica GitHub Pages.** `.github/workflows/deploy-pages.yml`, al hacer push a `main`.

- Dominio `www.datuva.es`, vía el `CNAME` que **escribe el propio workflow**.
- **Node 22** en el runner: wrangler 4 exige ≥ 22 y con Node 20 falla.
- El workflow **borra `dist/_worker.js`** antes de subir. Es correcto: GitHub Pages es
  estático y no lo ejecutaría; subirlo solo publicaría el código de servidor como un
  archivo descargable.

### Consecuencias que hay que tener presentes

- **`functions/api/contacto.ts` NO se ejecuta.** No lo depures esperando que corra.
- **`wrangler.jsonc` describe un Worker con assets (`datuva-web`) preparado pero nunca
  desplegado.** Que exista no significa que publique. **No borres el workflow de GitHub
  Pages pensando que Cloudflare ya se encarga: no lo hace.**

## El formulario de contacto no pasa por el hosting

Va a la **Edge Function `contacto-web`** del proyecto Supabase `mvqtgrmamxbxzbtxieez`
(la misma base de datos que la app), **no** a `/api/contacto`. Guarda en
`public.web_leads` y avisa por Resend. Funciona desde cualquier hosting estático, así
que un cambio de hosting no lo rompe.

- `web_leads` **no es multi-tenant a propósito**: son prospectos de Datuva, no datos de
  bodegas. Sin `organization_id`. RLS con una única política de `INSERT`: no se puede
  leer desde el navegador, solo desde el panel de Supabase.
- **El diálogo no se fía de `res.ok`:** exige un JSON con `ok: true`. Una ruta
  inexistente devuelve el HTML de la SPA con un 200 y daría un éxito falso. **No
  simplifiques esa comprobación.**
- Pendiente conocido: el secreto `RESEND_API_KEY` en Supabase. Sin él **el lead se
  guarda igual** pero no llega el correo. Se ve en los logs de la Edge Function:
  `lead guardado en web_leads SIN aviso por correo`.

## Dominio canónico — incoherencia sin resolver

- El workflow escribe **`www.datuva.es`** en el `CNAME`.
- `index.html` declara `<link rel="canonical" href="https://datuva.es">` (sin www).
- `sitemap.xml` lista las URL **sin www**.

Para Google son dos sitios distintos. Hay que **elegir uno y redirigir el otro**; es una
decisión pendiente, no la tomes tú sola sobre la marcha. Si tocas cualquiera de los
tres, alinéalos a la vez.

## Si algún día se migra a Cloudflare Workers

1. `npx wrangler deploy` desde una máquina autenticada, o conectar `datuva-web` a Git
   en Cloudflare (Workers → Builds).
2. Apuntar el dominio a Cloudflare y **desactivar el workflow de GitHub Pages**.
   **No dejar los dos activos: se pisan.**
3. Opcional: `VITE_CONTACT_ENDPOINT=/api/contacto` para volver a la Pages Function.

## Antes de dar un cambio por bueno

`npm run build` y `npx tsc --noEmit` en limpio, y comprobar la URL real de producción
—no que el workflow haya terminado en verde.
