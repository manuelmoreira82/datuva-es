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
    <section id="inicio" className="relative h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={sectionCampo}
          alt="Viñedos españoles"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
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
            Gestión integral para bodegas
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-6 text-white"
          >
            Del campo a la botella.
            <br />
            <span className="text-accent">Todo bajo control.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-white/75 text-base md:text-lg max-w-2xl mb-8 leading-relaxed"
          >
            Plataforma de gestión integral diseñada para bodegas españolas. 
            Viñedo, bodega, laboratorio, embotellado, normativa y costes — en una sola app.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="contact" size="lg" asChild className="text-base group">
              <a
                href="mailto:manuelmoreira@datuva.es?subject=Solicitud%20de%20demostraci%C3%B3n%20Datuva"
                className="gap-2"
              >
                Solicitar demostración
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-base border-white/40 text-white hover:bg-white/15 hover:text-white"
            >
              <a href="#modulos">Ver módulos</a>
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
