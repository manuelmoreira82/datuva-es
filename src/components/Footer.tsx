import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { Instagram, MessageCircle, Phone } from "lucide-react";
import { waHref, TEL_CONTACTO, TEL_CONTACTO_LEGIBLE } from "@/lib/contacto";

const Footer = () => {
  return (
    <footer className="bg-[#0B0A14] text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-4">
            <Logo className="h-12" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-cream/55 text-sm">
            <a
              href="https://instagram.com/datuva.es"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @datuva.es
            </a>
            <a
              href={waHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${TEL_CONTACTO}`}
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              {TEL_CONTACTO_LEGIBLE}
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-cream/50">
              <Link to="/aviso-legal" className="hover:text-primary-foreground transition-colors">
                Aviso Legal
              </Link>
              <span className="hidden sm:inline text-primary-foreground/20">|</span>
              <Link to="/privacidad" className="hover:text-primary-foreground transition-colors">
                Política de Privacidad
              </Link>
              <span className="hidden sm:inline text-primary-foreground/20">|</span>
              <Link to="/politica-cookies" className="hover:text-primary-foreground transition-colors">
                Política de Cookies
              </Link>
              <span className="hidden sm:inline text-primary-foreground/20">|</span>
              <Link to="/terminos" className="hover:text-primary-foreground transition-colors">
                Términos y Condiciones
              </Link>
            </div>

            <p className="text-sm text-cream/45">
              C/ Yedra 3, Villafranca del Bierzo, León 24500
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-primary-foreground/30">
            © 2026 Datuva. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
