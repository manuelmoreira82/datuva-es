import { MapPin, BookOpen, Leaf, Sun, Bug, Tractor, CloudRain, FlaskConical, Clock, Euro } from "lucide-react";

const CampoSection = () => {
  const features = [
    { icon: MapPin, text: "Ficha completa de parcelas: variedad, superficie, SIGPAC, polígono, parcela catastral, referencia catastral, año de plantación, sistema de conducción y marco de plantación." },
    { icon: MapPin, text: "Mapa de parcelas con geolocalización." },
    { icon: BookOpen, text: "Cuaderno de campo digital (CUE) conforme al RD 1311/2012: tratamientos fitosanitarios con registro completo del aplicador, nº de carnet, equipo ROMA, inspección ITEAF y plazo de seguridad." },
    { icon: Leaf, text: "Registro de fertilizaciones: producto, dosis, parcela y coste." },
    { icon: Sun, text: "Registro fenológico con escala Eichhorn-Lorenz/Baggiolini y fotografía por parcela." },
    { icon: Bug, text: "Incidencias de campo geolocalizadas con foto y flujo de resolución." },
    { icon: FlaskConical, text: "Inventario de productos fitosanitarios y fertilizantes con control de stock mínimo, lote, caducidad y registro sanitario." },
    { icon: Tractor, text: "Maquinaria de aplicación con número ROMA, inspecciones ITEAF y fechas de renovación." },
    { icon: CloudRain, text: "Datos meteorológicos automáticos vinculados a cada tratamiento y parte de trabajo (temperatura, humedad, viento, precipitación, punto de rocío, presión atmosférica)." },
    { icon: Leaf, text: "Gestión ecológica completa: certificación, organismo certificador, fechas de conversión, auditorías, bloqueo automático de mezcla eco/convencional (Reg. UE 2018/848)." },
    { icon: FlaskConical, text: "Analíticas de maduración por parcela: grado probable, pH y acidez." },
    { icon: Clock, text: "Partes de trabajo de campo con registro de horas, trabajadores, materiales y coste de mano de obra." },
    { icon: Euro, text: "Costes de producción por parcela y campaña: tratamientos, fertilizaciones, mano de obra, maquinaria, kg cosechados y coste por kilo de uva." },
  ];

  return (
    <section id="campo" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Campo y viñedo
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            Tu viñedo, documentado
          </h2>

          <div className="grid gap-5">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/50 hover:border-accent/30 transition-colors">
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

export default CampoSection;