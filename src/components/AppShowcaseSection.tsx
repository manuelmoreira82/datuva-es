import appScreenshotMap from "@/assets/app-screenshot-map.jpg";
import appScreenshotAnalytics from "@/assets/app-screenshot-analytics.jpg";
import appScreenshotTraceability from "@/assets/app-screenshot-traceability.jpg";
import { Map, FlaskConical, History } from "lucide-react";

const AppShowcaseSection = () => {
  const screenshots = [
    {
      image: appScreenshotMap,
      icon: Map,
      title: "Mapa de Parcelas 3D",
      description: "Visualiza tus viñedos con mapas 3D. Registra trabajos, tratamientos fitosanitarios y muestras de maduración directamente sobre cada parcela.",
      alt: "Mapa 3D de parcelas con registro de trabajos de campo"
    },
    {
      image: appScreenshotAnalytics,
      icon: FlaskConical,
      title: "Laboratorio y Analíticas",
      description: "Controla la composición de cada depósito: pH, grado alcohólico, SO2, tipo de uva. Todo vinculado automáticamente a la trazabilidad.",
      alt: "Panel de analíticas de laboratorio con datos de vino"
    },
    {
      image: appScreenshotTraceability,
      icon: History,
      title: "Histórico por Añada",
      description: "Trazabilidad completa del ciclo de vida: desde los kg de uva hasta las botellas vendidas. Consulta cualquier añada en segundos.",
      alt: "Histórico de trazabilidad por añada con métricas de producción"
    }
  ];

  return (
    <section id="app-showcase" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-vineyard uppercase tracking-wider mb-4">
            La App en Acción
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Así se ve Datuva{" "}
            <span className="text-primary">en el día a día.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Capturas reales de la aplicación. Sin retoques, sin demos falsas.
          </p>
        </div>

        {/* Screenshots Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {screenshots.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col"
            >
              {/* Phone Frame */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-vineyard/10 blur-2xl scale-90 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative bg-foreground/5 rounded-[2rem] p-2 shadow-xl border border-border/30 group-hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-auto rounded-[1.5rem]"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
