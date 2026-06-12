import { ArrowRight, Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import sectionCampo from "@/assets/section-campo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-end overflow-hidden pt-28 md:pt-32">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={sectionCampo}
          alt="Viñedos españoles"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-accent font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4"
          >
            Campo y bodega · Cumplimiento normativo · Control de costes
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] md:leading-[0.95] tracking-tight mb-6 text-white"
          >
            Toda tu bodega{" "}
            <span className="text-accent block sm:inline mt-2 sm:mt-0">
              a golpe de clic.
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-white/80 text-base md:text-lg max-w-2xl mb-8 leading-relaxed"
          >
            Olvídate de pasar horas trasladando datos del papel al Excel.
            Con Datuva controlas depósitos, barricas, trabajos del viñedo y de bodega
            desde el móvil. SILICIE, INFOVI y libros oficiales JCYL se generan solos,
            listos para presentar.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="contact" size="lg" asChild className="text-base group">
              <a href="#demo-app" className="gap-2">
                Ver demo en 2 minutos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-base border-white/40 text-white hover:bg-white/15 hover:text-white"
            >
              <a href="#modulos">Ver cómo funciona</a>
            </Button>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex items-center gap-6 text-white/50 text-sm"
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span>Móvil</span>
            </div>
            <div className="flex items-center gap-2">
              <Tablet className="w-4 h-4" />
              <span>Tablet</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span>Ordenador</span>
            </div>
            <span className="text-white/20">|</span>
            <span>Instalable como app</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
