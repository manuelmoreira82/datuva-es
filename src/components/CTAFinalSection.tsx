import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Aforo from "@/components/Aforo";
import { Button } from "@/components/ui/button";
import { waHref, TEL_CONTACTO, TEL_CONTACTO_LEGIBLE } from "@/lib/contacto";
import CopaFinal from "@/components/CopaFinal";

const CTAFinalSection = () => {
  return (
    <section id="demo" className="relative overflow-hidden py-24 text-cream md:py-36">
      <Aforo />

      <div className="container relative z-10 mx-auto px-6 md:px-10">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* La copa: encima del titular en móvil, a la derecha en escritorio */}
          <CopaFinal className="mx-auto block h-64 w-auto sm:h-80 lg:order-last lg:h-[560px]" />

          {/* El mensaje */}
          <div className="text-center lg:text-left">
            <div className="mb-6 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold lg:justify-start">
              <span aria-hidden="true" className="traza-nodo h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>08</span>
              <span aria-hidden="true" className="traza-rama h-px w-6" />
              <span className="text-cream/55">Empezar</span>
            </div>
            <h2 className="mb-6 font-serif text-[2.3rem] font-normal leading-[1.03] tracking-[-0.02em] md:text-[3.4rem]">
              Deja de mover papeles entre el viñedo y la bodega.
            </h2>
            <p className="mb-10 text-base leading-relaxed text-cream/80">
              Datuva captura cada dato donde se genera y prepara con él tu SILICIE, tu INFOVI y los libros JCyL, listos para descargar y presentar.
              Te lo enseñamos funcionando en 20 minutos. Sin compromiso.
            </p>
            <Button
              variant="contact"
              size="lg"
              asChild
              className="h-auto gap-3 px-10 py-6 font-mono text-xs uppercase tracking-[0.14em]"
            >
              <a href={waHref()} target="_blank" rel="noopener noreferrer">
                Quiero ver la demo
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <p className="mt-5 text-sm text-cream/60">
              Desde <span className="cifras font-semibold text-gold">150 €/mes</span> + IVA
            </p>

            {/* Contacto directo con el fundador */}
            <div className="mt-12 border-t border-cream/15 pt-8">
              <p className="text-cream/85">
                <span className="font-medium">Manuel Moreira</span>
                <span className="text-cream/55"> · Director General / Fundador</span>
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href={`tel:${TEL_CONTACTO}`}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-cream/20 px-5 py-3 text-sm transition-colors hover:bg-cream/10"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  <span className="cifras">{TEL_CONTACTO_LEGIBLE}</span>
                </a>
                <a
                  href={waHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-cream/20 px-5 py-3 text-sm transition-colors hover:bg-cream/10"
                >
                  <MessageCircle className="h-4 w-4 text-gold" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-20 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          Datuva — Digitalización y trazabilidad del campo a la botella
        </p>
      </div>
    </section>
  );
};

export default CTAFinalSection;
