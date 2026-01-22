import { Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contacto" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up">
            Pide una demo y comprueba cómo funciona DATUVA en una bodega real
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-12 max-w-xl mx-auto animate-fade-in-up-delay-1">
            Te lo enseñamos en una llamada corta, sin rodeos. Si encaja con tu
            forma de trabajar, lo verás en minutos.
          </p>

          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 animate-fade-in-up-delay-2">
            <div className="flex flex-col items-center gap-6">
              {/* Contact Person */}
              <div className="flex items-center gap-4 text-lg">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-gold" />
                </div>
                <span className="font-semibold text-xl">
                  Manuel Moreira García
                </span>
              </div>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-6 w-full max-w-lg mt-4">
                <a
                  href="tel:+34627130891"
                  className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-5 hover:bg-primary-foreground/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-vineyard/20 flex items-center justify-center group-hover:bg-vineyard/30 transition-colors">
                    <Phone className="w-6 h-6 text-vineyard-light" />
                  </div>
                  <div className="text-left">
                    <div className="text-primary-foreground/60 text-sm">
                      Teléfono
                    </div>
                    <div className="font-semibold">627 130 891</div>
                  </div>
                </a>

                <a
                  href="mailto:Manuelmoreira@datuva.es"
                  className="flex items-center gap-4 bg-primary-foreground/10 rounded-2xl p-5 hover:bg-primary-foreground/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div className="text-left">
                    <div className="text-primary-foreground/60 text-sm">
                      Email
                    </div>
                    <div className="font-semibold text-sm">
                      Manuelmoreira@datuva.es
                    </div>
                  </div>
                </a>
              </div>

              {/* CTA Button */}
              <Button
                variant="contact"
                size="lg"
                className="mt-6"
                asChild
              >
                <a href="tel:+34627130891">Ver una demo / Solicitar llamada</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
