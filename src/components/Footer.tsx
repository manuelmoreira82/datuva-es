import { Link } from "react-router-dom";
import datuvaLogo from "@/assets/datuva-logo.jpg";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        {/* Main Message */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed italic">
            "Software del Bierzo para el mundo. Datuva no se ha probado en oficinas, 
            se ha probado en bodegas reales, con mangueras en el suelo y durante 
            vendimias caóticas.{" "}
            <span className="text-gold font-medium not-italic">Sabemos lo que necesitas.</span>"
          </p>
        </div>

        {/* Logo and Contact */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex items-center gap-4">
            <img
              src={datuvaLogo}
              alt="Datuva Logo"
              className="h-14 w-auto rounded-lg"
            />
          </div>

          {/* Contact */}
          <div className="flex items-center gap-3 text-primary-foreground/80">
            <Mail className="w-5 h-5" />
            <a 
              href="mailto:Manuelmoreira@datuva.es" 
              className="hover:text-primary-foreground transition-colors"
            >
              Manuelmoreira@datuva.es
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/60">
              <Link
                to="/terminos"
                className="hover:text-primary-foreground transition-colors"
              >
                Términos y Condiciones
              </Link>
              <span className="hidden sm:inline text-primary-foreground/30">|</span>
              <Link
                to="/privacidad"
                className="hover:text-primary-foreground transition-colors"
              >
                Política de Privacidad
              </Link>
              <span className="hidden sm:inline text-primary-foreground/30">|</span>
              <Link
                to="/terminos"
                className="hover:text-primary-foreground transition-colors"
              >
                Aviso Legal
              </Link>
            </div>

            {/* Origin Text */}
            <p className="text-sm text-primary-foreground/50">
              Hecho en El Bierzo 🍇
            </p>
          </div>

          {/* Copyright */}
          <p className="mt-6 text-center text-sm text-primary-foreground/40">
            © 2025 Datuva. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
