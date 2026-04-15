import { ArrowRight, Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-24 pb-16 bg-primary"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--gold)/0.15),transparent_60%)]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-8 animate-fade-in-up">
            Del campo a la botella.{" "}
            <span className="text-accent">Todo bajo control.</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/75 mb-12 max-w-3xl mx-auto animate-fade-in-up-delay-1 leading-relaxed">
            Plataforma de gestión integral diseñada para bodegas españolas. 
            Viñedo, bodega, laboratorio, embotellado, normativa y costes — en una sola app.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
            <Button variant="contact" size="lg" asChild>
              <a
                href="mailto:manuelmoreira@datuva.es?subject=Solicitud%20de%20demostraci%C3%B3n%20Datuva"
                className="gap-3"
              >
                Solicitar demostración
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-primary-foreground/50 text-sm animate-fade-in-up-delay-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span>Móvil</span>
            </div>
            <div className="flex items-center gap-2">
              <Tablet className="w-4 h-4" />
              <span>Tablet</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span>Ordenador</span>
            </div>
            <span className="text-primary-foreground/30">|</span>
            <span>Instalable como app</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;