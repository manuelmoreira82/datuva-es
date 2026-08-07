import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { SectionCard } from "@/types/modulos";

interface Props {
  cards: SectionCard[];
  onCardClick: (card: SectionCard) => void;
}

/**
 * Rejilla de módulos. Sustituye a las 10 secciones de pantalla completa de
 * ScrollNarrative, que repetían la misma plantilla diez veces y obligaban a
 * ~10 scrolls antes de llegar a cualquier argumento de venta.
 *
 * Las tarjetas con captura real de la app ocupan el doble de ancho: son las que
 * enseñan el producto, que es lo que ninguna competencia hace.
 */
const ModulosBento = ({ cards, onCardClick }: Props) => {
  return (
    <section id="modulos" className="relative overflow-hidden bg-[#0B0A14] py-24 md:py-32">
      {/* Halos de color muy difusos, en lugar de las fotos de fondo al 20% */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[600px] rounded-full bg-[#1B2A4A] opacity-30 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[500px] rounded-full bg-[#7C2D3E] opacity-20 blur-[160px]" />

      <div className="container relative z-10 mx-auto px-6 md:px-10">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#C9A227]">
            La plataforma
          </p>
          <h2 className="font-serif text-3xl leading-[1.1] tracking-[-0.02em] text-[#F5F0E8] sm:text-4xl md:text-5xl">
            Nueve módulos. Un solo sitio donde mirar.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#F5F0E8]/70 md:text-lg">
            Del cuaderno de campo al albarán de salida. Toca cualquiera para ver
            todo lo que incluye.
          </p>
        </div>

        {/* grid-flow-dense: sin él, una tarjeta de doble ancho que no cabe en el
            hueco restante salta de fila y deja un agujero. Con dense, una tarjeta
            simple posterior rellena ese hueco. */}
        <div className="grid auto-rows-[minmax(0,auto)] grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => {
            const destacada = !!card.captura;
            const Icono = card.icono;
            const resumen = card.resumen ?? card.features[0]?.text ?? "";

            return (
              <motion.button
                key={card.id}
                type="button"
                onClick={() => onCardClick(card)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: Math.min(idx, 6) * 0.05 }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#F5F0E8]/10 bg-[#F5F0E8]/[0.04] p-5 text-left transition-colors duration-300 hover:border-[#C9A227]/50 hover:bg-[#F5F0E8]/[0.07] md:p-7 ${
                  destacada ? "sm:col-span-2" : ""
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-3 md:mb-4">
                  <div className="flex items-center gap-2.5 md:gap-3">
                    {Icono && (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C9A227]/15 md:h-9 md:w-9">
                        <Icono className="h-4 w-4 text-[#C9A227] md:h-[18px] md:w-[18px]" />
                      </span>
                    )}
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#C9A227]/80 md:text-[11px] md:tracking-[0.2em]">
                      {card.subtitle}
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-[#F5F0E8]/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C9A227]" />
                </div>

                <h3 className="text-base font-semibold leading-snug text-[#F5F0E8] md:text-xl">
                  {card.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#F5F0E8]/60 md:mt-3 md:text-sm">
                  {resumen}
                </p>

                {destacada && (
                  <div className="relative mt-4 overflow-hidden rounded-xl border border-[#F5F0E8]/10 md:mt-6">
                    <img
                      src={card.captura}
                      alt={`Datuva — ${card.subtitle}`}
                      loading="lazy"
                      decoding="async"
                      className="h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] md:h-64"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B0A14]/70 to-transparent" />
                  </div>
                )}

                {/* En móvil basta la flecha: la etiqueta solo añadía altura. */}
                <span className="mt-auto hidden pt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F5F0E8]/35 transition-colors group-hover:text-[#C9A227] md:inline">
                  Ver detalle
                </span>
              </motion.button>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-[#F5F0E8]/40">
          Capturas reales de la aplicación. Sin retoques, sin demos falsas.
        </p>
      </div>
    </section>
  );
};

export default ModulosBento;
