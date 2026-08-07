import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  features: { icon: React.ComponentType<{ className?: string }>; text: string }[];
  /** Aclaración legal opcional que se muestra en letra pequeña bajo las features. */
  nota?: string;
  /** Frase corta para la tarjeta del bento. Si falta, se usa la primera feature. */
  resumen?: string;
  /** Captura real de la app. Las tarjetas que la tienen ocupan el doble de ancho. */
  captura?: string;
  /** Icono de la tarjeta en el bento. */
  icono?: React.ComponentType<{ className?: string }>;
}

interface ScrollDrivenCardsProps {
  cards: SectionCard[];
  onCardClick: (card: SectionCard) => void;
  className?: string;
}

const ScrollCardItem = ({
  card,
  index,
  onCardClick,
}: {
  card: SectionCard;
  index: number;
  onCardClick: (card: SectionCard) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isEven = index % 2 === 0;

  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    isEven
      ? ["-50%", "-8%", "0%", "8%", "50%"]
      : ["50%", "8%", "0%", "-8%", "-50%"]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.88, 0.96, 1, 0.96, 0.88]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1, 1, 1, 0]
  );

  return (
    <div ref={ref} className="flex justify-center py-6 md:py-10">
      <motion.div
        style={{ x, scale, opacity }}
        onClick={() => onCardClick(card)}
        className={cn(
          "relative w-[90vw] md:w-[65vw] lg:w-[55vw] aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group",
          isEven ? "md:mr-auto md:ml-12" : "md:ml-auto md:mr-12"
        )}
      >
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          width={1280}
          height={864}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end p-6 md:p-10",
            isEven ? "items-start" : "items-end text-right"
          )}
        >
          <p className="text-accent text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-2">
            {card.subtitle}
          </p>
          <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {card.title}
          </h3>
          <span className="inline-block border-2 border-white text-white text-xs md:text-sm font-medium tracking-widest uppercase px-5 py-2.5 rounded-sm group-hover:bg-white group-hover:text-foreground transition-colors duration-300">
            Descubrir
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export const ScrollDrivenCards = ({
  cards,
  onCardClick,
  className,
}: ScrollDrivenCardsProps) => {
  return (
    <section className={cn("py-4 md:py-8", className)}>
      <div className="overflow-hidden">
        {cards.map((card, index) => (
          <ScrollCardItem
            key={card.id}
            card={card}
            index={index}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
};
