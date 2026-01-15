import heroImage from "@/assets/hero-bodega.jpg";

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
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
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
            Haz vino,{" "}
            <span className="text-gold">no papeleo.</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-2xl animate-fade-in-up-delay-1 leading-relaxed">
            La gestión integral para bodegas que funciona incluso sin internet. 
            Controla la trazabilidad, el campo, los fichajes de personal y prepara 
            tus datos para SILICIE desde el móvil.{" "}
            <span className="text-gold font-medium">Probado en el Bierzo, no en Silicon Valley.</span>
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 animate-fade-in-up-delay-2"
          >
            Solicitar Demo en mi Bodega
          </button>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-8 text-primary-foreground/60 text-sm animate-fade-in-up-delay-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vineyard" />
              <span>Funciona sin internet</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vineyard" />
              <span>SILICIE listo en un clic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-vineyard" />
              <span>Implantación in situ</span>
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
