import { ArrowRight, Mail, Phone, User } from "lucide-react";
import Aforo from "@/components/Aforo";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/components/ContactDialog";
import CopaFinal from "@/components/CopaFinal";

const CTAFinalSection = () => {
  const { abrir } = useContactDialog();

  return (
    <section id="demo" className="relative overflow-hidden py-28 text-cream md:py-44">
      <Aforo />

      <div className="container relative z-10 mx-auto px-6 md:px-10">
        <CopaFinal>
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
            <span aria-hidden="true" className="traza-nodo h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>08</span>
            <span aria-hidden="true" className="traza-rama h-px w-6" />
            <span className="text-cream/55">Empezar</span>
          </div>
          <h2
            className="mb-6 font-serif text-[2.3rem] font-normal leading-[1.03] tracking-[-0.02em] md:text-[3.4rem]"
          >
            Deja de mover papeles entre el viñedo y la bodega.
          </h2>
          <p className="mb-10 text-base leading-relaxed text-cream/80">
            Datuva captura cada dato donde se genera y prepara con él tu SILICIE, tu INFOVI y los libros JCyL, listos para descargar y presentar.
            Te lo enseñamos funcionando en 20 minutos. Sin compromiso.
          </p>
          <Button
            variant="contact"
            size="lg"
            onClick={() => abrir("cta-final")}
            className="h-auto gap-3 px-10 py-6 font-mono text-xs uppercase tracking-[0.14em]"
          >
            Quiero ver la demo
            <ArrowRight className="w-5 h-5" />
          </Button>

          <div className="mt-14 border-t border-cream/20 pt-10">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-cream/85">
                <User className="w-4 h-4" />
                <span className="font-medium">Manuel Moreira</span>
                <span className="text-cream/50">—</span>
                <span className="text-cream/65 text-sm">Director General / Fundador</span>
              </div>
              <div className="flex flex-col items-center gap-4 text-sm text-cream/65 sm:flex-row">
                <a href="tel:+34627130891" className="flex items-center gap-2 hover:text-cream transition-colors">
                  <Phone className="w-4 h-4" />
                  627 130 891
                </a>
                <a href="mailto:manuelmoreira@datuva.es" className="flex items-center gap-2 hover:text-cream transition-colors">
                  <Mail className="w-4 h-4" />
                  manuelmoreira@datuva.es
                </a>
              </div>
            </div>
          </div>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
            Datuva — Digitalización y trazabilidad del campo a la botella
          </p>
          </div>
        </CopaFinal>
      </div>
    </section>
  );
};

export default CTAFinalSection;