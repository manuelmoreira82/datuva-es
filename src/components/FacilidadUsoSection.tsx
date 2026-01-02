import appScreenshotMenu from "@/assets/app-screenshot-menu.jpg";

const FacilidadUsoSection = () => {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-vineyard/10 blur-3xl scale-90 opacity-40" />
              <img
                src={appScreenshotMenu}
                alt="Menú principal de Datuva con iconos intuitivos"
                className="relative w-full h-auto rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-border/50"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Facilidad de Uso
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Potente por dentro,{" "}
              <span className="text-primary">sencillo por fuera.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Olvida las implantaciones eternas. Datuva es tan intuitivo que 
              tus operarios lo usarán{" "}
              <strong className="text-foreground">desde el primer día</strong>
              {" "}sin cursos complejos. Diseñado para gente de campo, no para informáticos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilidadUsoSection;
