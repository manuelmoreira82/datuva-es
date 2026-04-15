import { FileOutput, Users, Truck } from "lucide-react";

const ExpedicionesSection = () => {
  const features = [
    { icon: FileOutput, text: "Albaranes de salida: ventas nacionales, intracomunitarias (EMCS), exportación, muestras, catas, autoconsumo." },
    { icon: Users, text: "Gestión de clientes con CAE, SEED EMCS, NIF intracomunitario." },
    { icon: Truck, text: "Transportistas con NIF para documentación fiscal." },
  ];

  return (
    <section id="expediciones" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Expediciones
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            Cada caja que sale, queda registrada
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

export default ExpedicionesSection;