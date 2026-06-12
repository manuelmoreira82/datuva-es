import { useEffect, useRef, useState } from "react";
import DensityCurve from "@/components/DensityCurve";

interface Phase {
  n: string;
  title: string;
  lines: string[];
}

const phases: Phase[] = [
  {
    n: "01",
    title: "Vendimia",
    lines: [
      "Cada kilo de uva entra al sistema con su viticultor, parcela y depósito.",
      "Trazabilidad desde el primer remolque del día.",
    ],
  },
  {
    n: "02",
    title: "Bodega",
    lines: [
      "Trasiegos, descubes, mezclas y prensados desde el móvil.",
      "Escanea el QR del depósito y sabes todo: contenido, lote, origen.",
    ],
  },
  {
    n: "03",
    title: "Laboratorio",
    lines: [
      "Lecturas de fermentación 2-3 veces al día con curva en vivo.",
      "Alertas cuando un parámetro se sale de rango.",
    ],
  },
  {
    n: "04",
    title: "Embotellado",
    lines: [
      "Embotellas: el stock de corchos, botellas y cápsulas se actualiza solo.",
      "Lote final con trazabilidad hasta la parcela.",
    ],
  },
  {
    n: "05",
    title: "Expedición",
    lines: [
      "Albaranes nacionales, EMCS intracomunitario, exportación, muestras.",
      "Cada caja que sale queda registrada.",
    ],
  },
];

const CicloSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // Scroll-driven sticky panels (desktop)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      const idx = Math.min(phases.length - 1, Math.floor(p * phases.length));
      setActive(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="ciclo" className="bg-cream-soft relative">
      {/* HEADER */}
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-12 md:pb-16">
        <p className="text-foreground/50 text-xs tracking-[0.3em] uppercase mb-6">
          El ciclo
        </p>
        <h2 className="font-display text-foreground font-medium leading-[1.02] tracking-[-0.02em] text-balance text-[2.2rem] sm:text-5xl md:text-6xl max-w-4xl">
          De la <span className="italic text-vino">cepa</span> a la caja, sin perder un dato.
        </h2>
      </div>

      {/* === DESKTOP: sticky scroll === */}
      <div
        ref={containerRef}
        className="hidden md:block relative"
        style={{ height: `${phases.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="container mx-auto px-4 w-full">
            <div className="grid grid-cols-12 gap-10 items-center">
              {/* Texto */}
              <div className="col-span-5">
                {phases.map((p, i) => (
                  <div
                    key={p.n}
                    className="absolute max-w-md transition-all duration-700 ease-out"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform: `translateY(${i === active ? 0 : 24}px)`,
                      pointerEvents: i === active ? "auto" : "none",
                    }}
                  >
                    <div className="flex items-baseline gap-4 mb-6">
                      <span className="font-display text-vino text-2xl">{p.n}</span>
                      <span className="h-px w-12 bg-foreground/25" />
                      <span className="text-foreground/50 text-xs tracking-[0.28em] uppercase">
                        Fase {i + 1} de {phases.length}
                      </span>
                    </div>
                    <h3 className="font-display text-foreground font-medium text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em] mb-6">
                      {p.title}.
                    </h3>
                    {p.lines.map((l, j) => (
                      <p
                        key={j}
                        className={`text-base md:text-lg leading-relaxed ${
                          j === 0 ? "text-foreground/85" : "text-foreground/60 mt-2"
                        }`}
                      >
                        {l}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Mockup app (placeholder) */}
              <div className="col-span-7 relative">
                <div className="relative aspect-[4/3] w-full">
                  {phases.map((p, i) => (
                    <div
                      key={p.n}
                      className="absolute inset-0 transition-all duration-700 ease-out"
                      style={{
                        opacity: i === active ? 1 : 0,
                        transform: `perspective(1400px) rotateY(${i === active ? 0 : 6}deg) translateX(${i === active ? 0 : 40}px)`,
                        pointerEvents: i === active ? "auto" : "none",
                      }}
                    >
                      <AppMockup phase={p} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Curva inferior con progreso */}
            <div className="mt-12">
              <div className="relative h-px bg-foreground/10">
                <div
                  className="absolute inset-y-0 left-0 bg-vino transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] tracking-[0.3em] uppercase text-foreground/40">
                <span>Vendimia · 1.100</span>
                <span>Expedición · 0.995</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === MOBILE: stack vertical con reveal === */}
      <div className="md:hidden container mx-auto px-4 pb-20 space-y-16">
        {phases.map((p, i) => (
          <MobilePhase key={p.n} phase={p} index={i} total={phases.length} />
        ))}
      </div>
    </section>
  );
};

/* ----- Mockup estilizado de la app (placeholder sobrio) ----- */
const AppMockup = ({ phase }: { phase: Phase }) => {
  return (
    <div className="absolute inset-0 rounded-xl bg-carbon overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] border border-foreground/10">
      {/* Barra app */}
      <div className="h-10 bg-carbon border-b border-cream/10 flex items-center px-4 gap-2">
        <span className="w-2 h-2 rounded-full bg-cream/20" />
        <span className="w-2 h-2 rounded-full bg-cream/20" />
        <span className="w-2 h-2 rounded-full bg-cream/20" />
        <span className="ml-3 text-cream/40 text-[10px] tracking-widest uppercase">
          Datuva · {phase.title}
        </span>
      </div>
      <div className="p-6 grid grid-cols-12 gap-3 h-[calc(100%-2.5rem)]">
        <div className="col-span-3 bg-cream/5 rounded-md p-3 flex flex-col gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 rounded ${i === 1 ? "bg-mostaza/70" : "bg-cream/15"}`}
              style={{ width: `${60 + ((i * 13) % 35)}%` }}
            />
          ))}
        </div>
        <div className="col-span-9 grid grid-rows-6 gap-3">
          <div className="row-span-2 bg-cream/5 rounded-md p-3">
            <div className="text-mostaza text-[10px] tracking-widest uppercase mb-2">{phase.n} · {phase.title}</div>
            <div className="h-2 w-3/4 bg-cream/20 rounded mb-2" />
            <div className="h-2 w-1/2 bg-cream/10 rounded" />
          </div>
          <div className="row-span-4 grid grid-cols-2 gap-3">
            <div className="bg-cream/5 rounded-md p-3 flex flex-col gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-mostaza/80" />
                  <div className="h-1.5 flex-1 bg-cream/12 rounded" />
                </div>
              ))}
            </div>
            <div className="bg-cream/5 rounded-md p-3 relative overflow-hidden">
              <svg viewBox="0 0 200 100" className="w-full h-full text-vino">
                <path
                  d="M 0,20 C 30,20 50,30 80,55 C 110,75 140,82 200,82"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line x1="0" y1="82" x2="200" y2="82" stroke="hsl(var(--cream))" strokeOpacity="0.15" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----- Versión móvil simple ----- */
const MobilePhase = ({ phase, index, total }: { phase: Phase; index: number; total: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""}`}
    >
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-display text-vino text-xl">{phase.n}</span>
        <span className="text-foreground/45 text-[10px] tracking-[0.28em] uppercase">
          Fase {index + 1} / {total}
        </span>
      </div>
      <h3 className="font-display text-foreground font-medium text-4xl leading-[0.95] tracking-[-0.02em] mb-4">
        {phase.title}.
      </h3>
      {phase.lines.map((l, j) => (
        <p
          key={j}
          className={`text-base leading-relaxed ${j === 0 ? "text-foreground/85" : "text-foreground/55 mt-2"}`}
        >
          {l}
        </p>
      ))}
      <div className="mt-6 aspect-[4/3]">
        <AppMockup phase={phase} />
      </div>
    </div>
  );
};

export default CicloSection;
