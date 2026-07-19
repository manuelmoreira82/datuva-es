# Datuva — Web comercial (datuva.es)

Landing comercial de **Datuva**, software de gestión integral para bodegas españolas.
Sitio web 100% estático (sin backend), construido con Vite + React + TypeScript + Tailwind CSS.

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
- Sin variables de entorno (el sitio es estático)

## Estructura

- `src/pages/` — páginas (Index, Presentación, y páginas legales)
- `src/components/` — secciones y componentes de UI
- `public/` — assets estáticos (PDF de presentación, demo, imágenes, favicon)
