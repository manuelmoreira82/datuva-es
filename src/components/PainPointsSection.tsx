import { AlertTriangle, Monitor, Package, FileX } from "lucide-react";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "El miedo al SILICIE",
    description:
      "Horas perdidas rellenando libros oficiales y miedo a multas. Datuva lo hace automático.",
  },
  {
    icon: Monitor,
    title: "La cárcel del PC fijo",
    description:
      "¿Tienes que ir a la oficina para ver un dato? Con Datuva controlas la bodega desde el viñedo o el sofá.",
  },
  {
    icon: Package,
    title: "Stock a ciegas",
    description:
      "No te quedes sin corchos ni botellas en mitad de una campaña por un error de Excel.",
  },
  {
    icon: FileX,
    title: "Papeles que desaparecen",
    description:
      "Se mojan, se ensucian, no se leen... Con Datuva, todos los movimientos en la palma de tu mano.",
  },
];

const PainPointsSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            ¿Te suena esta historia?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in-up-delay-1">
            Los problemas del día a día en una bodega que Datuva resuelve de
            forma sencilla
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div
              key={point.title}
              className={`bg-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in-up-delay-${
                index + 1
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <point.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {point.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
