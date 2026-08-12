import { motion } from "framer-motion";
import Aforo from "@/components/Aforo";
import { ArrowUpRight } from "lucide-react";
import type { SectionCard } from "@/types/modulos";
import EncabezadoSeccion from "@/components/EncabezadoSeccion";

interface Props {
  cards: SectionCard[];
  onCardClick: (card: SectionCard) => void;
}

/* Módulos que además de la ficha llevan la foto de sección de fondo. Se eligen a
   mano y son pocos a propósito: si todas las tarjetas llevan imagen, vuelve a no
   destacar ninguna, que era justo el problema de la versión anterior. */
const CON_FOTO = new Set(["normativa", "costes", "vendimia"]);

/**
 * Rejilla de módulos. Sustituye a las 10 secciones de pantalla completa de
 * ScrollNarrative, que repetían la misma plantilla diez veces y obligaban a
 * ~10 scrolls antes de llegar a cualquier argumento de venta.
 *
 * Las tarjetas tienen tres pesos distintos —captura de app a doble ancho, foto de
 * sección, y ficha compacta— para que la rejilla tenga jerarquía en vez de diez
 * cajas idénticas. Cada una lleva su número de estación: el recorrido parcela →
 * vendimia → bodega → embotellado → expediciones es real, así que numerarlo
 * informa, no decora.
 */
const ModulosBento = ({ cards, onCardClick }: Props) => {
  return (
    <section id="modulos" className="relative overflow-hidden bg-[#0B0A14] py-28 md:py-44">
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
        <div className="grid auto-rows-[minmax(0,auto)] grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {cards.map((card, idx) => {
            const destacada = !!card.captura;
            const conFoto = !destacada && CON_FOTO.has(card.id);
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
                className={`group relative flex flex-col overflow-hidden border border-cream/10 bg-cream/[0.02] p-7 text-left transition-colors duration-300 hover:border-gold/40 hover:bg-cream/[0.05] md:p-9 ${
                  destacada ? "sm:col-span-2" : ""
                }`}
              >
                {/* Foto de sección al fondo, muy apagada: da textura sin competir
                    con el texto. */}
                {conFoto && (
                  <>
                    <img
                      src={card.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.13] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0A14] via-[#0B0A14]/85 to-[#0B0A14]/55" />
                  </>
                )}

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
                  <div className="relative mt-6 overflow-hidden border border-cream/10">
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

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/35">
          Capturas reales de la aplicación. Sin retoques, sin demos falsas.
        </p>
      </div>
    </section>
  );
};

export default ModulosBento;
