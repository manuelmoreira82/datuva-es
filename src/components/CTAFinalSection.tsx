import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTAFinalSection = () => {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Si tu bodega está creciendo,{" "}
            <span className="text-gold">tu gestión no puede seguir igual.</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Agenda una demo personalizada de 30 minutos. Te enseño cómo funciona Datuva 
            con los datos de tu bodega. Sin compromiso.
          </p>
          <Button
            variant="contact"
            size="lg"
            asChild
            className="text-lg px-10 py-6 h-auto"
          >
            <a
              href="https://wa.me/34627130891?text=Hola%2C%20quiero%20agendar%20una%20demo%20personalizada%20de%20Datuva"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-3"
            >
              Agendar demo personalizada
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <p className="mt-6 text-primary-foreground/50 text-sm">
            Trato directo con Manuel Moreira · Sin intermediarios · Respuesta en 24h
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTAFinalSection;
