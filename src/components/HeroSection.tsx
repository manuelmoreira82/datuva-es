import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bodega.jpg";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Bodega moderna con viñedos, barricas y depósitos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
            Tu Bodega, en el Bolsillo.{" "}
            <span className="text-gold">Del Campo a la Copa.</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-fade-in-up-delay-1">
            Gestiona viñedos, depósitos, trazabilidad y el SILICIE automático
            desde cualquier lugar. Olvida el Excel. Funciona en PC, Tablet y
            Móvil sin instalaciones complejas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-2">
            <Button variant="contact" size="lg">
              Empezar Prueba Piloto
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Ver Funcionalidades
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-8 text-primary-foreground/60 text-sm animate-fade-in-up-delay-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vineyard" />
              <span>Tecnología española</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vineyard" />
              <span>SILICIE automatizado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vineyard" />
              <span>Soporte directo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
