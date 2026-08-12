import { useState } from "react";
import { motion } from "framer-motion";
import type { SectionCard } from "@/types/modulos";
import { useContactDialog } from "@/components/ContactDialog";

/**
 * La cepa navegable: primera pantalla de la web.
 *
 * Sobre una fotografía de cepa vieja, cada hoja lleva un menú que abre la ficha
 * de esa parte de la bodega. El texto y los menús los pone la web ENCIMA de la
 * foto, nunca pintados dentro de ella, por tres motivos que no son estéticos:
 * unos píxeles no se pueden pinchar ni recorrer con el tabulador, un texto
 * metido en una imagen no lo indexa un buscador, y un globo pintado se quedaría
 * congelado en el mismo menú para siempre.
 *
 * Las posiciones son porcentajes sobre un lienzo con la MISMA proporción 3:2 que
 * la fotografía, así que hojas y menús no se desalinean al cambiar el tamaño de
 * pantalla. Si se sustituye la foto, hay que volver a medirlas.
 *
 * Debajo de 768 px la cepa no se dibuja: diez zonas pinchables en 390 px quedan
 * solapadas y no se acierta ninguna. Ahí va la lista de las mismas áreas.
 *
 * La cepa es la ENTRADA, no la única página: el resto de la home sigue debajo.
 * Una portada que solo enseña un dibujo no la indexa un buscador ni la escanea
 * quien viene con prisa.
 */

interface Props {
  cards: SectionCard[];
  onCardClick: (card: SectionCard) => void;
}

/* Centro de la hoja donde va cada menú, en % del lienzo 3:2.
   Medidas sobre `public/cepa.webp`. */
const NODOS: { id: string; x: number; y: number }[] = [
  { id: "normativa", x: 62.5, y: 11.0 },
  { id: "vendimia", x: 40.5, y: 33.5 },
  { id: "bodega", x: 61.0, y: 33.0 },
  { id: "costes", x: 75.0, y: 39.0 },
  { id: "campo", x: 31.0, y: 47.0 },
  { id: "expediciones", x: 66.0, y: 54.0 },
  { id: "rrhh", x: 84.0, y: 54.0 },
  { id: "laboratorio", x: 36.0, y: 58.5 },
  { id: "embotellado", x: 50.5, y: 64.5 },
  { id: "proveedores", x: 75.5, y: 64.5 },
];

const CepaHub = ({ cards, onCardClick }: Props) => {
  const { abrir } = useContactDialog();
  // La invitación se apaga en cuanto se toca o se pasa por encima una vez.
  const [tocada, setTocada] = useState(false);
  const [encima, setEncima] = useState<string | null>(null);
  const porId = new Map(cards.map((c) => [c.id, c]));
  const nodos = NODOS.filter((n) => porId.has(n.id));

  const textoIntro = (
    <>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D9B274] md:text-[11px]">
        Software para bodegas españolas
      </p>
      <h1 className="mt-3 font-serif text-[2.4rem] font-normal leading-[0.9] tracking-[-0.035em] text-[#F5F0E8] md:mt-4 md:text-[3.4rem]">
        Toca la cepa.
      </h1>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#F5F0E8]/85 md:mt-4">
        Cada hoja es una parte de tu bodega. Ábrela y ves exactamente qué hace
        Datuva ahí — con capturas reales de la aplicación.
      </p>
      <p className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#E8B4BE]">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#E8B4BE]" />
        <span className="hidden md:inline">Pasa por encima o pincha en cualquiera</span>
        <span className="md:hidden">Toca cualquiera</span>
      </p>
    </>
  );

  return (
    <section id="cepa" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <img
        src="/cepa.webp"
        alt="Cepa vieja de viñedo en El Bierzo"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      {/* Velo: sin esto el texto compite con las hojas. Más denso a la izquierda,
          que es donde cae el titular. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(16,11,8,0.84) 0%, rgba(16,11,8,0.55) 34%, rgba(16,11,8,0.26) 62%, rgba(16,11,8,0.44) 100%)",
        }}
      />

      {/* ── Escritorio: lienzo con la proporción de la foto ─────────────────── */}
      <div className="relative z-10 hidden w-full md:block">
        <div className="relative mx-auto aspect-[3/2] w-full max-w-[1500px]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[4%] top-[9%] w-[30%] max-w-sm"
          >
            {textoIntro}
          </motion.div>

          {nodos.map((n, i) => {
            const card = porId.get(n.id)!;
            const Icono = card.icono;
            const aLaDerecha = n.x > 62;
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
                transition={{ duration: 0.45, delay: 0.3 + i * 0.06 }}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 focus-visible:outline-none"
              >
                <span
                  className={`relative flex h-12 w-12 items-center justify-center border border-[#F5F0E8]/30 bg-[#2A1F12]/70 text-[#F5F0E8] backdrop-blur-[2px] transition-all duration-300 group-hover:scale-110 group-hover:border-[#E8B4BE]/60 group-hover:bg-[#7C2D3E]/85 group-focus-visible:ring-2 group-focus-visible:ring-[#F5F0E8] lg:h-14 lg:w-14 ${
                    tocada ? "" : "racimo-late"
                  }`}
                  style={{
                    animationDelay: `${i * 0.26}s`,
                    borderRadius: "58% 42% 46% 54% / 48% 56% 44% 52%",
                  }}
                >
                  {Icono && <Icono className="h-5 w-5" />}
                </span>
                <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-[#F5F0E8] [text-shadow:0_1px_4px_rgba(0,0,0,0.85)] transition-colors group-hover:text-[#E8B4BE] lg:text-[10px]">
                  {card.subtitle}
                </span>

                {/* Lo que hay dentro, asomado al pasar por encima. */}
                <span
                  className={`pointer-events-none absolute top-full z-20 mt-2 w-56 border border-[#4A2E1F]/25 bg-[#F5F0E8] p-3 text-left text-[11px] leading-snug text-[#3A2A16] shadow-2xl transition-all duration-200 ${
                    aLaDerecha ? "right-0" : "left-0"
                  } ${encima === n.id ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
                >
                  {card.resumen ?? card.features[0]?.text}
                  <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.14em] text-[#7C2D3E]">
                    Abrir ficha →
                  </span>
                </span>
              </motion.button>
            );
          })}

          <div className="absolute bottom-[3%] left-[4%] flex items-center gap-3">
            <button
              type="button"
              onClick={() => abrir("cepa")}
              className="inline-flex items-center bg-[#F5F0E8] px-7 py-3.5 text-sm font-medium text-[#1a1208] transition-transform hover:scale-[1.02]"
            >
              Solicitar demo
            </button>
            <a
              href="#anuncio"
              className="inline-flex items-center border border-[#F5F0E8]/40 px-6 py-3.5 text-sm text-[#F5F0E8] transition-colors hover:border-[#F5F0E8]"
            >
              O baja y te lo contamos
            </a>
          </div>
        </div>
      </div>

      {/* ── Móvil: lista ───────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-6 py-28 md:hidden">
        {textoIntro}

        <ul className="mt-8 grid grid-cols-2 gap-2">
          {nodos.map((n) => {
            const card = porId.get(n.id)!;
            const Icono = card.icono;
            return (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => onCardClick(card)}
                  className="flex w-full items-center gap-2.5 border border-[#F5F0E8]/25 bg-[#2A1F12]/60 px-3 py-3.5 text-left backdrop-blur-[2px] transition-colors active:bg-[#7C2D3E]/70"
                >
                  {Icono && <Icono className="h-4 w-4 shrink-0 text-[#E8B4BE]" />}
                  <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-[#F5F0E8]">
                    {card.subtitle}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => abrir("cepa")}
          className="mt-8 inline-flex w-full items-center justify-center bg-[#F5F0E8] px-7 py-4 text-sm font-medium text-[#1a1208]"
        >
          Solicitar demo
        </button>
      </div>
    </section>
  );
};

export default CepaHub;
