import { useEffect, useRef, useState } from "react";
import DensityCurve from "@/components/DensityCurve";

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  start: boolean;
}

const Counter = ({ to, suffix = "", duration = 1400, start }: CounterProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
};

const stats = [
  { value: 0, suffix: "", label: "horas preparando inspecciones" },
  { value: 100, suffix: "%", label: "de movimientos con su asiento contable" },
  { value: 1, suffix: "", label: "sola fuente de verdad para todo el equipo" },
];

const ProblemaSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="problema" className="bg-cream py-24 md:py-36 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <p className="text-foreground/50 text-xs tracking-[0.3em] uppercase mb-6">
            El problema
          </p>
          <h2 className="font-display text-foreground font-medium leading-[1.02] tracking-[-0.02em] text-balance text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl">
            El Consejo no avisa <span className="italic text-vino">cuando viene</span>.
          </h2>
          <div className="mt-10 max-w-2xl space-y-5 text-foreground/75 text-base md:text-lg leading-relaxed">
            <p>
              Llega la inspección. Sales corriendo a buscar los libros. Cruzas
              fechas en el Excel, recompones movimientos de memoria, llamas al
              encargado para confirmar un trasiego de marzo.
            </p>
            <p className="text-foreground/55">
              Se va la mañana. Se va el día. Y la próxima semana, otra vez.
            </p>
          </div>
        </div>

        {/* Curva entre el problema y las cifras */}
        <div className="mt-16 text-vino opacity-70">
          <DensityCurve color="hsl(var(--vino))" strokeWidth={1.25} height={70} />
        </div>

        <div
          ref={ref}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-12 border-t border-foreground/10 pt-14"
        >
          {stats.map((s, i) => (
            <div key={i} className="md:border-r md:last:border-r-0 border-foreground/10 md:pr-12">
              <div className="font-display text-tinta text-6xl md:text-7xl font-medium leading-none tracking-tight">
                <Counter to={s.value} suffix={s.suffix} start={inView} />
              </div>
              <p className="mt-4 text-foreground/70 text-sm md:text-base max-w-[20ch]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemaSection;
