import {
  Beaker,
  Grape,
  FileText,
  BookOpen,
  BarChart3,
  ScanLine,
  Package,
  Map,
} from "lucide-react";

const modulos = [
  {
    icon: ScanLine,
    title: "Producción y movimientos",
    benefit: "Escanea el QR del depósito origen y destino. El sistema valida, registra y traza cada litro. Cero errores de lápiz.",
    accent: "primary",
  },
  {
    icon: Map,
    title: "Cuaderno de campo digital",
    benefit: "Parcelas en 3D, tratamientos fitosanitarios, muestras de maduración. Todo geolocalizado y listo para Agricultura.",
    accent: "vineyard",
  },
  {
    icon: FileText,
    title: "SILICIE automatizado",
    benefit: "Tú mueves el vino, Datuva genera el Libro de Movimientos con el formato exacto de Hacienda. Descarga y presenta.",
    accent: "primary",
  },
  {
    icon: BookOpen,
    title: "Libros oficiales JCyL",
    benefit: "Generación automática de los libros que exige la Junta. Sin rellenar formularios, sin cuadrar cifras a mano.",
    accent: "gold",
  },
  {
    icon: BarChart3,
    title: "INFOVI integrado",
    benefit: "Los datos de tu producción se preparan listos para INFOVI. Sin re-teclear, sin transcripciones manuales.",
    accent: "vineyard",
  },
  {
    icon: Grape,
    title: "Trazabilidad completa",
    benefit: "Desde los kilos de uva en báscula hasta la botella etiquetada. Consulta el historial de cualquier lote en segundos.",
    accent: "primary",
  },
  {
    icon: Package,
    title: "Stock en tiempo real",
    benefit: "Sabes exactamente qué hay en cada depósito, cuántas botellas quedan y qué materiales necesitas pedir. Sin sorpresas.",
    accent: "gold",
  },
  {
    icon: Beaker,
    title: "Laboratorio y analíticas",
    benefit: "pH, grado, SO2, acidez... Todo vinculado al depósito correspondiente y accesible desde cualquier dispositivo.",
    accent: "vineyard",
  },
];

const accentStyles: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  vineyard: "bg-vineyard/10 text-vineyard",
  gold: "bg-gold/10 text-gold",
};

const SolucionSection = () => {
  return (
    <section id="solucion" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-vineyard uppercase tracking-wider mb-4">
            La solución
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Todo lo que tu bodega necesita.{" "}
            <span className="text-primary">Nada que no necesite.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Cada módulo resuelve un problema real. Sin funciones de relleno, sin pantallas que nadie usa.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {modulos.map((m, i) => (
            <div
              key={i}
              className="bg-muted/30 rounded-2xl p-6 border border-border/30 hover:border-border hover:bg-muted/60 transition-all duration-300 group"
            >
              <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${accentStyles[m.accent]}`}
              >
                <m.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                {m.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {m.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolucionSection;
