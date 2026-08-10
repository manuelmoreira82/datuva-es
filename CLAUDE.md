# CLAUDE.md — datuva.es (web comercial)

## Inicio de sesión
**Lee primero `PENDIENTES.md`** (raíz del repo): estado actual y lo que queda por hacer.
Este repo es la **landing comercial**. La aplicación es otro repo: `manuelmoreira82/bodega-djp`,
que tiene su propio `CLAUDE.md` con las reglas de la app y el protocolo de razonamiento.

## Qué es este proyecto
Landing de Datuva, SaaS de gestión para bodegas españolas. Vite + React + TS + Tailwind
+ shadcn/ui. Clientes de pago: lo que se publica aquí es material comercial público.

## REGLAS NO NEGOCIABLES

1. **Nunca prometer que Datuva presenta declaraciones.** Datuva **prepara y exporta**
   SILICIE, INFOVI y libros JCyL; **la presentación la hace la bodega o su gestoría**.
   No existe presentación telemática. Los Términos y Condiciones ya lo dicen: la web
   no puede contradecirlos. Aplica también a EMCS.
2. **Trabajar siempre en rama.** `main` despliega producción.
3. **No introducir librerías nuevas** sin proponerlo antes.
4. **Antes de tocar el despliegue, verificar el mecanismo REAL** (ver abajo). Este
   README ya estuvo equivocado una vez y costó dejar la web congelada.

## Despliegue — VERIFICADO ago-2026

**Publica GitHub Pages**, no Cloudflare Pages, pese a lo que decía el README antiguo:
`.github/workflows/deploy-pages.yml` al hacer push a `main`. Dominio `www.datuva.es`
vía el `CNAME` que escribe el propio workflow. **Node 22** (wrangler 4 exige ≥ 22).

- El workflow borra `dist/_worker.js` antes de subir: GitHub Pages es estático y no lo
  ejecutaría; subirlo solo publicaría el código de servidor como archivo descargable.
- **Consecuencia:** `functions/api/contacto.ts` **NO se ejecuta**.
- `wrangler.jsonc` describe un Worker con assets (`datuva-web`) **preparado pero nunca
  desplegado**. No borrar el workflow pensando que Cloudflare ya publica: no lo hace.

## Formulario de contacto
Va a la **Edge Function `contacto-web`** del proyecto Supabase `mvqtgrmamxbxzbtxieez`
(la misma BD que la app), NO a `/api/contacto`. Guarda en `public.web_leads` y avisa por
Resend. Funciona desde cualquier hosting estático.

- `web_leads` **no es multi-tenant**: son prospectos de Datuva, no datos de bodegas. Sin
  `organization_id` a propósito. RLS con una única política de `INSERT`: no se puede leer
  desde el navegador, solo desde el panel de Supabase.
- El diálogo **no se fía de `res.ok`**: exige un JSON con `ok:true`. Una ruta inexistente
  devuelve el HTML de la SPA con 200 y daría un éxito falso.

## Identidad visual
Negro `#0B0A14` · dorado `#C9A227` · cream `#F5F0E8` · azul oscuro `#1B2A4A`
(`--primary`) · vino `#7C2D3E` (`--bordeaux`).
**No volver a meter morados:** `--primary` estuvo en hue 301 y pintaba todos los
titulares y CTAs de un color que no es de la marca.

## Trampas conocidas
- **`og-image.png` pesa 1,1 MB.** Por encima de ~300 KB WhatsApp no muestra miniatura.
- **`www.datuva.es` (CNAME) vs `datuva.es` (canonical y sitemap):** incoherente, sin
  decidir cuál es el canónico.
- **`ROISection` publica un precio** («desde 150 €/mes»), decisión del fundador. No
  indica si lleva IVA.
- Los comentarios de tipografía y assets sin usar en `src/assets` engordan el repo pero
  no el bundle: Vite solo empaqueta lo importado.

## Comandos
```
npm install
npm run dev      # http://localhost:8080
npm run build
npx tsc --noEmit
```
