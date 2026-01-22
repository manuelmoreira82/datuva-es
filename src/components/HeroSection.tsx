import heroImage from "@/assets/hero-bodega.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Bodega real con depósitos y barricas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/50" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
            Gestiona tu bodega sin Excel ni caos
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-2xl animate-fade-in-up-delay-1 leading-relaxed">
            Control total del viñedo, la bodega y la trazabilidad en un solo sistema.
          </p>

          {/* CTA Button */}
          <Button
            onClick={scrollToContact}
            variant="hero"
            size="lg"
            className="animate-fade-in-up-delay-2"
          >
            Ver una demo / Solicitar llamada
          </Button>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
