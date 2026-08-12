import { motion } from "framer-motion";
import Aforo from "@/components/Aforo";
import { ArrowUpRight } from "lucide-react";
import type { SectionCard } from "@/types/modulos";
import EncabezadoSeccion from "@/components/EncabezadoSeccion";

interface Props {
  cards: SectionCard[];
  onCardClick: (card: SectionCard) => void;
}

/**
 * Rejilla de módulos. Sustituye a las 10 secciones de pantalla completa de
 * ScrollNarrative, que repetían la misma plantilla diez veces y obligaban a
 * ~10 scrolls antes de llegar a cualquier argumento de venta.
 *
 * Los módulos van sueltos sobre el fondo, sin caja ni borde: la rejilla de
 * tarjetas dibujaba una cuadrícula que competía con el degradado de la página.
 * La jerarquía la dan el espacio y el tamaño — los que tienen captura de la app
 * ocupan doble ancho. Cada uno lleva su número de estación: el recorrido parcela
 * → vendimia → bodega → embotellado → expediciones es real, así que numerarlo
 * informa, no decora.
 */
const ModulosBento = ({ cards, onCardClick }: Props) => {
  return (
    <section id="modulos" className="relative overflow-hidden py-28 md:py-44">
      <Aforo />

      <div className="container relative z-10 mx-auto px-6 md:px-10 lg:pl-20">
        <EncabezadoSeccion
          codigo="03"
          etiqueta="La plataforma"
          titulo={
            <>
              Nueve módulos.
              <br />
              Un solo sitio donde mirar.
            </>
          }
          descripcion="Del cuaderno de campo al albarán de salida. Toca cualquiera para ver todo lo que incluye."
          className="mb-16 md:mb-24"
        />

        {/* grid-flow-dense: sin él, una tarjeta de doble ancho que no cabe en el
            hueco restante salta de fila y deja un agujero. Con dense, una tarjeta
            simple posterior rellena ese hueco. */}
        <div className="grid auto-rows-[minmax(0,auto)] grid-flow-row-dense grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-20">
          {cards.map((card, idx) => {
            const destacada = !!card.captura;
            const Icono = card.icono;
            const resumen = card.resumen ?? card.features[0]?.text ?? "";
            const numero = String(idx + 1).padStart(2, "0");

            return (
              <motion.button
                key={card.id}
                type="button"
                onClick={() => onCardClick(card)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: Math.min(idx, 6) * 0.05 }}
                className={`group relative flex flex-col text-left transition-opacity duration-300 hover:opacity-100 md:pr-6 lg:opacity-90 ${
                  destacada ? "sm:col-span-2" : ""
                }`}
              >

                <div className="relative mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="cifras font-mono text-[11px] tracking-[0.16em] text-gold/70">
                      {numero}
                    </span>
                    <span aria-hidden="true" className="traza-rama h-px w-4" />
                    {Icono && <Icono className="h-4 w-4 shrink-0 text-gold" />}
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55 md:text-[11px]">
                      {card.subtitle}
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-cream/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                </div>

                <h3
                  className={`relative font-serif font-normal leading-[1.15] tracking-[-0.01em] text-cream ${
                    destacada ? "text-2xl md:text-[2rem]" : "text-xl md:text-2xl"
                  }`}
                >
                  {card.title}
                </h3>
                <p className="relative mt-3 text-[13px] leading-relaxed text-cream/60 md:text-sm">
                  {resumen}
                </p>

                {destacada && (
                  <div className="relative mt-7 overflow-hidden">
                    <img
                      src={card.captura}
                      alt={`Datuva — ${card.subtitle}`}
                      loading="lazy"
                      decoding="async"
                      className="h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] md:h-72"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B0A14]/80 to-transparent" />
                  </div>
                )}

                {/* En móvil basta la flecha: la etiqueta solo añadía altura. */}
                <span className="relative mt-auto hidden pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/30 transition-colors group-hover:text-gold md:inline">
                  Ver detalle
                </span>
              </motion.button>
            );
          })}
        </div>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/35">
          Capturas reales de la aplicación. Sin retoques, sin demos falsas.
        </p>
      </div>
    </section>
  );
};

export default ModulosBento;
