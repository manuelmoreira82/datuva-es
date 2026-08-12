#!/usr/bin/env node
/**
 * preview-shots — capturas de la web para revisar cambios antes de mergear.
 *
 * Compila, levanta `vite preview` en local y guarda un PNG de página completa
 * de cada ruta en escritorio y en móvil, más un index.html para verlas juntas.
 *
 * NO añade dependencias al proyecto: usa el Playwright que ya esté instalado
 * (local o global). Si no hay ninguno:  npm i -g playwright && playwright install chromium
 *
 * Uso:
 *   node scripts/preview-shots.mjs
 *   node scripts/preview-shots.mjs --routes /,/presentacion --out /tmp/antes
 *
 * Opciones:
 *   --routes <lista>   Rutas separadas por comas. Por defecto, las públicas.
 *   --out <carpeta>    Destino de las capturas. Por defecto preview-shots/.
 *   --port <n>         Puerto del servidor de preview. Por defecto 4173.
 *   --skip-build       Reutiliza el dist/ que ya existe.
 *   --keep-cookies     No acepta el banner de cookies (por defecto se acepta,
 *                      porque tapa el contenido en todas las capturas).
 */

import { createRequire } from "node:module";
import { spawn, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Rutas públicas declaradas en src/App.tsx. La landing no tiene login, así que
// se pueden capturar todas.
const RUTAS_POR_DEFECTO = [
  "/",
  "/presentacion",
  "/terminos",
  "/privacidad",
  "/aviso-legal",
  "/politica-cookies",
];

const VIEWPORTS = [
  { nombre: "escritorio", width: 1440, height: 900, deviceScaleFactor: 1 },
  { nombre: "movil", width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

function arg(nombre, pordefecto = null) {
  const i = process.argv.indexOf(`--${nombre}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : pordefecto;
}
const flag = (nombre) => process.argv.includes(`--${nombre}`);

/**
 * Playwright puede estar en el proyecto o instalado globalmente. Se prueban
 * ambos en vez de exigir que esté en package.json: este script es una
 * herramienta de revisión, no una dependencia del producto.
 */
function cargarPlaywright() {
  const candidatos = ["playwright", "playwright-core", "@playwright/test"];
  for (const nombre of candidatos) {
    try {
      return require(nombre);
    } catch {
      /* siguiente */
    }
  }
  try {
    const raizGlobal = execFileSync("npm", ["root", "-g"], { encoding: "utf8" }).trim();
    const requireGlobal = createRequire(path.join(raizGlobal, "index.js"));
    for (const nombre of candidatos) {
      try {
        return requireGlobal(nombre);
      } catch {
        /* siguiente */
      }
    }
  } catch {
    /* npm no disponible */
  }
  throw new Error(
    "No se encontró Playwright.\n" +
      "  npm i -g playwright && npx playwright install chromium"
  );
}

async function esperarServidor(url, timeoutMs = 90_000) {
  const limite = Date.now() + timeoutMs;
  while (Date.now() < limite) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return;
    } catch {
      /* aún no escucha */
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`El servidor de preview no respondió en ${url}`);
}

/**
 * ScrollAnimation deja cada bloque en opacity-0 hasta que el IntersectionObserver
 * lo ve entrar en pantalla. Sin recorrer la página antes de disparar, una captura
 * de página completa sale casi en blanco.
 */
async function recorrerPagina(page) {
  await page.evaluate(async () => {
    const paso = Math.floor(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += paso) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo(0, 0);
  });
  // Las transiciones son duration-700; se les da margen para acabar.
  await page.waitForTimeout(900);
}

const slug = (ruta) => (ruta === "/" ? "home" : ruta.replace(/^\//, "").replace(/\//g, "-"));

async function main() {
  const rutas = (arg("routes") ?? RUTAS_POR_DEFECTO.join(",")).split(",").map((r) => r.trim()).filter(Boolean);
  const salida = path.resolve(ROOT, arg("out", "preview-shots"));
  const puerto = Number(arg("port", "4173"));
  const base = `http://127.0.0.1:${puerto}`;

  const { chromium } = cargarPlaywright();

  if (!flag("skip-build")) {
    console.log("· Compilando…");
    execFileSync("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit" });
  }

  console.log(`· Levantando preview en ${base}`);
  const servidor = spawn(
    "npm",
    ["run", "preview", "--", "--port", String(puerto), "--strictPort", "--host", "127.0.0.1"],
    { cwd: ROOT, stdio: "ignore", detached: true }
  );
  // detached + kill al grupo: vite deja procesos hijos que si no sobreviven.
  const matarServidor = () => {
    try {
      process.kill(-servidor.pid, "SIGTERM");
    } catch {
      /* ya murió */
    }
  };
  process.on("exit", matarServidor);
  process.on("SIGINT", () => {
    matarServidor();
    process.exit(130);
  });

  const capturas = [];
  const navegador = await chromium.launch();
  try {
    await esperarServidor(base + "/");

    for (const vp of VIEWPORTS) {
      const { nombre, ...opcionesViewport } = vp;
      const contexto = await navegador.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.deviceScaleFactor,
        isMobile: vp.isMobile ?? false,
        hasTouch: vp.hasTouch ?? false,
        locale: "es-ES",
      });

      if (!flag("keep-cookies")) {
        await contexto.addInitScript(() => {
          localStorage.setItem("datuva-cookies-accepted", "true");
          localStorage.setItem("datuva-data-accepted", "true");
        });
      }

      await fs.mkdir(path.join(salida, nombre), { recursive: true });

      for (const ruta of rutas) {
        const page = await contexto.newPage();
        try {
          await page.goto(base + ruta, { waitUntil: "networkidle", timeout: 45_000 });
          await recorrerPagina(page);
          const destino = path.join(salida, nombre, `${slug(ruta)}.png`);
          await page.screenshot({ path: destino, fullPage: true });
          capturas.push({ ruta, viewport: nombre, archivo: path.relative(salida, destino) });
          console.log(`  ✓ ${nombre.padEnd(11)} ${ruta}`);
        } catch (err) {
          console.error(`  ✗ ${nombre.padEnd(11)} ${ruta} — ${err.message}`);
        } finally {
          await page.close();
        }
      }
      await contexto.close();
    }
  } finally {
    await navegador.close();
    matarServidor();
  }

  await fs.writeFile(path.join(salida, "index.html"), galeria(capturas), "utf8");
  console.log(`\n${capturas.length} capturas en ${salida}`);
  console.log(`Ábrelas con:  open ${path.join(salida, "index.html")}`);
}

function galeria(capturas) {
  const porRuta = new Map();
  for (const c of capturas) {
    if (!porRuta.has(c.ruta)) porRuta.set(c.ruta, []);
    porRuta.get(c.ruta).push(c);
  }
  const bloques = [...porRuta.entries()]
    .map(
      ([ruta, items]) => `<section><h2>${ruta}</h2><div class="fila">${items
        .map(
          (i) =>
            `<figure class="${i.viewport}"><figcaption>${i.viewport}</figcaption><img src="${i.archivo}" alt="${ruta} en ${i.viewport}" loading="lazy"></figure>`
        )
        .join("")}</div></section>`
    )
    .join("\n");

  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Capturas de preview</title>
<style>
:root{color-scheme:light dark}
body{margin:0;padding:2rem;font:16px/1.5 system-ui,sans-serif;background:#0B0A14;color:#F5F0E8}
h1{color:#C9A227;font-size:1.5rem}
h2{font-size:1rem;font-family:ui-monospace,monospace;color:#C9A227;border-bottom:1px solid #333;padding-bottom:.4rem}
.fila{display:flex;gap:1.5rem;align-items:flex-start;overflow-x:auto;padding-bottom:1rem}
figure{margin:0}
figcaption{font-size:.8rem;opacity:.7;margin-bottom:.4rem}
img{border:1px solid #333;border-radius:8px;display:block}
figure.escritorio img{width:760px;max-width:none}
figure.movil img{width:280px}
</style></head><body>
<h1>Capturas de preview — ${new Date().toLocaleString("es-ES")}</h1>
${bloques}
</body></html>`;
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
