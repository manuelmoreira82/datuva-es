import { Package, Minus, AlertTriangle, Tag, Archive, Boxes, Globe } from "lucide-react";

const EmbotilladoSection = () => {
  const features = [
    { icon: Package, text: "Control por lotes de embotellado con trazabilidad hasta la parcela de origen." },
    { icon: Minus, text: "Descuento automático de materiales: corchos, botellas, cápsulas." },
    { icon: AlertTriangle, text: "Registro de roturas de material." },
    { icon: Tag, text: "Control de etiquetado: contraetiquetas, precintas del Consejo Regulador, palets." },
    { icon: Archive, text: "Stock de producto terminado: sin etiquetar y etiquetado." },
    { icon: Boxes, text: "Inventario de materiales: corchos, botellas, etiquetas, cápsulas, cajas, precintas." },
    { icon: Globe, text: "E-label conforme al Reglamento UE 2021/2117." },
  ];

  return (
    <section id="embotellado" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Embotellado y etiquetado
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            Embotellas. El stock se actualiza solo.
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

export default EmbotilladoSection;