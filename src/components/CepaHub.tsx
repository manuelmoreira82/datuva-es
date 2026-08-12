import { useState } from "react";
import { motion } from "framer-motion";
import type { SectionCard } from "@/types/modulos";
import { useContactDialog } from "@/components/ContactDialog";

/**
 * La cepa navegable: primera pantalla de la web.
 *
 * Cada racimo es un botón real que abre la ficha de esa parte de la bodega. El
 * dibujo sale de la marca —el logo de Datuva es un racimo trazado como
 * circuito—, así que la navegación es la propia identidad y no una ilustración
 * pegada encima.
 *
 * DOS DECISIONES QUE CONVIENE NO DESHACER SIN PENSARLO:
 *
 * 1. Los racimos son `<button>` de HTML colocados sobre el SVG, no formas
 *    dentro del SVG. Así se recorren con el tabulador, se anuncian con su
 *    nombre y funcionan con teclado. Un `<circle>` con onClick no hace nada de
 *    eso.
 *
 * 2. Debajo de 768 px la cepa NO se dibuja: once racimos en 390 px quedan
 *    ilegibles y con las zonas de toque solapadas. En móvil se muestra la lista
 *    de las mismas áreas, que se lee y se toca bien.
 *
 * La cepa es la ENTRADA, no la única página: el resto de la home sigue debajo.
 * Una portada que solo muestra un dibujo no la indexa un buscador ni la escanea
 * un visitante con prisa, y el texto de SILICIE, INFOVI y trazabilidad es lo que
 * posiciona esta web.
 */

interface Props {
  cards: SectionCard[];
  onCardClick: (card: SectionCard) => void;
}

/* Posición de cada racimo en el lienzo de la cepa, en % del contenedor.
   Están repartidos como una cepa en espaldera: tronco al centro, brazos
   abriéndose y los racimos colgando a distintas alturas. */
const NODOS: { id: string; x: number; y: number }[] = [
  { id: "campo", x: 10, y: 34 },
  { id: "vendimia", x: 22, y: 14 },
  { id: "laboratorio", x: 24, y: 56 },
  { id: "bodega", x: 38, y: 28 },
  { id: "embotellado", x: 40, y: 62 },
  { id: "normativa", x: 55, y: 12 },
  { id: "expediciones", x: 60, y: 44 },
  { id: "costes", x: 72, y: 24 },
  { id: "proveedores", x: 76, y: 62 },
  { id: "rrhh", x: 89, y: 38 },
];

/* Foto de la cepa. Se sirve desde `public/`, no se importa, para que la web
   siga funcionando mientras el fichero no exista: si no carga, `onError` deja el
   dibujo vectorial de reserva. En cuanto se deje `public/cepa.jpg`, aparece. */
const FOTO_CEPA = "/cepa.jpg";

const CepaHub = ({ cards, onCardClick }: Props) => {
  const { abrir } = useContactDialog();
  const [hayFoto, setHayFoto] = useState(false);
  // La invitación se apaga en cuanto se toca o se pasa por encima una vez.
  const [tocada, setTocada] = useState(false);
  const [encima, setEncima] = useState<string | null>(null);
  const porId = new Map(cards.map((c) => [c.id, c]));
  const nodos = NODOS.filter((n) => porId.has(n.id));

  return (
    <section
      id="cepa"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 py-24 md:px-10"
    >
      {/* La cepa de verdad, si está. */}
      <img
        src={FOTO_CEPA}
        alt=""
        aria-hidden="true"
        onLoad={() => setHayFoto(true)}
        onError={() => setHayFoto(false)}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          hayFoto ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Velo: sin esto el texto compite con las hojas y no se lee. */}
      {hayFoto && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(20,14,10,0.72) 0%, rgba(20,14,10,0.45) 42%, rgba(20,14,10,0.3) 100%)",
          }}
        />
      )}
      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-xl md:mb-4"
        >
          <p className={`font-mono text-[11px] uppercase tracking-[0.22em] ${hayFoto ? "text-[#D9B274]" : "text-[#4A2E1F]"}`}>
            Software para bodegas españolas
          </p>
          <h1
            className={`mt-4 font-serif text-[2.6rem] font-normal leading-[0.9] tracking-[-0.035em] md:text-[4.2rem] ${hayFoto ? "text-[#F5F0E8]" : "text-[#1a1208]"}`}
          >
            Toca la cepa.
          </h1>
          <p className={`mt-4 max-w-md text-base leading-relaxed ${hayFoto ? "text-[#F5F0E8]/85" : "text-[#3A2A16]/85"}`}>
            Cada racimo es una parte de tu bodega. Ábrelo y ves exactamente qué
            hace Datuva ahí — con capturas reales de la aplicación.
          </p>
          <p className={`mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] ${hayFoto ? "text-[#E8B4BE]" : "text-[#7C2D3E]"}`}>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#7C2D3E]" />
            Pasa por encima o pincha en cualquiera
          </p>
        </motion.div>

        {/* ── La cepa (escritorio) ───────────────────────────────────────── */}
        <div className="relative mx-auto hidden aspect-[16/9] w-full max-w-5xl md:block">
          <svg
            viewBox="0 0 1000 560"
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
              hayFoto ? "opacity-0" : "opacity-100"
            }`}
            fill="none"
          >
            {/* Tronco */}
            <path
              d="M500,560 C492,470 508,430 500,380 C494,340 470,320 452,300"
              stroke="#4A2E1F"
              strokeOpacity="0.55"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Brazos: de la base a cada racimo. */}
            {nodos.map((n) => {
              const x = (n.x / 100) * 1000;
              const y = (n.y / 100) * 560;
              const cx = 500 + (x - 500) * 0.35;
              const cy = 400;
              return (
                <path
                  key={n.id}
                  d={`M500,400 Q${cx},${cy} ${x},${y}`}
                  stroke="#4A2E1F"
                  strokeOpacity="0.32"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {nodos.map((n, i) => {
            const card = porId.get(n.id)!;
            const Icono = card.icono;
            return (
              <motion.button
                key={n.id}
                type="button"
                onClick={() => {
                  setTocada(true);
                  onCardClick(card);
                }}
                onMouseEnter={() => {
                  setTocada(true);
                  setEncima(n.id);
                }}
                onMouseLeave={() => setEncima(null)}
                onFocus={() => setEncima(n.id)}
                onBlur={() => setEncima(null)}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.06 }}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 focus-visible:outline-none"
              >
                {/* El racimo */}
                <span
                  className={`relative flex h-16 w-16 items-center justify-center border transition-all duration-300 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-offset-2 ${
                    hayFoto
                      ? "border-[#EDE0C8]/25 bg-[#5E6B3A]/55 text-[#F5F0E8] backdrop-blur-[2px] group-hover:bg-[#7C2D3E]/75 group-focus-visible:ring-[#F5F0E8]"
                      : "border-transparent bg-[#4A2E1F] text-[#EDE0C8] shadow-lg shadow-[#4A2E1F]/30 group-hover:bg-[#7C2D3E] group-focus-visible:ring-[#1a1208]"
                  } ${tocada ? "" : "racimo-late"}`}
                  style={{
                    animationDelay: `${i * 0.26}s`,
                    // Silueta de hoja: lóbulos irregulares, no un círculo.
                    borderRadius: "58% 42% 46% 54% / 48% 56% 44% 52%",
                  }}
                >
                  {Icono && <Icono className="h-5 w-5" />}
                </span>
                <span className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${hayFoto ? "text-[#F5F0E8] [text-shadow:0_1px_3px_rgba(0,0,0,0.7)] group-hover:text-[#E8B4BE]" : "text-[#3A2A16] group-hover:text-[#7C2D3E]"}`}>
                  {card.subtitle}
                </span>

                {/* Lo que hay dentro, asomado al pasar por encima. */}
                <span
                  className={`pointer-events-none absolute top-full z-20 mt-2 w-56 border border-[#4A2E1F]/25 bg-[#F5F0E8] p-3 text-left text-[11px] leading-snug text-[#3A2A16] shadow-xl transition-all duration-200 ${
                    encima === n.id ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  {card.resumen ?? card.features[0]?.text}
                  <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.14em] text-[#7C2D3E]">
                    Abrir ficha →
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ── Lista (móvil) ──────────────────────────────────────────────── */}
        <ul className="grid grid-cols-2 gap-2 md:hidden">
          {nodos.map((n) => {
            const card = porId.get(n.id)!;
            const Icono = card.icono;
            return (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => onCardClick(card)}
                  className="flex w-full items-center gap-2.5 border border-[#4A2E1F]/25 px-3 py-3.5 text-left transition-colors active:bg-[#4A2E1F]/10"
                >
                  {Icono && <Icono className="h-4 w-4 shrink-0 text-[#7C2D3E]" />}
                  <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-[#3A2A16]">
                    {card.subtitle}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => abrir("cepa")}
            className={`inline-flex items-center px-8 py-4 text-sm font-medium transition-transform hover:scale-[1.02] ${hayFoto ? "bg-[#F5F0E8] text-[#1a1208]" : "bg-[#1a1208] text-[#F5F0E8]"}`}
          >
            Solicitar demo
          </button>
          <a
            href="#anuncio"
            className={`inline-flex items-center border px-7 py-4 text-sm transition-colors ${hayFoto ? "border-[#F5F0E8]/40 text-[#F5F0E8] hover:border-[#F5F0E8]" : "border-[#1a1208]/35 text-[#1a1208] hover:border-[#1a1208]"}`}
          >
            O baja y te lo contamos
          </a>
        </div>
      </div>
    </section>
  );
};

export default CepaHub;
