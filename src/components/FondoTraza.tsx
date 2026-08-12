/**
 * Fondo animado de circuito-viña.
 *
 * No usa ninguna fotografía: las que había en `src/assets` son de stock y una de
 * ellas (`hero-vineyard.jpg`) muestra además una interfaz inventada en la
 * pantalla del portátil, que contradice el «capturas reales, sin demos falsas»
 * que promete la propia web.
 *
 * El dibujo sale de la marca: el logo de Datuva es un racimo trazado como
 * circuito. Aquí esas mismas trazas suben y se ramifican, con nodos en los
 * empalmes. Pesa lo que ocupa este SVG y escala a cualquier pantalla.
 */
const FondoTraza = ({ className = "" }: { className?: string }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="trazaFade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0" />
          <stop offset="35%" stopColor="hsl(var(--gold))" stopOpacity="0.55" />
          <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <g stroke="url(#trazaFade)" strokeWidth="1" strokeLinecap="round">
        {/* Tronco y ramas principales, con la geometría escalonada del circuito. */}
        <path d="M980 900 L980 620 L1080 520 L1080 300" className="traza-anima" />
        <path d="M980 700 L880 600 L880 380" className="traza-anima traza-anima--2" />
        <path d="M1080 460 L1200 340 L1200 180" className="traza-anima traza-anima--3" />
        <path d="M880 480 L760 360 L760 220" className="traza-anima traza-anima--2" />
        <path d="M1200 300 L1310 190" className="traza-anima traza-anima--3" />
        <path d="M180 900 L180 640 L280 540 L280 340" className="traza-anima traza-anima--2" />
        <path d="M280 480 L400 360 L400 200" className="traza-anima traza-anima--3" />
        <path d="M180 720 L70 610 L70 420" className="traza-anima" />
      </g>

      {/* Nodos: los granos del racimo, en los empalmes de las trazas. */}
      <g fill="hsl(var(--gold))">
        {[
          [1080, 300], [880, 380], [1200, 180], [760, 220], [1310, 190],
          [280, 340], [400, 200], [70, 420], [1080, 520], [180, 640],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="2.5"
            className="traza-late"
            style={{ animationDelay: `${(i % 5) * 0.7}s` }}
            opacity="0.5"
          />
        ))}
      </g>
    </svg>
  </div>
);

export default FondoTraza;
