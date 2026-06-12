import { motion } from "framer-motion";

type Step = {
  emoji: string;
  text: string;
};

const steps: Step[] = [
  { emoji: "🍇", text: "Nazco en la viña, soy un racimo." },
  { emoji: "☀️", text: "Me da el sol." },
  { emoji: "🌧️", text: "Me llueve." },
  { emoji: "✂️", text: "Me podan." },
  { emoji: "💧", text: "Me tratan contra el mildiu." },
  { emoji: "🧺", text: "Me vendimian a mano." },
  { emoji: "📦", text: "Entro en una caja de 15 kilos." },
  { emoji: "🏚️", text: "Me llevan a la bodega." },
  { emoji: "🦶", text: "Me despalillan y me prensan." },
  { emoji: "🫧", text: "Fermento durante doce días." },
  { emoji: "🛢️", text: "Me descuban y descanso en barrica." },
  { emoji: "🍾", text: "Me embotellan, me etiquetan, me precintan." },
  { emoji: "🍷", text: "Y termino servido en una copa." },
];

const GrapeStorySection = () => {
  return (
    <section
      id="historia"
      className="relative py-24 md:py-36 bg-[hsl(var(--background))] overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
        >
          <p className="text-accent font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-5">
            La vida de un vino
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold leading-[1.05] text-foreground mb-6">
            Soy una uva.
            <span className="block text-accent italic">Esta es mi historia.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Desde el primer brote en la viña hasta la copa de quien me bebe,
            pasan cientos de decisiones. Datuva las anota todas.
          </p>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          {/* Línea vertical */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent"
          />

          <ol className="space-y-10 md:space-y-14">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex items-center gap-4 md:gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      isLeft ? "md:text-right" : "md:text-left"
                    } text-left`}
                  >
                    <p className="font-serif text-xl md:text-2xl text-foreground leading-snug">
                      {step.text}
                    </p>
                  </div>

                  <div className="relative z-10 shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-card border border-accent/40 shadow-sm flex items-center justify-center text-2xl md:text-3xl">
                    <span aria-hidden>{step.emoji}</span>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center mt-20 md:mt-28"
        >
          <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug mb-4">
            Y en cada paso,{" "}
            <span className="text-accent italic">Datuva ha tomado nota.</span>
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Cada tratamiento, cada kilo, cada trasiego, cada botella.
            Trazabilidad completa desde la parcela hasta la copa.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GrapeStorySection;
