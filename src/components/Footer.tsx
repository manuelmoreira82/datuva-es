import datuvaLogo from "@/assets/datuva-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img
              src={datuvaLogo}
              alt="Datuva Logo"
              className="h-14 w-auto rounded-lg"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70">
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors"
            >
              Aviso Legal
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors"
            >
              Política de Privacidad
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          © 2025 Datuva. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
