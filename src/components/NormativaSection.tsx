import { FileCheck, CalendarDays, BookOpen, AlertTriangle, ShieldCheck } from "lucide-react";

const NormativaSection = () => {
  const features = [
    { icon: FileCheck, text: "SILICIE preparado automáticamente: cada movimiento de vino genera el asiento contable con su código NC (TARIC). El libro se descarga en el formato oficial de importación de la AEAT, listo para que lo presentes tú o tu gestoría." },
    { icon: CalendarDays, text: "Datos de INFOVI preparados mes a mes y exportables en Excel, CSV y PDF." },
    { icon: BookOpen, text: "Libros JCyL (Orden AGR/1616/2022): elaboración, envasado, etiquetado, entradas y salidas." },
    { icon: AlertTriangle, text: "Alertas de rendimiento, lías, mermas y subproductos fuera de rango." },
  ];

  return (
    <section id="normativa" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Cumplimiento normativo
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Tu SILICIE se prepara solo
          </h2>
          <p className="text-primary-foreground/60 text-lg mb-12 max-w-2xl">
            El diferenciador de Datuva. Cada operación en bodega alimenta automáticamente la documentación normativa.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/30 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-primary-foreground/85 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-sm text-primary-foreground/50 leading-relaxed border-l-2 border-accent/40 pl-4">
            Datuva prepara y exporta los libros y declaraciones a partir de los movimientos que
            registras. La presentación ante la AEAT, la Junta de Castilla y León u otros organismos
            oficiales, así como la revisión y veracidad de los datos, corresponde a la bodega o a su
            gestoría.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NormativaSection;