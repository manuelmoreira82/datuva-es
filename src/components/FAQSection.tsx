import EncabezadoSeccion from "@/components/EncabezadoSeccion";
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
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative bg-background py-24 md:py-32">
      <div className="traza-vertical pointer-events-none absolute bottom-0 left-6 top-0 hidden w-px opacity-60 lg:block" />
      <div className="container relative mx-auto px-6 md:px-10 lg:pl-20">
        <EncabezadoSeccion
          codigo="07"
          etiqueta="Preguntas frecuentes"
          oscuro={false}
          titulo={
            <>
              Las dudas que ya nos han{" "}
              <span className="italic text-bordeaux">preguntado otros bodegueros.</span>
            </>
          }
          className="mb-14"
        />

        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/60 bg-card px-6 transition-colors data-[state=open]:border-bordeaux/40"
              >
                <AccordionTrigger className="py-5 text-left font-serif text-lg font-normal text-primary hover:no-underline">
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
