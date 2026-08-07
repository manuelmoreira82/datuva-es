import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { SectionCard } from "./ScrollDrivenCards";

interface Props {
  cards: SectionCard[];
  onCardClick: (card: SectionCard) => void;
}

const romanize = (n: number) => {
  const r = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  return r[n - 1] ?? String(n);
};

const ScrollNarrative = ({ cards, onCardClick }: Props) => {
  return (
    <div className="relative bg-[#0B0A14] text-[#F5F0E8]">
      {/* Grain global */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-overlay z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="narrativeGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#narrativeGrain)" />
        </svg>
      </div>

      {cards.map((card, idx) => {
        const num = idx + 1;
        const padded = String(num).padStart(2, "0");
        const previewFeatures = card.features.slice(0, 3);

        return (
          <section
            key={card.id}
            id={card.id}
            className="relative min-h-[100svh] flex items-center overflow-hidden"
          >
            {/* Background image very dim */}
            <div className="absolute inset-0">
              <img
                src={card.image}
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A14]/85 via-[#0B0A14]/70 to-[#0B0A14]" />
            </div>

            {/* Tinted glow alternating */}
            <div
              className={`pointer-events-none absolute w-[700px] h-[500px] rounded-full blur-[180px] opacity-30 ${
                idx % 2 === 0
                  ? "top-1/4 -left-32 bg-[#1B2A4A]"
                  : "bottom-1/4 -right-32 bg-[#7C2D3E]"
              }`}
            />

            <div className="relative z-10 container mx-auto px-6 md:px-10 py-24 md:py-32">
              <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                {/* Counter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="mb-10 md:mb-14 flex items-center gap-3 text-[#C9A227] tracking-[0.4em] text-[10px] font-medium"
                >
                  <span>{padded}</span>
                  <span className="opacity-40">/</span>
                  <span className="opacity-70 uppercase">
                    {card.subtitle}
                  </span>
                  <span className="opacity-40">·</span>
                  <span className="opacity-50">{romanize(num)}</span>
                </motion.div>

                {/* Big headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif font-normal leading-[1.02] tracking-[-0.02em] text-3xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
                >
                  {card.title}
                </motion.h2>

                {/* Gold divider */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="mt-10 md:mt-14 flex items-center gap-2 origin-center"
                >
                  <span className="block h-px w-20 md:w-32 bg-[#C9A227]" />
                  <span className="block h-px w-6 bg-[#C9A227]/40" />
                </motion.div>

                {/* Preview features */}
                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, delay: 0.4 }}
                  className="mt-10 md:mt-14 flex flex-col gap-4 max-w-2xl text-left"
                >
                  {previewFeatures.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 text-[#F5F0E8]/70 leading-relaxed text-sm md:text-base"
                    >
                      <f.icon className="w-4 h-4 text-[#C9A227] mt-1 shrink-0" />
                      <span>{f.text}</span>
                    </li>
                  ))}
                </motion.ul>

                {/* Aclaración legal */}
                {card.nota && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, delay: 0.5 }}
                    className="mt-8 max-w-2xl text-left text-xs md:text-sm text-[#F5F0E8]/45 leading-relaxed border-l border-[#C9A227]/40 pl-4"
                  >
                    {card.nota}
                  </motion.p>
                )}

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                  onClick={() => onCardClick(card)}
                  className="group mt-10 md:mt-14 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#F5F0E8]/20 text-[#F5F0E8]/80 hover:text-[#F5F0E8] hover:border-[#C9A227]/60 text-xs tracking-[0.25em] uppercase font-medium transition-colors"
                >
                  Ver capítulo completo
                  <ArrowRight className="w-4 h-4 text-[#C9A227] transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </div>

            {/* Chapter index right side (desktop) */}
            <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-20">
              {cards.map((_, i) => (
                <a
                  key={i}
                  href={`#${cards[i].id}`}
                  className={`block transition-all ${
                    i === idx
                      ? "w-8 h-px bg-[#C9A227]"
                      : "w-4 h-px bg-[#F5F0E8]/20 hover:bg-[#F5F0E8]/50"
                  }`}
                  aria-label={`Capítulo ${i + 1}`}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ScrollNarrative;
