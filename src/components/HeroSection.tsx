import { ArrowRight } from "lucide-react";
import DensityCurve from "@/components/DensityCurve";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative bg-carbon text-cream overflow-hidden min-h-[100svh] flex flex-col"
    >
      {/* Textura sutil */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(var(--mostaza)) 0, transparent 45%), radial-gradient(circle at 80% 70%, hsl(var(--vino)) 0, transparent 50%)",
        }}
      />

      <div className="flex-1 flex items-center pt-32 md:pt-36 pb-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <p
              className="text-mostaza text-[11px] md:text-xs font-medium tracking-[0.32em] uppercase mb-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "120ms" }}
            >
              Bodega · Viñedo · Cumplimiento
            </p>

            {/* Titular: línea por línea, stagger 80ms */}
            <h1 className="font-display text-cream font-medium leading-[0.95] tracking-[-0.02em] text-balance">
              <span
                className="block text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] opacity-0 animate-fade-in-up"
                style={{ animationDelay: "260ms" }}
              >
                Tu bodega,
              </span>
              <span
                className="block text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] opacity-0 animate-fade-in-up italic text-mostaza"
                style={{ animationDelay: "340ms" }}
              >
                cuadrada al minuto.
              </span>
            </h1>

            {/* Subtítulo */}
            <p
              className="mt-8 max-w-2xl text-cream/75 text-base md:text-lg leading-relaxed opacity-0 animate-fade-in-up"
              style={{ animationDelay: "560ms" }}
            >
              Datuva registra cada movimiento del vino y genera tus libros{" "}
              <span className="text-cream">SILICIE</span>,{" "}
              <span className="text-cream">INFOVI</span> y el{" "}
              <span className="text-cream">cuaderno de campo</span> solos.
              Hecho en el Bierzo por gente de bodega.
            </p>

            {/* Curva de densidad */}
            <div
              className="mt-12 md:mt-14 opacity-0 animate-fade-in-up text-cream"
              style={{ animationDelay: "700ms" }}
            >
              <DensityCurve
                color="hsl(var(--mostaza))"
                strokeWidth={1.5}
                trigger="mount"
                height={90}
                showLabels
              />
            </div>

            {/* CTAs */}
            <div
              className="mt-10 flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "900ms" }}
            >
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-2 bg-mostaza text-carbon font-semibold text-base h-14 px-8 rounded-md hover:bg-mostaza/90 transition-all hover:shadow-[0_12px_32px_-12px_hsl(var(--mostaza)/0.6)]"
              >
                Reserva una demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#ciclo"
                className="inline-flex items-center justify-center gap-2 border border-cream/25 text-cream font-medium text-base h-14 px-8 rounded-md hover:bg-cream/5 hover:border-cream/45 transition-all"
              >
                Ver cómo funciona
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pie de hero */}
      <div className="relative z-10 border-t border-cream/10">
        <div className="container mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-3 text-cream/50 text-xs tracking-wide">
          <span>D.O. Bierzo · Villafranca</span>
          <span className="hidden sm:inline">Móvil · Tablet · Escritorio</span>
          <span>Instalable como app</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
