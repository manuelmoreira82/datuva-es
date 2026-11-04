import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Aforo from "@/components/Aforo";
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
      "No. Vamos a tu bodega, identificamos depósitos y barricas con pegatinas QR y formamos a tu equipo allí mismo.",
  },
  {
    question: "¿Cuánto tiempo tarda la migración desde Excel?",
    answer:
      "Depende del volumen de datos históricos que quieras traer. Nos encargamos nosotros de la carga inicial para que tú no pierdas tiempo.",
  },
  {
    question: "¿Y si ya usamos Excel y nos funciona?",
    answer:
      "Excel funciona hasta que falla: un dato mal copiado, una fórmula rota, un archivo que se corrompe. En Datuva cada movimiento se apunta una vez, en el momento, y los depósitos se identifican escaneando su QR. Con esos mismos datos la app prepara SILICIE, INFOVI y los libros de la Junta, sin volver a copiar nada.",
  },
  {
    question: "¿Es obligatorio usar SILICIE desde la app?",
    answer:
      "No es obligatorio, pero sí muy recomendable. Datuva prepara el libro SILICIE a partir de los movimientos que ya registras en el día a día. A fin de mes lo revisas y descargas el fichero, y lo presenta tu bodega o tu gestoría.",
  },
  {
    question: "¿Funciona sin cobertura en la viña o en la nave?",
    answer:
      "En parte. Los fichajes, las incidencias de campo (la foto necesita conexión), los movimientos de bodega con la pestaña Masivo, el embotellado y el etiquetado se guardan en el móvil sin cobertura y se envían al volver la señal. Los tratamientos, los partes de campo y casi todo el mapa necesitan conexión.",
  },
  {
    question: "¿Se adapta a cualquier tamaño de bodega?",
    answer:
      "Sí. Cada bodega tiene sus propios datos, sus usuarios y su configuración. El precio parte de 150 €/mes + IVA; en la demo te lo concretamos para tu bodega.",
  },
  {
    question: "¿Qué soporte incluye?",
    answer:
      "Soporte directo conmigo, Manuel Moreira, por WhatsApp, teléfono o correo. Sin tickets ni bots. Conozco tu bodega y tu configuración, así que la respuesta es concreta.",
  },
];

const FAQSection = ({ codigo = "07" }: { codigo?: string }) => {
  return (
    <section id="faq" className="relative py-28 md:py-44">
      <Aforo />
      <div className="container relative mx-auto px-6 md:px-10 lg:pl-20">
        <EncabezadoSeccion
          codigo={codigo}
          etiqueta="Preguntas frecuentes"
          titulo={
            <>
              Las dudas que ya nos han{" "}
              <span className="italic text-gold">preguntado otros bodegueros.</span>
            </>
          }
          className="mb-16 md:mb-20"
        />

        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-cream/12 transition-colors data-[state=open]:border-mosto/45"
              >
                <AccordionTrigger className="py-5 text-left font-serif text-lg font-normal text-cream hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-cream/65">
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
