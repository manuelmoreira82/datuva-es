import { Link } from "react-router-dom";
import datuvaLogo from "@/assets/datuva-logo-new.webp";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-4">
            <img
              src={datuvaLogo}
              alt="Datuva Logo"
              className="h-12 w-auto rounded-lg"
            />
          </div>

          <div className="flex items-center gap-6 text-primary-foreground/60 text-sm">
            <a
              href="https://instagram.com/dat_uva"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @dat_uva
            </a>
            <a
              href="https://datuva.es"
              className="hover:text-primary-foreground transition-colors"
            >
              www.datuva.es
            </a>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/50">
              <Link to="/terminos" className="hover:text-primary-foreground transition-colors">
                Términos y Condiciones
              </Link>
              <span className="hidden sm:inline text-primary-foreground/20">|</span>
              <Link to="/privacidad" className="hover:text-primary-foreground transition-colors">
                Política de Privacidad
              </Link>
              <span className="hidden sm:inline text-primary-foreground/20">|</span>
              <Link to="/terminos" className="hover:text-primary-foreground transition-colors">
                Aviso Legal
              </Link>
            </div>

            <p className="text-sm text-primary-foreground/40">
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