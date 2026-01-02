import appScreenshotLogin from "@/assets/app-screenshot-login.jpg";

const VisionGlobalSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            El control total de tu bodega{" "}
            <span className="text-primary">en una sola pantalla.</span>
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="relative max-w-md md:max-w-lg lg:max-w-xl">
            {/* Decorative glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-vineyard/20 blur-3xl scale-90 opacity-50" />
            
            <img
              src={appScreenshotLogin}
              alt="Dashboard principal de Datuva - Control total de tu bodega"
              className="relative w-full h-auto rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-border/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionGlobalSection;
