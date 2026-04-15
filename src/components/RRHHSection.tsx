import { Clock, ClipboardList, ListTodo, CalendarDays, IdCard } from "lucide-react";

const RRHHSection = () => {
  const features = [
    { icon: Clock, text: "Control horario conforme al RD-ley 8/2019." },
    { icon: ClipboardList, text: "Partes de trabajo de bodega y campo." },
    { icon: ListTodo, text: "Órdenes de trabajo asignadas a empleados con prioridad y seguimiento." },
    { icon: CalendarDays, text: "Registro de vacaciones." },
    { icon: IdCard, text: "Carnet de aplicador de fitosanitarios: número, nivel, caducidad y número ROPO." },
  ];

  return (
    <section id="rrhh" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Recursos humanos
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            Tu equipo, organizado
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

export default RRHHSection;