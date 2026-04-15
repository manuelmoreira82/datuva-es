import { FlaskConical, TrendingUp, Bell, History } from "lucide-react";

const LaboratorioSection = () => {
  const features = [
    { icon: FlaskConical, text: "Analíticas completas: pH, grado alcohólico, acidez total, acidez volátil, SO₂ libre y total, azúcar residual, densidad, glicerina." },
    { icon: TrendingUp, text: "Lecturas rápidas de fermentación (2-3 veces/día) con gráficos de evolución." },
    { icon: Bell, text: "Alertas automáticas cuando los parámetros se salen de los márgenes configurados." },
    { icon: History, text: "Histórico completo por depósito, vino y añada." },
  ];

  return (
    <section id="laboratorio" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Laboratorio
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            Fermentación bajo control
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
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

export default LaboratorioSection;