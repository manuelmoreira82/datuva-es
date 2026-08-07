import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { SectionCard } from "@/types/modulos";

interface SectionDetailModalProps {
  card: SectionCard | null;
  onClose: () => void;
}

const SectionDetailModal = ({ card, onClose }: SectionDetailModalProps) => {
  return (
    <AnimatePresence>
      {card && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[5vh] bottom-[5vh] md:inset-x-[10vw] lg:inset-x-[15vw] z-50 bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header with image */}
            <div className="relative h-48 md:h-64 flex-shrink-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-1">
                  {card.subtitle}
                </p>
                <h2 className="font-serif text-2xl md:text-4xl font-bold text-white">
                  {card.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Features list */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="grid gap-4">
                {card.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground/85 leading-relaxed text-sm md:text-base">
                      {f.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {card.nota && (
                <p className="mt-6 text-xs md:text-sm text-muted-foreground leading-relaxed border-l-2 border-accent/40 pl-4">
                  {card.nota}
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SectionDetailModal;
