import appScreenshotMap from "@/assets/app-screenshot-map.jpg";
import appScreenshotAnalytics from "@/assets/app-screenshot-analytics.jpg";

const FuncionalidadesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-sm font-semibold text-vineyard uppercase tracking-wider mb-4">
            Funcionalidades Clave
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Todo lo que necesitas,{" "}
            <span className="text-primary">nada que sobre.</span>
          </h2>
        </div>

        {/* Block A: Text Left / Image Right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24 lg:mb-32">
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Campo Inteligente y{" "}
              <span className="text-vineyard">Mapas 3D.</span>
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Geolocalización real de parcelas. El clima y los tratamientos se 
              registran solos al tocar la viña. Cumple con el{" "}
              <strong className="text-foreground">Cuaderno de Campo Digital</strong> 
              {" "}sin esfuerzo.
            </p>
          </div>
          
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-vineyard/20 to-primary/10 blur-3xl scale-90 opacity-40" />
              <img
                src={appScreenshotMap}
                alt="Mapa 3D satelital con parcelas de viñedos geolocalizadas"
                className="relative w-full h-auto rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-border/50"
              />
            </div>
          </div>
        </div>

        {/* Block B: Image Left / Text Right */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Control Total de{" "}
              <span className="text-primary">Bodega.</span>
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Trazabilidad absoluta. Analíticas de laboratorio y litros reales 
              vinculados a cada depósito{" "}
              <strong className="text-foreground">en tiempo real</strong>. 
              {" "}Sin hojas de Excel, sin errores.
            </p>
          </div>
          
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-gold/10 blur-3xl scale-90 opacity-40" />
              <img
                src={appScreenshotAnalytics}
                alt="Listado de depósitos con analíticas y datos en tiempo real"
                className="relative w-full h-auto rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-border/50"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuncionalidadesSection;
