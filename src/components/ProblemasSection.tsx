import { Clock, AlertTriangle, ShieldAlert, PackageX, Copy } from "lucide-react";

const problemas = [
  {
    icon: Clock,
    title: "Horas administrativas que no producen vino",
    description:
      "Rellenar libros a mano, cuadrar litros en Excel, buscar albaranes... Tiempo que debería estar en la bodega, no en la oficina.",
  },
  {
    icon: AlertTriangle,
    title: "Errores en movimientos que cuestan dinero",
    description:
      "Un trasvase mal apuntado, un depósito confundido, una mezcla no deseada. Un error de lápiz puede arruinar un lote entero.",
  },
  {
    icon: ShieldAlert,
    title: "Inspecciones que quitan el sueño",
    description:
      "Hacienda pide el SILICIE. Agricultura pide trazabilidad. La JCyL pide libros oficiales. ¿Tienes todo listo si llaman mañana?",
  },
  {
    icon: PackageX,
    title: "Stock que no cuadra nunca",
    description:
      "¿Cuántos litros hay realmente en el depósito 7? ¿Quedan suficientes botellas para el pedido del viernes? Nadie lo sabe con certeza.",
  },
  {
    icon: Copy,
    title: "Datos duplicados en tres sitios distintos",
    description:
      "Un Excel para producción, otro para campo, un cuaderno para el SILICIE y una libreta para la vendimia. Información dispersa = decisiones a ciegas.",
  },
];

const ProblemasSection = () => {
  return (
    <section className="py-24 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            El problema real
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tu bodega crece.{" "}
            <span className="text-primary">Tu gestión, no.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Estos problemas los conocemos de primera mano. Los hemos vivido, y por eso construimos Datuva.
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problemas.map((p, i) => (
            <div
              key={i}
              className="bg-background rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {p.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemasSection;
