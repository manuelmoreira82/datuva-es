import { ArrowRight, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTAFinalSection = () => {
  return (
    <section id="demo" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Deja de mover papeles entre el viñedo, la bodega y tu ERP.
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-2xl mx-auto">
            Datuva captura cada dato donde se genera y lo entrega listo a SILICIE, INFOVI y a tu software de gestión.
            Te lo enseñamos funcionando en 20 minutos. Sin compromiso.
          </p>
          <Button
            variant="contact"
            size="lg"
            asChild
            className="text-lg px-10 py-6 h-auto"
          >
            <a
              href="mailto:manuelmoreira@datuva.es?subject=Solicitud%20de%20demostraci%C3%B3n%20Datuva"
              className="gap-3"
            >
              Quiero ver la demo
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>

          <div className="mt-14 pt-10 border-t border-primary-foreground/10">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <User className="w-4 h-4" />
                <span className="font-medium">Manuel Moreira</span>
                <span className="text-primary-foreground/40">—</span>
                <span className="text-primary-foreground/60 text-sm">Director General / Fundador</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-primary-foreground/60">
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

          <p className="mt-8 text-primary-foreground/40 text-sm italic">
            Datuva — Digitalización y trazabilidad del campo a la botella
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTAFinalSection;