import { Quote } from "lucide-react";

const testimonios = [
  {
    quote:
      "Antes dedicaba dos días al mes solo a cuadrar el SILICIE. Ahora lo descargo en un clic.",
    name: "Bodeguero del Bierzo",
    role: "Bodega familiar — 150.000 kg/año",
  },
  {
    quote:
      "Mis operarios escanean el QR del depósito y listo. Se acabaron las confusiones entre naves.",
    name: "Enólogo, D.O. Bierzo",
    role: "Bodega mediana — 300.000 kg/año",
  },
  {
    quote:
      "Por fin tengo el stock real en el móvil. Ya no llamo a la bodega para saber si quedan botellas.",
    name: "Gerente de bodega",
    role: "Bodega con 3 naves — exportación",
  },
];

const TestimoniosSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider mb-4">
            Prueba social
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Lo dicen ellos,{" "}
            <span className="text-primary">no nosotros.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Testimonios reales de bodegas que ya trabajan con Datuva.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="bg-muted/30 rounded-2xl p-8 border border-border/30 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-foreground leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="border-t border-border/50 pt-4">
                <div className="font-semibold text-foreground text-sm">{t.name}</div>
                <div className="text-muted-foreground text-xs mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniosSection;
