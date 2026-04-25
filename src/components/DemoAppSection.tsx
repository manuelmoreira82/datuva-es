const DemoAppSection = () => {
  return (
    <section id="demo-app" className="relative bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-accent font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            Demo interactiva · 2 minutos
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-4 text-foreground">
            Esto es lo que vas a usar cada día
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Bodega, campo, embotellado y cumplimiento normativo. Sin Excel y sin papeles.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border bg-[#0e0b06]">
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              src="/demo/index.html"
              title="Demo interactiva de Datuva"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              allow="autoplay"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoAppSection;
