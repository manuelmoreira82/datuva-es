import { useEffect, useRef, useState } from "react";

/**
 * La copa del cierre.
 *
 * La página se anuncia «de la cepa a la copa»: termina con una copa de vino que
 * se sirve a medida que la sección entra en pantalla.
 *
 * Ilustración realista en SVG (sin fotos ni librerías): cristal con
 * transparencia y reflejos, vino con profundidad y menisco, lágrimas en la
 * pared del cáliz y sombra sobre la mesa.
 *
 * DECISIÓN DELIBERADA: la copa va en su propia columna, nunca detrás del texto.
 * Se probaron antes una copa de contorno detrás del bloque (el tallo atravesaba
 * el nombre y el teléfono) y un fondo abstracto de vino (no se reconocía como
 * copa). Ver CTAFinalSection.
 *
 * Con `prefers-reduced-motion` la copa aparece ya servida.
 */

/* Lienzo 400×760. Cáliz en tulipa: labio en y=60, fondo en y=400. */
const CALIZ = "M80,60 C68,205 112,372 200,402 C288,372 332,205 320,60 Z";
const TALLO =
  "M188,398 C196,412 196,424 196,436 L196,652 C196,660 204,660 204,652 L204,436 C204,424 204,412 212,398 Z";

/* Nivel del vino: vacío en el fondo del cáliz, servido hasta la parte ancha. */
const VACIO = 398;
const SERVIDO = 212;

const CopaFinal = ({ className = "" }: { className?: string }) => {
  const ref = useRef<SVGSVGElement>(null);
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
      // 0 cuando la copa asoma por abajo, 1 cuando su centro llega a media pantalla.
      const centro = r.top + r.height / 2;
      const avance = (window.innerHeight - centro) / (window.innerHeight * 0.5);
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

  const superficie = VACIO - (VACIO - SERVIDO) * nivel;
  const lleno = nivel > 0.02;

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 760"
      role="img"
      aria-label="Copa de vino tinto"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id="copa-caliz">
          <path d={CALIZ} />
        </clipPath>

        {/* Cristal: casi transparente, con algo más de luz en los bordes. */}
        <linearGradient id="copa-cristal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F5F0E8" stopOpacity="0.16" />
          <stop offset="22%" stopColor="#F5F0E8" stopOpacity="0.04" />
          <stop offset="78%" stopColor="#F5F0E8" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0.12" />
        </linearGradient>

        {/* Vino: más claro arriba, casi negro en el fondo del cáliz. */}
        <linearGradient id="copa-vino" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8E2A3E" />
          <stop offset="45%" stopColor="#5E1424" />
          <stop offset="100%" stopColor="#2A0710" />
        </linearGradient>
        {/* Luz atravesando el vino. */}
        <radialGradient id="copa-luz-vino" cx="0.62" cy="0.7" r="0.45">
          <stop offset="0%" stopColor="#C2475F" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#C2475F" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="copa-tallo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F5F0E8" stopOpacity="0.1" />
          <stop offset="45%" stopColor="#F5F0E8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0.08" />
        </linearGradient>

        <filter id="copa-desenfoque" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="copa-sombra" x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Sombra y reflejo rojizo del vino sobre la mesa */}
      <ellipse cx="205" cy="686" rx="125" ry="15" fill="#000" opacity="0.55" filter="url(#copa-sombra)" />
      <ellipse
        cx="215"
        cy="684"
        rx="70"
        ry="8"
        fill="#7C2D3E"
        opacity={0.35 * nivel}
        filter="url(#copa-sombra)"
      />

      {/* Pie */}
      <ellipse cx="200" cy="668" rx="96" ry="16" fill="#F5F0E8" fillOpacity="0.07" stroke="#F5F0E8" strokeOpacity="0.4" strokeWidth="1.5" />
      <ellipse cx="200" cy="664" rx="58" ry="8" fill="none" stroke="#F5F0E8" strokeOpacity="0.22" strokeWidth="1" />

      {/* Tallo */}
      <path d={TALLO} fill="url(#copa-tallo)" stroke="#F5F0E8" strokeOpacity="0.3" strokeWidth="1" />
      <line x1="198.5" y1="440" x2="198.5" y2="648" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.2" />

      {/* Cristal del cáliz (detrás del vino) */}
      <path d={CALIZ} fill="url(#copa-cristal)" />

      {/* El vino */}
      <g clipPath="url(#copa-caliz)">
        <rect
          x="0"
          y={superficie}
          width="400"
          height={420 - superficie}
          fill="url(#copa-vino)"
          style={{ transition: "y 0.25s linear, height 0.25s linear" }}
        />
        <rect x="0" y={superficie} width="400" height={420 - superficie} fill="url(#copa-luz-vino)" />
        {lleno && (
          <>
            {/* Superficie (menisco) vista en perspectiva */}
            <ellipse cx="200" cy={superficie} rx="140" ry="10" fill="#A33A52" opacity="0.95" />
            <ellipse cx="200" cy={superficie - 1} rx="140" ry="10" fill="none" stroke="#E8B4BE" strokeOpacity="0.45" strokeWidth="1.2" />
          </>
        )}

        {/* Lágrimas en la pared, por encima del vino */}
        <g stroke="#8E2A3E" strokeLinecap="round" opacity={0.35 * nivel}>
          <path d={`M118,${superficie - 4} C117,${superficie - 30} 118,${superficie - 60} 120,${superficie - 78}`} strokeWidth="2" fill="none" />
          <path d={`M140,${superficie - 4} C140,${superficie - 22} 141,${superficie - 40} 142,${superficie - 50}`} strokeWidth="1.6" fill="none" />
          <path d={`M278,${superficie - 4} C279,${superficie - 26} 278,${superficie - 48} 276,${superficie - 64}`} strokeWidth="1.8" fill="none" />
        </g>
      </g>

      {/* Reflejos especulares del cristal (delante del vino) */}
      <path
        d="M104,92 C98,190 116,300 162,372"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.45"
        strokeWidth="7"
        strokeLinecap="round"
        filter="url(#copa-desenfoque)"
      />
      <path d="M110,100 C106,180 118,260 146,330" fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M300,110 C304,170 298,230 282,282"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.18"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#copa-desenfoque)"
      />

      {/* Contorno del cáliz */}
      <path d={CALIZ} fill="none" stroke="#F5F0E8" strokeOpacity="0.38" strokeWidth="1.5" />

      {/* Labio de la copa */}
      <ellipse cx="200" cy="60" rx="120" ry="13" fill="#F5F0E8" fillOpacity="0.04" stroke="#F5F0E8" strokeOpacity="0.5" strokeWidth="1.5" />
      <path d="M100,58 C140,50 170,48 200,48" fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default CopaFinal;
