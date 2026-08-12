import { Quote } from "lucide-react";
import Aforo from "@/components/Aforo";
import EncabezadoSeccion from "@/components/EncabezadoSeccion";

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
    <section className="relative py-28 md:py-44">
      <Aforo />
      <div className="container relative mx-auto px-6 md:px-10 lg:pl-20">
        <EncabezadoSeccion
          codigo="06"
          etiqueta="Prueba social"
          titulo={<>Lo dicen ellos, <span className="italic text-gold">no nosotros.</span></>}
          descripcion="Testimonios reales de bodegas que ya trabajan con Datuva."
          className="mb-16 md:mb-20"
        />

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-3 lg:gap-x-14">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="relative flex flex-col"
            >
              <Quote className="mb-5 h-7 w-7 text-gold/30" />
              <p className="font-serif text-lg font-normal leading-snug text-cream">
                «{t.quote}»
              </p>
              <div className="mt-auto pt-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{t.name}</div>
                <div className="mt-1.5 text-xs text-cream/45">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniosSection;
