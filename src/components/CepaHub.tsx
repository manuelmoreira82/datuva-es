import { useState } from "react";
import { motion } from "framer-motion";
import type { SectionCard } from "@/types/modulos";
import { useContactDialog } from "@/components/ContactDialog";
import { HOJAS } from "@/components/cepaHojas";

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

/* Orden de aparición. La posición de cada uno NO se escribe a mano: sale del
   centroide de su hoja, medido sobre la fotografía en `cepaHojas.ts`. */
const ORDEN = [
  "normativa", "vendimia", "bodega", "costes", "campo",
  "expediciones", "rrhh", "laboratorio", "embotellado", "proveedores",
];

const CepaHub = ({ cards, onCardClick }: Props) => {
  const { abrir } = useContactDialog();
  // La invitación se apaga en cuanto se toca o se pasa por encima una vez.
  const [tocada, setTocada] = useState(false);
  const [encima, setEncima] = useState<string | null>(null);
  const porId = new Map(cards.map((c) => [c.id, c]));
  const nodos = ORDEN.filter((id) => porId.has(id) && HOJAS[id]).map((id) => ({
    id,
    x: HOJAS[id].cx,
    y: HOJAS[id].cy,
  }));

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
        className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-[4px] md:scale-100 md:blur-0"
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
          {/* Las hojas de verdad, recortadas de la foto. Un filo tenue siempre,
              para que se vea que son seleccionables; encendidas al señalarlas. */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <filter id="brilloHoja" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.1" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {nodos.map((n) => {
              const activa = encima === n.id;
              return (
                <polygon
                  key={n.id}
                  points={HOJAS[n.id].puntos}
                  vectorEffect="non-scaling-stroke"
                  filter={activa ? "url(#brilloHoja)" : undefined}
                  style={{ transition: "fill 0.28s ease, stroke 0.28s ease" }}
                  fill={activa ? "rgba(124,45,62,0.55)" : "rgba(245,240,232,0.04)"}
                  stroke={activa ? "rgba(232,180,190,0.95)" : "rgba(245,240,232,0.22)"}
                  strokeWidth={activa ? 2 : 1}
                />
              );
            })}
          </svg>
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

      {/* ── Móvil: la cepa se desplaza con el dedo ────────────────────────
          Miniaturizar la foto a 390 px dejaría las hojas a 30 px y las zonas de
          toque solapadas. En vez de eso se muestra a más del doble de ancho
          dentro de un carril con desplazamiento horizontal: las hojas conservan
          su tamaño y cada menú tiene una zona de toque de 44 px, que es el
          mínimo para el dedo. Debajo queda la lista completa, porque el gesto de
          arrastrar no lo descubre todo el mundo. */}
      <div className="relative z-10 w-full pb-24 pt-32 md:hidden">
        <div className="px-6">{textoIntro}</div>

        <div className="mt-8 overflow-x-auto overscroll-x-contain pb-2">
          {/* La foto va DENTRO del carril: si se queda en la sección, el carril
              se desplaza y ella no, y las hojas dejan de coincidir con sus
              menús. Mismo ancho y misma proporción que la capa de botones. */}
          <div className="relative aspect-[3/2] w-[240vw] max-w-none">
            <img
              src="/cepa.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[#100B08]/35"
            />
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              {nodos.map((n) => (
                <polygon
                  key={n.id}
                  points={HOJAS[n.id].puntos}
                  vectorEffect="non-scaling-stroke"
                  fill="rgba(245,240,232,0.05)"
                  stroke="rgba(245,240,232,0.3)"
                  strokeWidth={1}
                />
              ))}
            </svg>
            {nodos.map((n) => {
              const card = porId.get(n.id)!;
              const Icono = card.icono;
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => onCardClick(card)}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  className="absolute flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center border border-[#F5F0E8]/35 bg-[#2A1F12]/75 text-[#F5F0E8] backdrop-blur-[2px] active:bg-[#7C2D3E]/85"
                    style={{ borderRadius: "58% 42% 46% 54% / 48% 56% 44% 52%" }}
                  >
                    {Icono && <Icono className="h-4 w-4" />}
                  </span>
                  <span className="whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.12em] text-[#F5F0E8] [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
                    {card.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-2 px-6 font-mono text-[9px] uppercase tracking-[0.14em] text-[#F5F0E8]/55">
          ← Desliza la cepa →
        </p>

        <div className="mt-10 px-6">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#D9B274]">
            Todas las áreas
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {nodos.map((n) => {
              const card = porId.get(n.id)!;
              const Icono = card.icono;
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => onCardClick(card)}
                    className="flex w-full items-center gap-2.5 border border-[#F5F0E8]/25 bg-[#2A1F12]/60 px-3 py-3.5 text-left backdrop-blur-[2px] active:bg-[#7C2D3E]/70"
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
      </div>

    </section>
  );
};

export default CepaHub;
