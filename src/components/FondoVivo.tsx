import { useEffect, useRef } from "react";

/**
 * Fondo vivo: movimiento continuo, como un vídeo mudo, que cambia con el scroll.
 *
 * No es un vídeo a propósito. Un MP4 a pantalla completa pesaría más que el
 * anuncio de 16 MB que estamos intentando aligerar y habría que servirlo en
 * varias resoluciones. Esto se dibuja en canvas: pesa lo que ocupa el fichero,
 * escala a cualquier pantalla y responde al scroll de verdad.
 *
 * Dos capas:
 *   · velos   — manchas grandes y difusas que derivan lentamente. Son las que
 *               de verdad se leen como «movimiento»; los puntos solos no.
 *   · motas   — partículas: polvo a contraluz arriba, posos de vino abajo.
 *
 * CLAVE DE CONTRASTE: la primera versión no se veía porque pintaba dorado sobre
 * el cream del principio de la página — dorado sobre dorado. La tinta se INVIERTE
 * según el tramo: oscura sobre la luz de la viña, clara sobre la bodega.
 *
 * Se detiene con `prefers-reduced-motion` y cuando la pestaña no está visible.
 */

interface Mota {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  alfa: number;
  fase: number;
}

interface Velo {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  fase: number;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mezcla = (a: number[], b: number[], t: number) =>
  a.map((v, i) => Math.round(lerp(v, b[i], t)));

/* Tinta sobre la luz de la viña (fondo claro): marrón de sarmiento. */
const TINTA_CLARA = [90, 58, 30];
/* Tinta sobre la bodega (fondo oscuro): oro y poso de vino. */
const TINTA_ORO = [201, 162, 39];
const TINTA_POSO = [166, 62, 82];

const FondoVivo = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ancho = 0;
    let alto = 0;
    let motas: Mota[] = [];
    let velos: Velo[] = [];
    let raf = 0;
    let t = 0;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const dimensionar = () => {
      ancho = window.innerWidth;
      alto = window.innerHeight;
      canvas.width = ancho * dpr();
      canvas.height = alto * dpr();
      canvas.style.width = `${ancho}px`;
      canvas.style.height = `${alto}px`;
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);

      const cuantas = ancho < 768 ? 40 : 85;
      motas = Array.from({ length: cuantas }, () => ({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        r: 1.4 + Math.random() * 3.4,
        vy: 0.18 + Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.22,
        alfa: 0.3 + Math.random() * 0.45,
        fase: Math.random() * Math.PI * 2,
      }));

      velos = Array.from({ length: 3 }, (_, i) => ({
        x: ancho * (0.2 + i * 0.3),
        y: alto * (0.25 + i * 0.25),
        r: Math.max(ancho, alto) * (0.34 + i * 0.1),
        vx: (i % 2 ? 1 : -1) * (0.16 + i * 0.05),
        vy: (i % 2 ? -1 : 1) * 0.1,
        fase: i * 2.1,
      }));
    };

    /** 0 arriba del todo, 1 al final de la página. */
    const progreso = () => {
      const recorrible = document.documentElement.scrollHeight - window.innerHeight;
      if (recorrible <= 0) return 0;
      return Math.min(1, Math.max(0, window.scrollY / recorrible));
    };

    const pintar = () => {
      t += 0.006;
      const p = progreso();

      // `claro` = 1 mientras el fondo de la página sigue siendo claro. El cambio
      // de tinta acompaña al del degradado, que vira a marrón sobre el 18 %.
      const claro = 1 - Math.min(1, Math.max(0, (p - 0.08) / 0.12));
      const oscuroTono = p < 0.55 ? TINTA_ORO : mezcla(TINTA_ORO, TINTA_POSO, (p - 0.55) / 0.45);
      const color = mezcla(oscuroTono, TINTA_CLARA, claro);
      // Arriba las motas suben (polvo a contraluz); abajo caen (posos).
      const sentido = p < 0.45 ? -1 : 1;

      ctx.clearRect(0, 0, ancho, alto);

      // ── Velos ───────────────────────────────────────────────────────────
      for (const v of velos) {
        v.x += v.vx;
        v.y += v.vy + Math.sin(t + v.fase) * 0.24;
        if (v.x < -v.r) v.x = ancho + v.r;
        if (v.x > ancho + v.r) v.x = -v.r;
        if (v.y < -v.r) v.y = alto + v.r;
        if (v.y > alto + v.r) v.y = -v.r;

        const pulso = 0.85 + Math.sin(t * 1.4 + v.fase) * 0.15;
        const grad = ctx.createRadialGradient(v.x, v.y, 0, v.x, v.y, v.r * pulso);
        grad.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${lerp(0.1, 0.16, 1 - claro)})`);
        grad.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(v.x, v.y, v.r * pulso, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Motas ───────────────────────────────────────────────────────────
      for (const m of motas) {
        m.y += m.vy * sentido * (0.6 + p);
        m.x += m.vx + Math.sin(t + m.fase) * 0.25;

        if (m.y < -12) m.y = alto + 12;
        if (m.y > alto + 12) m.y = -12;
        if (m.x < -12) m.x = ancho + 12;
        if (m.x > ancho + 12) m.x = -12;

        const respira = 0.7 + Math.sin(t * 2 + m.fase) * 0.3;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * (0.85 + p * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${m.alfa * respira})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(pintar);
    };

    const arrancar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pintar);
    };
    const parar = () => cancelAnimationFrame(raf);
    const visibilidadPestana = () => (document.hidden ? parar() : arrancar());

    dimensionar();
    arrancar();
    window.addEventListener("resize", dimensionar);
    document.addEventListener("visibilitychange", visibilidadPestana);

    return () => {
      parar();
      window.removeEventListener("resize", dimensionar);
      document.removeEventListener("visibilitychange", visibilidadPestana);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
};

export default FondoVivo;
