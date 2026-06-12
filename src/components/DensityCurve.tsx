import { useEffect, useRef, useState } from "react";

interface DensityCurveProps {
  /** Color del trazo. Por defecto: vino */
  color?: string;
  /** Grosor del trazo */
  strokeWidth?: number;
  /** Dispara el dibujo automáticamente al montar (hero) o al entrar en viewport */
  trigger?: "mount" | "view";
  /** Alto del SVG en px */
  height?: number;
  /** Etiquetas con valores de densidad en los extremos */
  showLabels?: boolean;
  className?: string;
}

/**
 * Curva de densidad de fermentación: línea SVG de 1.100 → 0.995.
 * Elemento firma de la identidad: arranca arriba a la izquierda y
 * desciende con la curva característica que reconoce cualquier enólogo.
 */
const DensityCurve = ({
  color = "hsl(var(--vino))",
  strokeWidth = 1.5,
  trigger = "view",
  height = 120,
  showLabels = false,
  className = "",
}: DensityCurveProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    if (trigger === "mount") {
      const t = setTimeout(() => setDrawn(true), 120);
      return () => clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  // Curva de fermentación realista: meseta corta, caída fuerte (azúcar bajando rápido),
  // suavizado al final cerca de 0.995. viewBox 1000x100.
  const d =
    "M 0,18 C 80,18 130,20 180,28 C 240,40 290,58 360,70 C 430,82 500,86 580,88 C 660,90 740,90 820,90 C 880,90 940,90 1000,90";

  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      width="100%"
      height={height}
      role="img"
      aria-label="Curva de densidad de fermentación"
      className={className}
    >
      {/* línea base sutil */}
      <line
        x1="0"
        y1="90"
        x2="1000"
        y2="90"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="0.5"
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className={`density-path ${drawn ? "is-drawn" : ""}`}
      />
      {/* Punto final */}
      <circle
        cx="1000"
        cy="90"
        r="3"
        fill={color}
        opacity={drawn ? 1 : 0}
        style={{ transition: "opacity 600ms ease-out 2s" }}
      />
      {showLabels && (
        <>
          <text
            x="6"
            y="14"
            fontSize="10"
            fill="currentColor"
            opacity="0.55"
            fontFamily="'Instrument Sans', sans-serif"
          >
            1.100
          </text>
          <text
            x="970"
            y="84"
            fontSize="10"
            fill="currentColor"
            opacity="0.55"
            fontFamily="'Instrument Sans', sans-serif"
            textAnchor="end"
          >
            0.995
          </text>
        </>
      )}
    </svg>
  );
};

export default DensityCurve;
