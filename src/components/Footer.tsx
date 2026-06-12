import { Link } from "react-router-dom";
import datuvaLogo from "@/assets/datuva-logo-new.webp";
import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-carbon text-cream py-14 border-t border-cream/8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-3">
            <img src={datuvaLogo} alt="Datuva" className="h-10 w-auto rounded-md" />
            <span className="font-display text-cream/70 text-sm italic">
              Hecho en El Bierzo
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-cream/55 text-sm">
            <a
              href="https://instagram.com/datuva.es"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-mostaza transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @datuva.es
            </a>
            <a
              href="mailto:manuelmoreira@datuva.es"
              className="flex items-center gap-2 hover:text-mostaza transition-colors"
            >
              <Mail className="w-4 h-4" />
              manuelmoreira@datuva.es
            </a>
            <a
              href="tel:+34627130891"
              className="flex items-center gap-2 hover:text-mostaza transition-colors"
            >
              <Phone className="w-4 h-4" />
              627 130 891
            </a>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-7">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-cream/45">
              <Link to="/aviso-legal" className="hover:text-cream transition-colors">Aviso Legal</Link>
              <span className="text-cream/20">·</span>
              <Link to="/privacidad" className="hover:text-cream transition-colors">Privacidad</Link>
              <span className="text-cream/20">·</span>
              <Link to="/politica-cookies" className="hover:text-cream transition-colors">Cookies</Link>
              <span className="text-cream/20">·</span>
              <Link to="/terminos" className="hover:text-cream transition-colors">Términos</Link>
            </div>
            <p className="text-xs text-cream/40">
              C/ Yedra 3 · Villafranca del Bierzo · León 24500
            </p>
          </div>

          <p className="mt-5 text-center text-xs text-cream/30">
            © 2026 Datuva. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
