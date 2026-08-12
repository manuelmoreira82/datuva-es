import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContactDialog } from "@/components/ContactDialog";
import appCapturaMenu from "@/assets/app-screenshot-menu.jpg";
import FondoTraza from "@/components/FondoTraza";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* Las cuatro estaciones del recorrido que vende el producto. Son las mismas que
   luego numeran los módulos, para que el hero anuncie la estructura de la página
   en vez de ser un bloque suelto. */
const estaciones = ["Parcela", "Depósito", "Barrica", "Botella"];

const HeroSection = () => {
  const { abrir } = useContactDialog();
  const [videoListo, setVideoListo] = useState(false);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0B0A14] text-cream"
    >
      {/* ── Fondo con movimiento ──────────────────────────────────────────────
          Capa base: las trazas de circuito-viña de la marca, animadas. No es una
          fotografía: las de `src/assets` son de stock y una muestra una interfaz
          inventada, que contradice el «capturas reales» que promete la web.

          Encima, opcional, un bucle de vídeo mudo. Solo aparece si el fichero
          existe y el navegador puede reproducirlo (`onCanPlay`); si falta o falla,
          `onError` lo deja oculto y se quedan las trazas. Por eso NO se referencia el
          anuncio completo: pesa 16 MB y cargarlo de fondo en la portada sería
          inaceptable para una bodega con mala conexión.

          Para activarlo, dejar en `public/` un bucle corto y mudo (2-4 s):
            ffmpeg -i public/datuva-anuncio-web.mp4 -ss 3 -t 4 -an \
              -vf "scale=1280:-2" -c:v libvpx-vp9 -crf 40 -b:v 0 public/hero-loop.webm
            ffmpeg -i public/datuva-anuncio-web.mp4 -ss 3 -t 4 -an \
              -vf "scale=1280:-2" -c:v libx264 -crf 30 public/hero-loop.mp4
          Objetivo: por debajo de 1,5 MB. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <FondoTraza className="opacity-90" />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/poster-anuncio.jpg"
          onCanPlay={() => setVideoListo(true)}
          onError={() => setVideoListo(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoListo ? "opacity-30" : "opacity-0"
          }`}
        >
          <source src="/hero-loop.webm" type="video/webm" />
          <source src="/hero-loop.mp4" type="video/mp4" />
        </video>

        {/* Velo de legibilidad: sin esto el titular compite con el viñedo. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A14] via-[#0B0A14]/85 to-[#0B0A14]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A14] via-transparent to-[#0B0A14]/70" />
      </div>

      {/* Retícula de fondo: papel pautado de libro de registro, no una foto de 2 MB. */}
      <div className="fondo-reticula pointer-events-none absolute inset-0 opacity-70" />

      {/* Halos difusos: azul de marca arriba, vino abajo. */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[600px] w-[700px] rounded-full bg-primary opacity-40 blur-[170px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-bordeaux opacity-25 blur-[180px]" />

      {/* Grano */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="heroGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroGrain)" />
        </svg>
      </div>

      {/* La traza arranca aquí y baja por toda la página. */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ transformOrigin: "top" }}
        className="traza-vertical pointer-events-none absolute bottom-0 left-6 top-1/3 hidden w-px lg:block"
      />

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-10 px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pl-20">
        {/* Columna de texto */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold"
          >
            <span className="h-px w-8 traza-rama" aria-hidden="true" />
            Software para bodegas españolas
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-[2.9rem] font-normal leading-[0.98] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[5rem]"
            style={{ fontVariationSettings: '"opsz" 120, "SOFT" 20, "WONK" 1' }}
          >
            Del viñedo
            <br />
            a la botella,
            <br />
            <span className="italic text-gold">en una sola app.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-lg text-lg leading-relaxed text-cream/70"
          >
            Campo, bodega, cumplimiento y costes en una sola plataforma. SILICIE,
            INFOVI y libros JCyL preparados en formato oficial.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
          >
            <a
              href="#demo-app"
              className="group inline-flex items-center gap-3 bg-gold px-8 py-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#0B0A14] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Ver Datuva funcionando
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={() => abrir("hero")}
              className="inline-flex items-center gap-2 border border-cream/20 px-7 py-4 font-mono text-xs uppercase tracking-[0.14em] text-cream/85 transition-colors hover:border-gold/60 hover:text-cream"
            >
              Solicitar demo
            </button>
          </motion.div>

          {/* Las estaciones del recorrido, encadenadas por la traza. */}
          <motion.ol
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/40 lg:justify-start"
          >
            {estaciones.map((estacion, i) => (
              <li key={estacion} className="flex items-center gap-3">
                {i > 0 && <span className="h-px w-5 bg-gold/35" aria-hidden="true" />}
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold/70" aria-hidden="true" />
                  {estacion}
                </span>
              </li>
            ))}
          </motion.ol>

          <motion.p
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 text-sm text-cream/40"
          >
            Diseñado en El Bierzo · Implantación in situ con QRs
          </motion.p>
        </div>

        {/* Columna de producto */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[230px] sm:max-w-[280px] lg:max-w-[390px]"
        >
          <div className="absolute -inset-10 rounded-full bg-gold/10 blur-3xl" />

          {/* Rama de la traza que va a buscar el móvil. */}
          <span
            aria-hidden="true"
            className="traza-rama absolute -left-20 top-1/2 hidden h-px w-20 lg:block"
          />
          <span
            aria-hidden="true"
            className="traza-nodo absolute -left-20 top-1/2 hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold lg:block"
          />

          <div className="relative overflow-hidden rounded-[2.4rem] border-[6px] border-[#1a1a24] bg-[#1a1a24] shadow-2xl shadow-black/60">
            <img
              src={appCapturaMenu}
              alt="Datuva en el móvil: menú de módulos de la aplicación"
              width={390}
              height={780}
              /* Recortada por abajo: a tamaño completo el móvil medía ~700 px y
                 se salía del hero, quedando cortado a media pantalla. */
              className="block max-h-[380px] w-full rounded-[1.9rem] object-cover object-top sm:max-h-[460px] lg:max-h-[600px]"
            />
          </div>

          {/* Pie de imagen en mono: es una captura real, no un render. */}
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-cream/35">
            Pantalla real de la aplicación
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
