---
name: web-datuva
description: Punto de entrada para trabajar la landing comercial datuva.es — contenido, secciones, diseño, SEO, despliegue y formulario de contacto. Úsalo para cualquier tarea sobre la web pública; reúne y ordena las skills de copy, identidad visual y despliegue.
---

# Web — datuva.es (landing comercial)

> **Antes de tocar nada, carga las tres skills de la web** según lo que vayas a hacer.
> Esta zona no las sustituye, las coordina:
> - `copy-comercial-datuva` — qué se puede prometer (SIEMPRE que escribas texto visible).
> - `identidad-visual-datuva` — paleta y tokens (SIEMPRE que toques diseño o componentes).
> - `despliegue-web-datuva` — cómo se publica de verdad (antes de tocar deploy/dominio).
>
> Si la sesión también tiene el repo bodega-djp, carga además `datuva-manual-operativo`
> (reglas transversales y cómo trabaja el usuario).

## Tu mandato

- **Posees**: la landing pública `datuva.es` — sus secciones, copy, diseño, SEO, meta
  tags, y el flujo del formulario de contacto en el frontend.
- **Cómo**: trabajar SIEMPRE en rama. `main` va **directo a producción**, no hay URL de
  preview de ninguna rama — para revisar visualmente antes de mergear se usan capturas
  en local (`node scripts/preview-shots.mjs`). No introducir librerías nuevas sin
  proponerlo.
- **NO haces sin pedirlo / sin derivar**:
  - Copy que roce SILICIE/INFOVI/EMCS/JCyL/Hacienda/cumplimiento → valídalo con **Legal**;
    la regla dura es que Datuva prepara y exporta, NUNCA presenta.
  - Cambiar el precio publicado («desde 150 €/mes») → es decisión del fundador, coordina
    con **Ventas y Marketing**.
  - El backend del formulario (Edge Function `contacto-web`, tabla `web_leads`) NO es de
    esta zona: es de **Desarrollo** / **Incidentes**. Tú posees el formulario en el
    frontend, no lo que pasa en el servidor.

## Qué es la web (verificado)

- **Stack**: Vite + React + TS + Tailwind + shadcn/ui. Repo `manuelmoreira82/datuva-es`,
  **público** (GitHub Pages gratis no sirve repos privados) — no meter secretos.
- **6 rutas públicas** (`src/App.tsx`): `/` (Index), `/terminos`, `/privacidad`,
  `/aviso-legal`, `/politica-cookies`, `/presentacion`. `*` → NotFound.
- **Despliegue**: **GitHub Pages** vía `.github/workflows/deploy-pages.yml` en cada push
  a `main` (NO Cloudflare, pese a config `wrangler.jsonc` preparada y nunca desplegada).
  Dominio `www.datuva.es` por CNAME + apex `datuva.es`, DNS en DonDominio. Ver la skill
  `despliegue-web-datuva` para el detalle y las trampas — no fiarse de la documentación
  antigua, ya congeló la web una vez.
- **Formulario de contacto**: va a la Edge Function `contacto-web` de Supabase
  (`mvqtgrmamxbxzbtxieez`), guarda en `web_leads` y avisa por Resend. El diálogo exige
  un JSON `{ ok:true }`, no se fía del status 200. `web_leads`: 0 filas a 27-ago-2026.

## Trampas conocidas de la web

- **`og-image.png` pesa 1,1 MB** — por encima de ~300 KB WhatsApp no muestra miniatura
  al compartir, y WhatsApp es canal de captación. Objetivo: < 300 KB a 1200×630.
- **Canónico incoherente**: el CNAME usa `www.datuva.es`, pero el `<link canonical>` de
  `index.html` y el `sitemap.xml` usan `datuva.es` sin www. Para Google son dos sitios;
  hay que elegir uno. Sin decidir.
- **Sin analítica de ningún tipo** en la web (ni GA/GTM/Plausible/Meta Pixel/etc.) y sin
  captura de UTM ni `referrer` — hoy es imposible saber qué canal trae visitas. Hay una
  migración de atribución diseñada pero sin aplicar (ver `desarrollo-datuva`).
- Assets pesados sin usar en `src/assets` (logo 1,7 MB, hero 2,3 MB) — no afectan al
  bundle (Vite solo empaqueta lo importado) pero engordan el repo; no borrarlos sin
  comprobar que nadie los importa.

## Recordatorio de identidad (detalle en `identidad-visual-datuva`)

Negro `#0B0A14` · dorado `#C9A227` · cream `#F5F0E8` · azul `#1B2A4A` · vino `#7C2D3E`.
**Nada de morados** (hue 270-320 en un token de marca es un bug). Clases Tailwind, no
hex sueltos. Playfair Display + Inter.

*(añade aquí cada cambio real que se haga en la web, con fecha)*
