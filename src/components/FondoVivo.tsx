import { useEffect, useRef } from "react";

/**
 * Fondo vivo: movimiento continuo, como un vídeo mudo, que cambia con el scroll.
 *
 * No es un vídeo. Un MP4 a pantalla completa pesaría más que el anuncio de 16 MB
 * que ya estamos intentando aligerar, y habría que servirlo en varias
 * resoluciones. Esto son partículas dibujadas en canvas: pesan lo que ocupa este
 * fichero, escalan a cualquier pantalla y responden al scroll de verdad, no con
 * un vídeo pregrabado.
 *
 * Lo que se ve cambia según dónde estés en el descenso:
 *   · arriba (viña)    partículas doradas que suben, como polvo a contraluz
 *   · medio (bodega)   ámbar, más lentas y más grandes
 *   · abajo (barrica)  posos de vino que caen y se posan
 *
 * El canvas va fijo detrás de todo y no intercepta el ratón. Se detiene con
 * `prefers-reduced-motion`, y también cuando la pestaña no está visible, para no
 * gastar batería en segundo plano.
 */

interface Particula {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  alfa: number;
  fase: number;
}

/** Interpola entre dos colores RGB. */
const mezcla = (a: number[], b: number[], t: number) =>
  a.map((v, i) => Math.round(v + (b[i] - v) * t));

const ORO = [201, 154, 85];
const AMBAR = [154, 100, 56];
const POSO = [122, 46, 56];

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
    let particulas: Particula[] = [];
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

      // Menos partículas en pantallas pequeñas: son las que menos CPU tienen.
      const cuantas = ancho < 768 ? 34 : 72;
      particulas = Array.from({ length: cuantas }, () => ({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        r: 0.6 + Math.random() * 2.2,
        vy: 0.12 + Math.random() * 0.38,
        vx: (Math.random() - 0.5) * 0.14,
        alfa: 0.12 + Math.random() * 0.4,
        fase: Math.random() * Math.PI * 2,
      }));
    };

    /** 0 arriba del todo, 1 al final de la página. */
    const progreso = () => {
      const recorrible = document.body.scrollHeight - window.innerHeight;
      if (recorrible <= 0) return 0;
      return Math.min(1, Math.max(0, window.scrollY / recorrible));
    };

    const pintar = () => {
      t += 0.005;
      const p = progreso();

      // El color viaja con el descenso: oro → ámbar → poso de vino.
      const color = p < 0.5 ? mezcla(ORO, AMBAR, p * 2) : mezcla(AMBAR, POSO, (p - 0.5) * 2);
      // Arriba las partículas suben (polvo a contraluz); abajo caen (posos).
      const sentido = p < 0.45 ? -1 : 1;
      // En la zona clara hay que bajar la opacidad o se ensucia el cream.
      const visibilidad = 0.35 + p * 0.65;

      ctx.clearRect(0, 0, ancho, alto);

      for (const q of particulas) {
        q.y += q.vy * sentido * (0.5 + p);
        q.x += q.vx + Math.sin(t + q.fase) * 0.18;

        if (q.y < -10) q.y = alto + 10;
        if (q.y > alto + 10) q.y = -10;
        if (q.x < -10) q.x = ancho + 10;
        if (q.x > ancho + 10) q.x = -10;

        const respira = 0.75 + Math.sin(t * 2 + q.fase) * 0.25;
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r * (0.8 + p * 0.9), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${q.alfa * respira * visibilidad})`;
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
