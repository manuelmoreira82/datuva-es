import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Es complicado implementarlo en mi bodega?",
    answer:
      "No. Vamos a tu bodega, identificamos depósitos y barricas con QRs industriales y formamos a tu equipo in situ. La mayoría de bodegas están operativas en menos de una semana.",
  },
  {
    question: "¿Cuánto tiempo tarda la migración desde Excel?",
    answer:
      "Depende del volumen de datos históricos, pero normalmente entre 2 y 5 días laborables. Nos encargamos nosotros de la carga inicial para que tú no pierdas tiempo.",
  },
  {
    question: "¿Y si ya usamos Excel y nos funciona?",
    answer:
      "Excel funciona hasta que falla: un dato mal copiado, una fórmula rota, un archivo que se corrompe. Datuva valida cada movimiento con QR, elimina los errores humanos y genera los documentos oficiales automáticamente. Es la diferencia entre sobrevivir y profesionalizarse.",
  },
  {
    question: "¿Es obligatorio usar SILICIE desde la app?",
    answer:
      "No es obligatorio, pero sí muy recomendable. Datuva genera el libro SILICIE automáticamente a partir de los movimientos que ya registras en el día a día. No hay trabajo extra: solo descargas y presentas.",
  },
  {
    question: "¿Se adapta a cualquier tamaño de bodega?",
    answer:
      "Sí. Datuva tiene arquitectura multi-tenant y se adapta tanto a bodegas familiares de 50.000 kg como a bodegas medianas de 500.000 kg o más. Pagas según tu volumen.",
  },
  {
    question: "¿Qué soporte incluye?",
    answer:
      "Soporte directo conmigo, Manuel Moreira, por teléfono o WhatsApp. Sin tickets, sin bots, sin esperas. Conozco tu bodega y tu configuración, así que la respuesta es rápida y concreta.",
  },
  {
    question: "¿Funciona sin internet?",
    answer:
      "Sí. Datuva está diseñada para funcionar en naves sin cobertura. Escaneas QRs, registras movimientos y todo se sincroniza automáticamente cuando recuperas señal.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Preguntas frecuentes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Las dudas que ya nos han{" "}
            <span className="text-primary">preguntado otros bodegueros.</span>
          </h2>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-background rounded-xl border border-border/50 px-6 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
