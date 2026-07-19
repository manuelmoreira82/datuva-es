import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Caption = {
  start: number;
  end: number;
  text: string;
  glow: string;
};

// Fondo cinematográfico por fase (colores de marca, sin fotos ni vídeo)
const captions: Caption[] = [
  { start: 0, end: 3, text: "Nazco en la viña.", glow: "radial-gradient(130% 130% at 28% 22%, rgba(46,92,74,0.55), transparent 62%)" },
  { start: 3, end: 6, text: "Me da el sol, me llueve, me podan.", glow: "radial-gradient(130% 130% at 70% 24%, rgba(190,150,70,0.50), transparent 62%)" },
  { start: 6, end: 9, text: "Me vendimian a mano.", glow: "radial-gradient(130% 130% at 40% 28%, rgba(168,86,44,0.50), transparent 62%)" },
  { start: 9, end: 12, text: "Entro en una caja de quince kilos.", glow: "radial-gradient(130% 130% at 62% 26%, rgba(96,52,64,0.52), transparent 62%)" },
  { start: 12, end: 15, text: "Fermento. Descanso en barrica.", glow: "radial-gradient(130% 130% at 34% 30%, rgba(118,38,58,0.55), transparent 62%)" },
  { start: 15, end: 18, text: "Y termino servido en una copa.", glow: "radial-gradient(130% 130% at 66% 26%, rgba(124,45,62,0.62), transparent 62%)" },
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
      {/* Fondo cinematográfico de marca que evoluciona con cada frase (sin fotos, sin vídeo) */}
      <div className="absolute inset-0 bg-[#0b0e18]" />
      <AnimatePresence>
        <motion.div
          key={activeIdx}
          className="absolute inset-0"
          style={{ background: captions[activeIdx].glow }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Viñeta para legibilidad y profundidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

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
