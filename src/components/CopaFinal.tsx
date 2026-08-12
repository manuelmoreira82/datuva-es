import { useEffect, useRef, useState } from "react";

/**
 * La copa del cierre.
 *
 * La página se anuncia «de la cepa a la copa» y terminaba sin copa. Esta se
 * llena de vino a medida que la sección entra en pantalla, cerrando el descenso:
 * lo que arriba era luz de viña, aquí ya es vino servido.
 *
 * DECISIÓN DELIBERADA: la copa es el fondo, no un recorte del contenido.
 * Recortar el texto con la silueta —que era la idea de partida— parte los
 * renglones contra las curvas del cáliz y deja el tallo con tres centímetros de
 * ancho; en móvil resulta ilegible. Aquí el texto se compone DENTRO del cáliz,
 * que es la parte ancha, y la copa queda detrás.
 *
 * Se detiene con `prefers-reduced-motion`: el nivel se queda lleno y ya está.
 */

/* Silueta de copa en un lienzo de 600×860. El cáliz llega hasta y=430; de ahí
   bajan tallo y pie. */
const COPA =
  "M96,52 C96,286 178,404 282,428 L282,706 C232,712 186,736 164,766 L436,766 C414,736 368,712 318,706 L318,428 C422,404 504,286 504,52 Z";
/* Solo el cáliz, que es lo que se llena. */
const CALIZ = "M96,52 C96,286 178,404 300,428 C422,404 504,286 504,52 Z";

const CopaFinal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [nivel, setNivel] = useState(0);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNivel(1);
      return;
    }

    const alSCroll = () => {
      const r = nodo.getBoundingClientRect();
      // 0 cuando la sección asoma por abajo, 1 cuando está centrada en pantalla.
      const avance = 1 - (r.top - window.innerHeight * 0.15) / (window.innerHeight * 0.85);
      setNivel(Math.min(1, Math.max(0, avance)));
    };

    alSCroll();
    window.addEventListener("scroll", alSCroll, { passive: true });
    window.addEventListener("resize", alSCroll);
    return () => {
      window.removeEventListener("scroll", alSCroll);
      window.removeEventListener("resize", alSCroll);
    };
  }, []);

  // El vino sube desde el fondo del cáliz (y=428) hasta el borde (y=52).
  const superficie = 428 - (428 - 62) * nivel;

  return (
    <div ref={ref} className="relative">
      <svg
        viewBox="0 0 600 860"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[128%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-95"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="calizClip">
            <path d={CALIZ} />
          </clipPath>
          <linearGradient id="vino" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A6425A" />
            <stop offset="55%" stopColor="#7C2D3E" />
            <stop offset="100%" stopColor="#42101C" />
          </linearGradient>
        </defs>

        {/* El vino */}
        <g clipPath="url(#calizClip)">
          <rect
            x="0"
            y={superficie}
            width="600"
            height={860 - superficie}
            fill="url(#vino)"
            style={{ transition: "y 0.25s linear" }}
          />
          {/* Brillo de la superficie del líquido */}
          <ellipse cx="300" cy={superficie} rx="205" ry="12" fill="#C9737F" opacity="0.55" />
        </g>

        {/* El cristal */}
        <path d={COPA} fill="none" stroke="#F5F0E8" strokeOpacity="0.28" strokeWidth="2.5" />
        <path
          d="M150,80 C152,240 196,340 268,382"
          fill="none"
          stroke="#F5F0E8"
          strokeOpacity="0.16"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative">{children}</div>
    </div>
  );
};

export default CopaFinal;
