import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#0B0A14] text-[#F5F0E8]"
    >
      {/* Subtle vignette glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#1B2A4A] blur-[180px] opacity-40" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#7C2D3E] blur-[200px] opacity-20" />

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="heroGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroGrain)" />
        </svg>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-24 max-w-5xl mx-auto">
        {/* Counter */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-12 md:mb-16 flex items-center gap-3 text-[#C9A227]/55 tracking-[0.4em] text-[10px] font-medium"
        >
          <span>01</span>
          <span className="opacity-40">/</span>
          <span className="opacity-60">DATUVA · MMXXVI</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-serif font-normal leading-[1.02] tracking-[-0.02em] text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] max-w-4xl"
        >
          Es hora de reimaginar
          <br />
          <span className="italic font-light text-[#C9A227]">la bodega.</span>
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-12 md:mt-16 flex items-center gap-2"
        >
          <span className="block h-px w-20 md:w-32 bg-[#C9A227]" />
          <span className="block h-px w-6 bg-[#C9A227]/40" />
        </motion.div>

        {/* Sub */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          /* Es el único texto que explica qué vende Datuva. Estaba al 55% de
             opacidad y en tamaño base: el mensaje más importante era el menos
             visible de la sección. */
          className="mt-12 md:mt-16 text-[#F5F0E8]/85 text-lg md:text-xl max-w-2xl leading-relaxed font-light"
        >
          Campo, bodega, cumplimiento y costes en una sola plataforma.
          SILICIE, INFOVI y libros JCyL preparados y exportados en formato oficial,
          listos para que los presentes tú o tu gestoría.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#demo-app"
            className="group inline-flex items-center gap-3 bg-[#C9A227] text-[#0B0A14] px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Ver demo
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#modulos"
            className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#F5F0E8]/15 text-[#F5F0E8]/80 hover:text-[#F5F0E8] hover:border-[#F5F0E8]/40 text-sm font-medium tracking-wide transition-colors"
          >
            Explorar plataforma
            <span className="text-[#C9A227] transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        /* Oculto en móvil: ahí el hero ya llena la pantalla y el indicador se
           solapaba con los botones. */
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-[10px] text-[#F5F0E8]/40 tracking-[0.3em] uppercase"
      >
        <span>Scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-[#C9A227]/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
