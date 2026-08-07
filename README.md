# Datuva — Web comercial (datuva.es)

Landing comercial de **Datuva**, software de gestión integral para bodegas españolas.
Construido con Vite + React + TypeScript + Tailwind CSS. El sitio es estático salvo
por una Cloudflare Pages Function que recibe el formulario de contacto.

## Requisitos

- Node.js 18+ y npm

## Desarrollo local

```sh
npm install
npm run dev      # servidor de desarrollo en http://localhost:8080
```

## Build de producción

```sh
npm run build    # genera la carpeta dist/
npm run preview  # sirve dist/ en local para verificar
```

## Despliegue

El sitio se despliega en **Cloudflare Pages** desde la rama `main` de este repositorio:

- Build command: `npm run build`
- Output directory: `dist`

### Variables de entorno (Settings → Environment variables)

Las necesita `functions/api/contacto.ts`, que recibe el formulario de contacto.
Si no se configura ninguna, el formulario responde 503 y el diálogo muestra el
correo y el teléfono directos, así que la web sigue funcionando.

| Variable | Obligatoria | Valor |
| --- | --- | --- |
| `SUPABASE_URL` | para guardar el lead | `https://mvqtgrmamxbxzbtxieez.supabase.co` |
| `SUPABASE_ANON_KEY` | para guardar el lead | Clave anon del proyecto. Es pública por diseño: la tabla `web_leads` solo admite `INSERT`, con ella no se puede leer nada |
| `RESEND_API_KEY` | para el aviso por correo | Clave de API de Resend (**secreto**) |
| `CONTACT_TO` | no | Destinatario del aviso. Por defecto `manuelmoreira@datuva.es` |
| `CONTACT_FROM` | no | Remitente, de un dominio verificado en Resend. Por defecto `web@datuva.es` |

El lead se guarda y se notifica en paralelo: basta con que uno de los dos
funcione para no perder el contacto.

## Formulario de contacto

Los envíos se guardan en la tabla `public.web_leads` del proyecto Supabase
`Bodega_Djp`. **No es una tabla multi-tenant**: son prospectos de Datuva, no datos
de ninguna bodega, por eso no lleva `organization_id`. Con RLS activo su única
política es de `INSERT`, de modo que solo se puede consultar desde el panel de
Supabase (`service_role`).

Campo `estado`: `nuevo` · `contactado` · `descartado`, para el seguimiento manual.

## Estructura

- `src/pages/` — páginas (Index, Presentación, y páginas legales)
- `src/components/` — secciones y componentes de UI
- `functions/api/` — Cloudflare Pages Functions (endpoint del formulario)
- `public/` — assets estáticos (PDF de presentación, demo, imágenes, favicon)
