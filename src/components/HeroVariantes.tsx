import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContactDialog } from "@/components/ContactDialog";
import appCapturaMenu from "@/assets/app-screenshot-menu.jpg";
import appCapturaMapa from "@/assets/app-screenshot-map.jpg";
import appCapturaAnaliticas from "@/assets/app-screenshot-analytics.jpg";
import appCapturaTrazabilidad from "@/assets/app-screenshot-traceability.jpg";

/**
 * Tres direcciones de hero para elegir, en código real y no en maqueta.
 *
 * Se renderizan con `?hero=descenso|registro|etiqueta` sobre la home. Es andamio
 * temporal: cuando se elija una, esta pieza y el parámetro desaparecen y la
 * ganadora pasa a ser `HeroSection`.
 *
 * Ninguna repite los recursos del hero actual —fondo negro con halos
 * desenfocados, retícula tenue, antetítulo en mono mayúscula— porque justamente
 * eso era lo que hacía que el diseño pareciera de plantilla.
 */

const ESTACIONES = [
  { nombre: "Viña", claro: true },
  { nombre: "Vendimia", claro: true },
  { nombre: "Depósito", claro: true },
  { nombre: "Barrica", claro: false },
  { nombre: "Botella", claro: false },
];

/* El recorrido, pantalla a pantalla. Cada una es una captura REAL de la app y
   está atada a su estación del aforo: al cambiar la pantalla, se enciende la
   marca correspondiente. El movimiento cuenta el recorrido, no adorna. */
const PANTALLAS = [
  { src: appCapturaMenu, estacion: null, pie: "Los nueve módulos, en el móvil" },
  { src: appCapturaMapa, estacion: "Viña", pie: "Parcelas con SIGPAC y geolocalización" },
  { src: appCapturaAnaliticas, estacion: "Depósito", pie: "Fermentación con alertas por rango" },
  { src: appCapturaTrazabilidad, estacion: "Botella", pie: "Trazabilidad de parcela a botella" },
];

const MS_POR_PANTALLA = 3400;

/** Rota las capturas reales dentro del marco del móvil. Se detiene con
 *  `prefers-reduced-motion` y deja fija la primera. */
function usePantallaActiva() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % PANTALLAS.length), MS_POR_PANTALLA);
    return () => clearInterval(t);
  }, []);
  return i;
}

/* ─────────────────────────────────────────────────────────────────────────────
   A · EL DESCENSO
   El vino baja: viña al sol arriba, bodega a oscuras abajo. La página empieza en
   luz, no en negro, y va cayendo. El color hace todo el trabajo: sin halos, sin
   retícula, sin efectos. El titular es enorme y el resto se aparta.
   ───────────────────────────────────────────────────────────────────────────── */
export const HeroDescenso = () => {
  const { abrir } = useContactDialog();
  const activa = usePantallaActiva();
  const estacionActiva = PANTALLAS[activa].estacion;
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F5F0E8 0%, #EADCC2 22%, #C79A55 42%, #7A4E2A 60%, #331F18 78%, #0B0A14 100%)",
      }}
    >
      <div className="container mx-auto grid min-h-[100svh] grid-cols-1 gap-8 px-6 pb-14 pt-28 md:px-10 md:pb-20 md:pt-36 lg:grid-cols-[80px_1.05fr_0.85fr] lg:gap-10">
        {/* ── El aforo ──────────────────────────────────────────────────────
            La regla graduada con la que se mide un depósito. Es un objeto real
            de la bodega —y una pantalla real de la app, /bodega/aforos— así que
            sirve de índice del recorrido en vez de una línea decorativa. */}
        <ol className="relative hidden flex-col justify-between py-2 lg:flex" aria-label="Recorrido del vino">
          {ESTACIONES.map(({ nombre, claro }) => {
            const encendida = nombre === estacionActiva;
            const tinta = claro ? "#3A2A16" : "#F5F0E8";
            return (
            <li key={nombre} className="relative flex items-center gap-3">
              <motion.span
                className="h-px shrink-0"
                style={{ background: encendida ? "#C9A227" : tinta }}
                animate={{ width: encendida ? 34 : 28, opacity: encendida ? 1 : 0.6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
              <motion.span
                className="font-mono text-[9px] uppercase tracking-[0.2em]"
                style={{ color: encendida ? "#C9A227" : tinta }}
                animate={{ opacity: encendida ? 1 : 0.7 }}
                transition={{ duration: 0.5 }}
              >
                {nombre}
              </motion.span>
              {/* Graduación menor entre estaciones. */}
              <span className="absolute left-0 top-1/2 flex flex-col gap-[7px]" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-px w-3"
                    style={{ background: claro ? "#3A2A16" : "#F5F0E8", opacity: 0.28 }}
                  />
                ))}
              </span>
            </li>
            );
          })}
        </ol>

        {/* ── Texto ─────────────────────────────────────────────────────────
            El titular cae con el fondo: la primera línea en la luz de la viña,
            la última ya en la oscuridad de la bodega. */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="max-w-sm text-sm leading-relaxed text-[#4A3520]">
              Software de gestión para bodegas españolas. Campo, bodega,
              cumplimiento y costes en una sola plataforma.
            </p>
            <h1
              className="mt-8 font-serif font-normal leading-[0.85] tracking-[-0.04em] text-[#1a1208]"
              style={{ fontSize: "clamp(3rem, 9.5vw, 8rem)", fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 1' }}
            >
              Del viñedo
            </h1>
          </div>

          <div>
            <h1
              className="font-serif font-normal leading-[0.85] tracking-[-0.04em] text-cream"
              style={{ fontSize: "clamp(3rem, 9.5vw, 8rem)", fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 1' }}
            >
              a la botella
            </h1>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#demo-app"
                className="group inline-flex items-center gap-3 bg-cream px-8 py-4 text-sm font-medium text-[#1a1208] transition-transform hover:scale-[1.02]"
              >
                Ver Datuva funcionando
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={() => abrir("hero")}
                className="inline-flex items-center border border-cream/30 px-7 py-4 text-sm text-cream/85 transition-colors hover:border-cream hover:text-cream"
              >
                Solicitar demo
              </button>
            </div>

            <p className="mt-8 text-xs text-cream/50">
              SILICIE, INFOVI y libros JCyL preparados en formato oficial · El Bierzo
            </p>
          </div>
        </div>

        {/* ── Producto ──────────────────────────────────────────────────────
            El móvil atraviesa la transición: arriba le da la luz de la viña,
            abajo se hunde en la bodega. Es la frase del titular, en una imagen. */}
        <div className="relative hidden items-center justify-center lg:flex">
          <div className="relative w-full max-w-[330px]">
            <div className="relative h-[620px] overflow-hidden rounded-[2.2rem] border-[7px] border-[#241a12]/80 shadow-2xl shadow-black/50">
              <AnimatePresence initial={false}>
                <motion.img
                  key={activa}
                  src={PANTALLAS[activa].src}
                  alt={`Datuva en el móvil: ${PANTALLAS[activa].pie}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </AnimatePresence>
            </div>

            {/* Barra de avance: deja claro que la secuencia rota sola. */}
            <div className="mt-4 flex justify-center gap-1.5" aria-hidden="true">
              {PANTALLAS.map((_, i) => (
                <span
                  key={i}
                  className="h-px w-8 transition-colors duration-500"
                  style={{ background: i === activa ? "#C9A227" : "rgba(245,240,232,0.25)" }}
                />
              ))}
            </div>
            <p className="mt-3 h-8 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-cream/45">
              {PANTALLAS[activa].pie}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   B · EL LIBRO DE REGISTRO
   Lo que vende el producto ES un libro: SILICIE, INFOVI, libros JCyL. Así que la
   portada se compone como la página de un libro de bodega — papel, filete doble,
   cabeceras de columna reales y asientos como renglones. Denso, sobrio, sin un
   solo efecto. Es lo contrario de una landing de SaaS.
   ───────────────────────────────────────────────────────────────────────────── */
const asientos = [
  ["12-08", "Entrada de uva", "Parcela 14", "4.820 kg"],
  ["12-08", "Descube", "Depósito 3", "3.150 L"],
  ["13-08", "Trasiego", "Barrica 27", "225 L"],
  ["14-08", "Embotellado", "Lote 2026-04", "1.400 ud"],
];

export const HeroRegistro = () => {
  const { abrir } = useContactDialog();
  return (
    <section id="inicio" className="relative min-h-[100svh] bg-[#F2ECDF] pt-28 text-[#241C12] md:pt-36">
      <div className="container mx-auto px-6 pb-20 md:px-10">
        <div className="border-y-4 border-double border-[#241C12] py-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em]">
            <span>Libro de registro · Bodega</span>
            <span>Campaña 2026</span>
          </div>
        </div>

        <div className="grid gap-12 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <h1
              className="font-serif font-normal leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.4rem)", fontVariationSettings: '"opsz" 144, "SOFT" 0' }}
            >
              Tu bodega ya lleva
              <br />
              un libro. Que lo
              <br />
              <span className="italic">lleve solo.</span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-[#241C12]/75">
              Cada movimiento que registras en la app se convierte en el asiento
              que pide Hacienda. SILICIE, INFOVI y libros JCyL preparados en
              formato oficial, listos para que los presente tu gestoría.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo-app"
                className="group inline-flex items-center gap-3 bg-[#241C12] px-8 py-4 text-sm font-medium text-[#F2ECDF]"
              >
                Ver Datuva funcionando
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={() => abrir("hero")}
                className="border border-[#241C12]/40 px-7 py-4 text-sm transition-colors hover:border-[#241C12]"
              >
                Solicitar demo
              </button>
            </div>
          </div>

          {/* El asiento contable, tal cual se ve en un libro. */}
          <div className="border-t-2 border-[#241C12] pt-4">
            <table className="w-full text-left">
              <thead>
                <tr className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#241C12]/55">
                  <th className="pb-3 pr-3 font-normal">Fecha</th>
                  <th className="pb-3 pr-3 font-normal">Movimiento</th>
                  <th className="pb-3 pr-3 font-normal">Recipiente</th>
                  <th className="pb-3 text-right font-normal">Cantidad</th>
                </tr>
              </thead>
              <tbody className="cifras font-mono text-[11px]">
                {asientos.map((fila, i) => (
                  <tr key={i} className="border-t border-[#241C12]/20">
                    {fila.map((celda, j) => (
                      <td key={j} className={`py-3 pr-3 ${j === 3 ? "text-right" : ""}`}>
                        {celda}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t-2 border-[#241C12]">
                  <td colSpan={4} className="pt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#241C12]/55">
                    Asiento generado automáticamente · Código NC asignado
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   C · LA ETIQUETA
   La convención tipográfica que un bodeguero reconoce sin pensar: centrado,
   simétrico, filetes, versalitas espaciadas, el nombre grande en el centro y los
   datos legales alrededor. Aquí el producto es el vino y la etiqueta lo declara.
   ───────────────────────────────────────────────────────────────────────────── */
export const HeroEtiqueta = () => {
  const { abrir } = useContactDialog();
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center justify-center bg-[#0B0A14] px-6 py-28 text-cream"
    >
      <div className="w-full max-w-3xl border border-gold/35 px-8 py-14 text-center md:px-16 md:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-gold">
          Bodega · El Bierzo
        </p>

        <div className="mx-auto my-8 h-px w-24 bg-gold/40" />

        <h1
          className="font-serif font-normal uppercase leading-[0.9] tracking-[0.02em]"
          style={{ fontSize: "clamp(2.6rem, 8vw, 5.2rem)", fontVariationSettings: '"opsz" 144, "SOFT" 0' }}
        >
          Del viñedo
          <br />
          a la botella
        </h1>

        <div className="mx-auto my-8 h-px w-24 bg-gold/40" />

        <p className="mx-auto max-w-md text-sm leading-relaxed text-cream/70">
          Campo, bodega, cumplimiento y costes en una sola plataforma. SILICIE,
          INFOVI y libros JCyL preparados en formato oficial.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#demo-app"
            className="group inline-flex items-center gap-3 bg-gold px-8 py-4 text-sm font-medium text-[#0B0A14]"
          >
            Ver Datuva funcionando
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <button
            type="button"
            onClick={() => abrir("hero")}
            className="border border-cream/25 px-7 py-4 text-sm text-cream/85 transition-colors hover:border-gold"
          >
            Solicitar demo
          </button>
        </div>

        {/* Pie de etiqueta: los datos "legales", que aquí son los del producto. */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.24em] text-cream/40">
          <span>Nueve módulos</span>
          <span aria-hidden="true">·</span>
          <span>Trazabilidad parcela → botella</span>
          <span aria-hidden="true">·</span>
          <span>Implantación in situ</span>
        </div>
      </div>

      <img src={appCapturaMenu} alt="" aria-hidden="true" className="hidden" />
    </section>
  );
};
