import { FileText, QrCode, Grape, Clock } from "lucide-react";

const FuncionalidadesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Tu Libro SILICIE, listo en un clic.",
      description: "Tú mueve el vino, nosotros organizamos los datos. El sistema genera automáticamente el Libro de Movimientos con el formato exacto que pide Hacienda, listo para que tú o tu asesor lo presentéis sin perder tiempo cuadrando litros.",
      accent: "primary"
    },
    {
      icon: QrCode,
      title: "Implantación física con QRs industriales.",
      description: "No es solo software. Vamos a tu bodega, identificamos tus depósitos y barricas con pegatinas QR resistentes y formamos a tu equipo in situ.",
      accent: "vineyard"
    },
    {
      icon: Grape,
      title: "De la báscula a la botella.",
      description: "Registra entradas de uva con foto al ticket de pesaje, gestiona el cuaderno de campo y controla qué uva de qué viticultor ha ido a cada depósito. Trazabilidad total sin complicaciones.",
      accent: "gold"
    },
    {
      icon: Clock,
      title: "Control horario y fichajes.",
      description: "Cumple la ley sin complicaciones. Tus operarios fichan desde el móvil o desde una tablet en la entrada de la nave.",
      accent: "primary"
    }
  ];

  return (
    <section id="funcionalidades" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-vineyard uppercase tracking-wider mb-4">
            Funcionalidades
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Herramientas reales para{" "}
            <span className="text-primary">problemas reales.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Diseñado por y para bodegas. Sin funciones de relleno, solo lo que necesitas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-lg hover:border-border transition-all duration-300 group"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                feature.accent === "primary" ? "bg-primary/10 text-primary" :
                feature.accent === "vineyard" ? "bg-vineyard/10 text-vineyard" :
                "bg-gold/10 text-gold"
              }`}>
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            ¿Quieres ver cómo funciona en tu bodega?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Solicitar una demo personalizada →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FuncionalidadesSection;
