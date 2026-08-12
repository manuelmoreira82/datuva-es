import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContactDialog } from "@/components/ContactDialog";
import appCapturaMenu from "@/assets/app-screenshot-menu.jpg";
import appCapturaMapa from "@/assets/app-screenshot-map.jpg";
import appCapturaAnaliticas from "@/assets/app-screenshot-analytics.jpg";
import appCapturaTrazabilidad from "@/assets/app-screenshot-traceability.jpg";

/**
 * Hero «el descenso».
 *
 * El vino baja: viña al sol arriba, bodega a oscuras abajo. La página empieza en
 * luz, no en negro, y va cayendo. El titular cae con el fondo — «Del viñedo» en
 * la luz, «a la botella» ya en la oscuridad — y el móvil atraviesa la transición.
 *
 * El índice del recorrido es el AFORO: la regla graduada con la que se mide un
 * depósito, que además es una pantalla real de la app (/bodega/aforos). No es una
 * línea decorativa: es un objeto del oficio.
 *
 * Deliberadamente NO usa halos desenfocados, retícula de fondo ni antetítulos en
 * mono mayúscula. Esos recursos, juntos, son el paquete por defecto que hacía que
 * la web pareciera de plantilla.
 */

const ESTACIONES = [
  { nombre: "Viña", claro: true },
  { nombre: "Vendimia", claro: true },
  { nombre: "Depósito", claro: true },
  { nombre: "Barrica", claro: true },
  { nombre: "Botella", claro: true },
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

const HeroSection = () => {
  const { abrir } = useContactDialog();
  const activa = usePantallaActiva();
  const estacionActiva = PANTALLAS[activa].estacion;
  return (
    <section
      id="inicio"
      /* Sin fondo propio: lo pone la página, que es quien hace el descenso. */
      className="relative min-h-[100svh] overflow-hidden"
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
              style={{ fontSize: "clamp(3rem, 9.5vw, 8rem)" }}
            >
              Del viñedo
            </h1>
          </div>

          <div>
            <h1
              className="font-serif font-normal leading-[0.85] tracking-[-0.04em] text-[#1a1208]"
              style={{ fontSize: "clamp(3rem, 9.5vw, 8rem)" }}
            >
              a la botella
            </h1>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#demo-app"
                className="group inline-flex items-center gap-3 bg-[#1a1208] px-8 py-4 text-sm font-medium text-[#F5F0E8] transition-transform hover:scale-[1.02]"
              >
                Ver Datuva funcionando
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={() => abrir("hero")}
                className="inline-flex items-center justify-center border border-[#1a1208]/35 px-7 py-4 text-sm text-[#1a1208] transition-colors hover:border-[#1a1208]"
              >
                Solicitar demo
              </button>
            </div>

            <p className="mt-8 text-xs text-[#3A2A16]/75">
              SILICIE, INFOVI y libros JCyL preparados en formato oficial · El Bierzo
            </p>
          </div>
        </div>

        {/* ── Producto ──────────────────────────────────────────────────────
            El móvil atraviesa la transición: arriba le da la luz de la viña,
            abajo se hunde en la bodega. Es la frase del titular, en una imagen. */}
        <div className="relative order-last flex items-center justify-center lg:order-none">
          <div className="relative w-full max-w-[230px] sm:max-w-[280px] lg:max-w-[330px]">
            <div className="relative h-[380px] overflow-hidden rounded-[2.2rem] border-[6px] border-[#241a12]/80 shadow-2xl shadow-black/50 sm:h-[460px] lg:h-[620px] lg:border-[7px]">
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
                  style={{ background: i === activa ? "#7A4E2A" : "rgba(58,42,22,0.25)" }}
                />
              ))}
            </div>
            <p className="mt-3 h-8 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-[#3A2A16]/70">
              {PANTALLAS[activa].pie}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
