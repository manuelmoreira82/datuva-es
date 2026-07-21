const AnuncioSection = () => {
  return (
    <section id="anuncio" className="relative bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-accent font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4">
            De la cepa a la copa
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-4 text-foreground">
            Datuva registra cada paso de tu vino
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Del viñedo a la bodega, de la barrica a la copa. Cada trabajo, tratamiento
            y movimiento, registrado.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border bg-[#0b0e18]">
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <video
              className="absolute inset-0 w-full h-full"
              controls
              playsInline
              preload="metadata"
              poster="/poster-anuncio.jpg"
            >
              <source src="/datuva-anuncio-web.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnuncioSection;
