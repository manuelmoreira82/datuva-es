# Datuva — Web comercial (datuva.es)

Landing comercial de **Datuva**, software de gestión integral para bodegas españolas.
Construido con Vite + React + TypeScript + Tailwind CSS.

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

> **Estado real a 7 de agosto de 2026.** Este apartado ha estado equivocado y ha
> costado tiempo: decía que el sitio se desplegaba en Cloudflare Pages, cuando no
> era así. Antes de tocar nada de despliegue, comprueba lo que dice aquí.

### Lo que publica la web hoy: GitHub Pages

`.github/workflows/deploy-pages.yml`, al hacer push a `main`. Dominio `www.datuva.es`
vía el `CNAME` que escribe el propio workflow. Usa Node 22 (wrangler 4 exige >= 22).

El workflow **borra `dist/_worker.js` y `dist/.assetsignore`** antes de subir el
artefacto: GitHub Pages es estático y no ejecutaría ese código, así que subirlo
solo serviría para publicar el código de servidor como archivo descargable.

**Consecuencia:** `functions/api/contacto.ts` **no se ejecuta**. El formulario de
contacto muestra el correo y el teléfono directos en vez de guardar el lead.

### Lo que está preparado pero SIN desplegar: Cloudflare Workers

`wrangler.jsonc` define un Worker con assets estáticos llamado `datuva-web`:

- `npm run build` encadena `wrangler pages functions build --outdir=./dist/_worker.js/`,
  que compila `functions/` a formato Workers. No hay que reescribir el endpoint.
- `main` apunta a `./dist/_worker.js` y los assets se sirven con el binding `ASSETS`.
- `public/.assetsignore` evita que el código de servidor se sirva como archivo
  público. Va en `public/` porque wrangler lo busca en la raíz de `dist/`.

Verificado en local con `wrangler dev`: `POST /api/contacto` responde 503 JSON sin
variables de entorno, valida email y nombre, y descarta el honeypot.
`wrangler deploy --dry-run` pasa sin errores.

**Falta desplegarlo.** Dos vías: `npx wrangler deploy` desde una máquina autenticada,
o conectar `datuva-web` a Git en Cloudflare (Workers → Builds). Mientras no se haga,
manda GitHub Pages y el formulario no captura.

No usar `wrangler pages deploy`: Cloudflare ya no crea proyectos de Pages nuevos.

### Variables de entorno

Las necesita `functions/api/contacto.ts` **una vez esté desplegado en Workers**.
Si no se configura ninguna, el endpoint responde 503 y el diálogo muestra el
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

> Pendiente de que se despliegue el Worker. Hoy el diálogo se abre y valida, pero
> al enviar muestra el contacto directo en vez de registrar el lead.

Los envíos se guardan en la tabla `public.web_leads` del proyecto Supabase
`Bodega_Djp`. **No es una tabla multi-tenant**: son prospectos de Datuva, no datos
de ninguna bodega, por eso no lleva `organization_id`. Con RLS activo su única
política es de `INSERT`, de modo que solo se puede consultar desde el panel de
Supabase (`service_role`).

Campo `estado`: `nuevo` · `contactado` · `descartado`, para el seguimiento manual.

## Estructura

- `src/pages/` — páginas (Index, Presentación, y páginas legales)
- `src/components/` — secciones y componentes de UI
- `functions/api/` — endpoint del formulario. Se compila a Worker en el build, pero
  hoy no se ejecuta: ver el apartado Despliegue
- `public/` — assets estáticos (PDF de presentación, demo, imágenes, favicon)
