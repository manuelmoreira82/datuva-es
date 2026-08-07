import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContactDialog } from "@/components/ContactDialog";
import appCapturaMenu from "@/assets/app-screenshot-menu.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const HeroSection = () => {
  const { abrir } = useContactDialog();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0B0A14] text-[#F5F0E8]"
    >
      {/* Halos difusos */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[600px] w-[700px] rounded-full bg-[#1B2A4A] opacity-40 blur-[170px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-[#7C2D3E] opacity-25 blur-[180px]" />

      {/* Grano */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="heroGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroGrain)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-9 px-6 pb-16 pt-28 md:gap-14 md:px-10 md:pb-24 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Columna de texto */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#C9A227]"
          >
            Software para bodegas españolas
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-[2.6rem] font-normal leading-[1.05] tracking-[-0.025em] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            Del viñedo a la botella,
            <br />
            <span className="italic font-light text-[#C9A227]">en una sola app.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-7 max-w-xl text-lg leading-relaxed text-[#F5F0E8]/80 md:text-xl"
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
              className="group inline-flex items-center gap-3 rounded-full bg-[#C9A227] px-8 py-4 text-sm font-semibold tracking-wide text-[#0B0A14] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Ver Datuva funcionando
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={() => abrir("hero")}
              className="inline-flex items-center gap-2 rounded-full border border-[#F5F0E8]/20 px-6 py-4 text-sm font-medium tracking-wide text-[#F5F0E8]/85 transition-colors hover:border-[#C9A227]/60 hover:text-[#F5F0E8]"
            >
              Solicitar demo
            </button>
          </motion.div>

          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-7 text-sm text-[#F5F0E8]/45"
          >
            Diseñado en El Bierzo · Implantación in situ con QRs · Funciona sin cobertura
          </motion.p>
        </div>

        {/* Columna de producto */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[195px] sm:max-w-[240px] lg:max-w-[340px]"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-[#C9A227]/10 blur-3xl" />
          {/* Marco de móvil */}
          <div className="relative overflow-hidden rounded-[2.2rem] border-[6px] border-[#1a1a24] bg-[#1a1a24] shadow-2xl shadow-black/60">
            <img
              src={appCapturaMenu}
              alt="Datuva en el móvil: menú de módulos de la aplicación"
              width={340}
              height={700}
              /* Recortada por abajo: a tamaño completo el móvil medía ~700 px y
                 se salía del hero, quedando cortado a media pantalla. */
              className="block max-h-[340px] w-full rounded-[1.7rem] object-cover object-top sm:max-h-[420px] lg:max-h-[540px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
