const PhilosophySection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-vineyard/10 text-vineyard rounded-full text-sm font-medium mb-6 animate-fade-in-up">
            Nuestra Filosofía
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed mb-8 animate-fade-in-up-delay-1">
            "Tecnología desarrollada en el{" "}
            <span className="text-primary font-bold">Bierzo, España</span>. No
            somos consultores de ciudad, somos{" "}
            <span className="text-primary font-bold">gente de bodega</span>.
            Entendemos tu idioma."
          </blockquote>
          <div className="flex items-center justify-center gap-8 text-muted-foreground animate-fade-in-up-delay-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-vineyard" />
              <span>Hecho en España</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span>Por bodegueros</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gold" />
              <span>Para bodegueros</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
