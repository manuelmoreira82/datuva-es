import { Phone, Mail } from "lucide-react";

const QuienSection = () => {
  return (
    <section id="quien" className="bg-cream py-24 md:py-36">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Foto placeholder */}
          <div className="md:col-span-5">
            <div className="aspect-[4/5] w-full max-w-md bg-foreground/8 rounded-sm overflow-hidden relative border border-foreground/10">
              {/* placeholder sobrio: retrato */}
              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-foreground/5 to-foreground/15">
                <svg viewBox="0 0 200 240" className="w-1/2 text-foreground/25 mb-8">
                  <circle cx="100" cy="80" r="44" fill="currentColor" />
                  <path d="M 30 240 Q 30 150 100 150 Q 170 150 170 240 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 text-foreground/40 text-[10px] tracking-[0.3em] uppercase bg-cream/80 px-2 py-1 rounded">
                Foto Manuel · pendiente
              </div>
            </div>
            <p className="mt-4 text-foreground/55 text-sm">
              Manuel Moreira · Fundador de Datuva
            </p>
          </div>

          {/* Texto en primera persona */}
          <div className="md:col-span-7">
            <p className="text-foreground/50 text-xs tracking-[0.3em] uppercase mb-6">
              Quién está detrás
            </p>
            <h2 className="font-display text-foreground font-medium leading-[1.05] tracking-[-0.02em] text-balance text-[2rem] sm:text-4xl md:text-5xl">
              <span className="italic">"Lo construí porque yo era el que pasaba las tardes con los Excels."</span>
            </h2>
            <div className="mt-10 space-y-5 text-foreground/80 text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                Llevo veinte años en bodega. La mayoría en{" "}
                <span className="text-foreground">Descendientes de J. Palacios</span>,
                en Corullón. Conozco el trabajo desde dentro: el viñedo en cuesta,
                la entrada de uva a las tres de la mañana, la analítica que no cuadra,
                el SILICIE que hay que cerrar el día 30.
              </p>
              <p className="text-foreground/65">
                Datuva no es un software pensado por gente que ha visto una bodega en
                un PDF. Es la herramienta que llevo años queriendo tener.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 text-sm">
              <a
                href="tel:+34627130891"
                className="inline-flex items-center gap-2 text-foreground hover:text-vino transition-colors"
              >
                <Phone className="w-4 h-4" />
                627 130 891
              </a>
              <span className="hidden sm:inline text-foreground/20">·</span>
              <a
                href="mailto:manuelmoreira@datuva.es"
                className="inline-flex items-center gap-2 text-foreground hover:text-vino transition-colors"
              >
                <Mail className="w-4 h-4" />
                manuelmoreira@datuva.es
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuienSection;
