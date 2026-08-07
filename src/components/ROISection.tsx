import { Clock, Ban, Scale, Brain } from "lucide-react";

const costes = [
  {
    icon: Clock,
    value: "16+ horas/mes",
    label: "Tiempo perdido en tareas administrativas manuales",
  },
  {
    icon: Ban,
    value: "€2.000–€10.000",
    label: "Coste potencial de un error en SILICIE o trazabilidad",
  },
  {
    icon: Scale,
    value: "Hasta €30.000",
    label: "Sanción por incumplimiento normativo en inspección",
  },
  {
    icon: Brain,
    value: "Incalculable",
    label: "Decisiones tomadas sin datos fiables ni históricos",
  },
];

const ROISection = () => {
  return (
    <section className="py-24 md:py-32 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider mb-4">
            Retorno de inversión
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Lo que cuesta{" "}
            <span className="text-gold">no digitalizar tu bodega.</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            Datuva cuesta menos que una jornada administrativa mal empleada.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-16">
          {costes.map((c, i) => (
            <div
              key={i}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <c.icon className="w-6 h-6 text-gold" />
              </div>
              <div className="text-2xl font-bold text-gold mb-2">{c.value}</div>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">
                {c.label}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Con Datuva, desde{" "}
            <span className="text-gold font-bold">150 €/mes</span>{" "}
            eliminas el riesgo, recuperas horas y tomas decisiones con datos reales. 
            No es un gasto, es la inversión más rentable de tu bodega.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ROISection;
