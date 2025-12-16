import { Map, Database, QrCode, FileText } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Campo y Viña",
    description:
      "Control de parcelas, viticultores y cuadernos de campo digitales. Todo el campo en la palma de tu mano.",
    color: "vineyard",
    size: "large",
  },
  {
    icon: Database,
    title: "Bodega Visual",
    description:
      "Mueve vino arrastrando el dedo entre depósitos. Trazabilidad total garantizada.",
    color: "primary",
    size: "normal",
  },
  {
    icon: QrCode,
    title: "QR Inteligentes",
    description:
      "Etiquetado automático. Generamos códigos QR para tus depósitos y botellas.",
    color: "accent",
    size: "normal",
  },
  {
    icon: FileText,
    title: "SILICIE Automático",
    description:
      "Tú trabajas, el libro de impuestos se rellena solo. Descarga en 1 clic.",
    color: "primary",
    size: "featured",
  },
];

const FeaturesSection = () => {
  return (
    <section id="funcionalidades" className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
            Todo lo que necesitas, en una sola plataforma
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in-up-delay-1">
            Funcionalidades diseñadas por y para bodegueros
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Card - Campo y Viña */}
          <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 bg-gradient-to-br from-vineyard to-vineyard-light rounded-3xl p-8 text-secondary-foreground relative overflow-hidden group hover:shadow-hover transition-all duration-300 animate-fade-in-up">
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-secondary-foreground/20 flex items-center justify-center mb-6">
                <Map className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{features[0].title}</h3>
              <p className="text-secondary-foreground/80 text-lg leading-relaxed">
                {features[0].description}
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary-foreground/5 rounded-full -mr-16 -mb-16 group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* Normal Cards */}
          <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-hover transition-all duration-300 group animate-fade-in-up-delay-1">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Database className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              {features[1].title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {features[1].description}
            </p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-hover transition-all duration-300 group animate-fade-in-up-delay-2">
            <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/30 transition-colors">
              <QrCode className="w-7 h-7 text-gold" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              {features[2].title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {features[2].description}
            </p>
          </div>

          {/* Featured Card - SILICIE */}
          <div className="md:col-span-2 bg-gradient-to-br from-primary to-bordeaux-light rounded-3xl p-8 text-primary-foreground relative overflow-hidden group hover:shadow-hover transition-all duration-300 animate-fade-in-up-delay-3">
            <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <div className="inline-block px-3 py-1 bg-primary-foreground/20 rounded-full text-sm font-medium mb-3">
                  Destacado
                </div>
                <h3 className="text-2xl font-bold mb-2">{features[3].title}</h3>
                <p className="text-primary-foreground/80 text-lg">
                  {features[3].description}
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
