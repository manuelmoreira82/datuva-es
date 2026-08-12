import { ArrowRight, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/components/ContactDialog";

const CTAFinalSection = () => {
  const { abrir } = useContactDialog();

  return (
    <section id="demo" className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
      <div className="fondo-reticula pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-bordeaux opacity-30 blur-[150px]" />
      <div className="traza-vertical pointer-events-none absolute bottom-0 left-6 top-0 hidden w-px lg:block" />

      <div className="container relative z-10 mx-auto px-6 md:px-10 lg:pl-20">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
            <span aria-hidden="true" className="traza-nodo h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>08</span>
            <span aria-hidden="true" className="traza-rama h-px w-6" />
            <span className="text-primary-foreground/55">Empezar</span>
          </div>
          <h2
            className="mb-6 font-serif text-[2.3rem] font-normal leading-[1.03] tracking-[-0.02em] md:text-[3.4rem]"
            style={{ fontVariationSettings: '"opsz" 110, "SOFT" 20' }}
          >
            Deja de mover papeles entre el viñedo y la bodega.
          </h2>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/70">
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

          <div className="mt-14 border-t border-primary-foreground/15 pt-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <User className="w-4 h-4" />
                <span className="font-medium">Manuel Moreira</span>
                <span className="text-primary-foreground/40">—</span>
                <span className="text-primary-foreground/60 text-sm">Director General / Fundador</span>
              </div>
              <div className="flex flex-col gap-4 text-sm text-primary-foreground/60 sm:flex-row">
                <a href="tel:+34627130891" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                  627 130 891
                </a>
                <a href="mailto:manuelmoreira@datuva.es" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                  manuelmoreira@datuva.es
                </a>
              </div>
            </div>
          </div>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground/40">
            Datuva — Digitalización y trazabilidad del campo a la botella
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTAFinalSection;