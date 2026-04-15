import { QrCode, Container, ArrowRightLeft, Wine, ScanLine } from "lucide-react";

const BodegaSection = () => {
  const features = [
    { icon: Container, text: "Control de depósitos de acero inoxidable, hormigón y fibra de vidrio: capacidad, contenido actual, estado, QR identificativo." },
    { icon: Wine, text: "Gestión de barricas: tipo de madera, capacidad, contenido, fecha de llenado, QR." },
    { icon: ArrowRightLeft, text: "Movimientos de bodega: trasiegos, descubes, mezclas, filtraciones, sangrados, prensados, con trazabilidad completa de litros, origen y destino." },
    { icon: ScanLine, text: "Identificación instantánea de cualquier recipiente escaneando su código QR." },
    { icon: QrCode, text: "Catálogo de vinos con configuración de color, calidad DOP/IGP y código NC automático para SILICIE." },
  ];

  return (
    <section id="bodega" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Bodega
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Escanea el QR. Sabes todo.
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            Cada depósito y barrica tiene su identidad digital. Un escaneo y tienes toda la información.
          </p>

          <div className="grid gap-5">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-lg bg-card border border-border/50 hover:border-accent/30 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground/85 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BodegaSection;