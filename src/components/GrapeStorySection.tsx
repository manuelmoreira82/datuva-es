import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import storyBg from "@/assets/hero-vineyard.jpg";

type Caption = {
  start: number;
  end: number;
  text: string;
};

const captions: Caption[] = [
  { start: 0.0, end: 2.3, text: "Nazco en la viña." },
  { start: 2.3, end: 4.4, text: "Me da el sol, me llueve, me podan." },
  { start: 4.4, end: 6.6, text: "Me vendimian a mano." },
  { start: 6.6, end: 8.8, text: "Entro en una caja de quince kilos." },
  { start: 8.8, end: 11.0, text: "Fermento. Descanso en barrica." },
  { start: 11.0, end: 13.5, text: "Y termino servido en una copa." },
];

const GrapeStorySection = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const current = captions[activeIdx];
    const durationMs = (current.end - current.start) * 1000;
    const timer = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % captions.length);
    }, durationMs);
    return () => clearTimeout(timer);
  }, [activeIdx]);

  return (
    <section
      id="historia"
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black"
    >
      {/* Imagen de fondo con leve zoom (sustituye al vídeo) */}
      <motion.img
        src={storyBg}
        alt="La vida de un vino: del viñedo a la copa"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.15 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradientes para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Eyebrow superior */}
        <div className="container mx-auto px-4 pt-24 md:pt-28">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-accent font-medium tracking-[0.3em] uppercase text-xs md:text-sm"
          >
            La vida de un vino · En primera persona
          </motion.p>
        </div>

        {/* Caption central — sincronizada con el vídeo */}
        <div className="flex-1 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeIdx}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight text-white drop-shadow-2xl"
                >
                  {captions[activeIdx].text}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer con tagline y progreso */}
        <div className="container mx-auto px-4 pb-10 md:pb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif text-lg md:text-2xl text-white/85 italic max-w-2xl"
          >
            Y en cada paso,{" "}
            <span className="text-accent not-italic font-semibold">
              Datuva ha tomado nota.
            </span>
          </motion.p>

          {/* Barra de progreso */}
          <div className="mt-6 flex gap-2">
            {captions.map((_, i) => (
              <div
                key={i}
                className="h-[2px] flex-1 bg-white/15 overflow-hidden rounded-full"
              >
                <div
                  className={`h-full bg-accent transition-all duration-500 ${
                    i < activeIdx
                      ? "w-full"
                      : i === activeIdx
                      ? "w-1/2"
                      : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrapeStorySection;
