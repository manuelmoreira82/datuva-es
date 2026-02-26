import heroImage from "@/assets/hero-bodega.jpg";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Interior real de bodega con depósitos de acero inoxidable"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/97 via-foreground/90 to-foreground/60" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-vineyard animate-pulse" />
            <span className="text-primary-foreground/80 text-sm font-medium">
              Ya operativo en bodegas reales
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-6 animate-fade-in-up">
            Deja de gestionar tu bodega{" "}
            <span className="text-gold">con Excel y papeles.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl animate-fade-in-up-delay-1 leading-relaxed">
            Datuva es el software que centraliza producción, trazabilidad, SILICIE, 
            libros oficiales e INFOVI en una sola plataforma. Diseñado por alguien que 
            conoce la operativa real de una bodega española.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-2">
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://wa.me/34627130891?text=Hola%2C%20quiero%20agendar%20una%20demo%20personalizada%20de%20Datuva"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-3"
              >
                Agendar demo personalizada
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#solucion" className="gap-3">
                <Play className="w-4 h-4" />
                Ver cómo funciona
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-in-up-delay-3">
            {[
              { value: "100%", label: "Offline" },
              { value: "SILICIE", label: "Automatizado" },
              { value: "INFOVI", label: "Integrado" },
              { value: "JCyL", label: "Libros oficiales" },
            ].map((item) => (
              <div key={item.label} className="text-center sm:text-left">
                <div className="text-gold font-bold text-lg">{item.value}</div>
                <div className="text-primary-foreground/50 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
