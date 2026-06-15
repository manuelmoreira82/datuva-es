import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#14110F] pt-28 md:pt-32"
    >
      {/* Ambient color glows */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#7C2D3E] blur-[140px] opacity-25" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#1B2A4A] blur-[140px] opacity-30" />

      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="heroNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroNoise)" />
        </svg>
      </div>

      {/* Oversized decorative year */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-6 md:-bottom-20 md:-right-10 font-serif font-black text-[#F5F0E8] opacity-[0.04] leading-none text-[14rem] md:text-[26rem] select-none"
      >
        2026
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10 py-16 md:py-24">
        <div className="max-w-4xl flex flex-col gap-8 md:gap-10">
          {/* Kicker */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="space-y-2">
            <span className="block text-[10px] md:text-xs tracking-[0.28em] uppercase text-[#C9A227] font-semibold">
              Campo y bodega · Cumplimiento · Costes
            </span>
            <div className="h-px w-14 bg-[#C9A227]/50" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-[#F5F0E8] leading-[0.92] tracking-tight flex flex-col"
          >
            <span className="text-5xl sm:text-7xl md:text-8xl font-black">Toda tu</span>
            <span className="text-6xl sm:text-8xl md:text-9xl font-black italic ml-3 md:ml-6">
              bodega
            </span>
            <span className="text-3xl sm:text-5xl md:text-6xl font-light text-[#C9A227] mt-3 border-l-2 border-[#C9A227] pl-4 md:pl-6 italic">
              a golpe de clic.
            </span>
          </motion.h1>

          {/* Body */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[#F5F0E8]/70 text-base md:text-lg max-w-xl leading-relaxed"
          >
            Olvídate de pasar horas trasladando datos del papel al Excel. Controla depósitos,
            barricas y trabajos de viñedo desde el móvil.{" "}
            <span className="text-[#F5F0E8] font-medium">SILICIE, INFOVI y libros JCYL</span>{" "}
            se generan solos, listos para presentar.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <a
              href="#demo-app"
              className="group relative overflow-hidden bg-[#C9A227] text-[#14110F] py-4 px-7 flex items-center justify-between sm:justify-center gap-4 font-bold transition-all active:scale-[0.98]"
            >
              <span className="relative z-10 text-sm tracking-[0.18em] uppercase">
                Ver demo en 2 minutos
              </span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="#modulos"
              className="group py-4 px-7 flex items-center justify-between sm:justify-center gap-3 border border-[#F5F0E8]/25 text-[#F5F0E8] hover:bg-[#F5F0E8]/5 transition-colors text-sm tracking-[0.18em] uppercase font-medium"
            >
              Ver cómo funciona
              <span className="text-[#C9A227] transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Status indicator */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 pt-4 text-[11px] text-[#F5F0E8]/50 uppercase tracking-[0.22em]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C2D3E] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7C2D3E]" />
            </span>
            Gestión enológica · Móvil · Tablet · Web
          </motion.div>
        </div>
      </div>

      {/* Bottom hairline accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />
    </section>
  );
};

export default HeroSection;
