import { WifiOff, Cloud, CheckCircle } from "lucide-react";

const OfflineModeSection = () => {
  return (
    <section className="py-16 md:py-20 bg-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            currentColor 10px,
            currentColor 11px
          )`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <WifiOff className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-vineyard flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
              ¿Tu bodega es un búnker de hormigón?{" "}
              <span className="text-gold">No hay problema.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Datuva está diseñada para la realidad. Trabaja en el sótano, en la nave 
              o en la viña sin cobertura. Escanea depósitos, registra movimientos y 
              apunta datos.{" "}
              <span className="text-primary-foreground font-medium">
                En cuanto tu móvil recupere la señal, todo se sincroniza automáticamente en la nube.
              </span>
            </p>

            {/* Visual indicator */}
            <div className="flex items-center justify-center gap-4 text-primary-foreground/60">
              <div className="flex items-center gap-2 bg-primary-foreground/5 px-4 py-2 rounded-full">
                <WifiOff className="w-4 h-4" />
                <span className="text-sm">Sin cobertura</span>
              </div>
              <div className="text-2xl">→</div>
              <div className="flex items-center gap-2 bg-vineyard/20 px-4 py-2 rounded-full text-vineyard">
                <Cloud className="w-4 h-4" />
                <span className="text-sm">Sincronizado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfflineModeSection;
