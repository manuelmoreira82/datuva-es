import { Grape, Route, User } from "lucide-react";

const VendimiaSection = () => {
  const features = [
    { icon: Grape, text: "Registro de entradas de uva por viticultor: kg, grado, pH, temperatura, parcela de origen y depósito de destino." },
    { icon: Route, text: "Trazabilidad completa: parcela → depósito → lote → botella." },
    { icon: User, text: "Viticultores con ficha de contacto, tarjeta del Consejo Regulador y precio por kilo." },
  ];

  return (
    <section id="vendimia" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Vendimia
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            Cada kilo de uva, registrado
          </h2>

          <div className="grid gap-5">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-lg bg-background border border-border/50 hover:border-accent/30 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-accent" />
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

export default VendimiaSection;