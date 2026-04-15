import { Euro, BarChart3, Calculator } from "lucide-react";

const CostesSection = () => {
  const features = [
    { icon: Euro, text: "Coste de producción desde la uva hasta la botella: uva, tratamientos, materiales, mano de obra, mermas, roturas, costes fijos estructurales." },
    { icon: BarChart3, text: "Coste por litro en cada depósito y barrica en tiempo real." },
    { icon: Calculator, text: "Coste final por botella con desglose completo." },
  ];

  return (
    <section id="costes" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Control de costes
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            ¿Sabes cuánto te cuesta cada botella?
          </h2>

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

export default CostesSection;