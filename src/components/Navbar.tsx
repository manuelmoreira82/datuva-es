import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import datuvaLogo from "@/assets/datuva-logo-new.webp";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-carbon text-cream transition-all duration-300 ${
        scrolled ? "py-2 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.6)]" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 group" aria-label="Datuva — Inicio">
          <img
            src={datuvaLogo}
            alt="Datuva"
            className="h-9 md:h-10 w-auto rounded-md"
          />
        </a>

        <div className="hidden md:flex items-center gap-10">
          <a href="#problema" className="text-cream/70 hover:text-cream text-sm font-medium tracking-wide transition-colors">
            El problema
          </a>
          <a href="#ciclo" className="text-cream/70 hover:text-cream text-sm font-medium tracking-wide transition-colors">
            El ciclo
          </a>
          <a href="#cumplimiento" className="text-cream/70 hover:text-cream text-sm font-medium tracking-wide transition-colors">
            Cumplimiento
          </a>
          <a href="#quien" className="text-cream/70 hover:text-cream text-sm font-medium tracking-wide transition-colors">
            Quién somos
          </a>
        </div>

        <div className="hidden md:flex items-center">
          <Button
            asChild
            className="bg-mostaza text-carbon hover:bg-mostaza/90 font-semibold rounded-md h-10 px-5 shadow-none hover:shadow-[0_8px_24px_-8px_hsl(var(--mostaza)/0.5)] transition-all"
          >
            <a href="#contacto">Reserva una demo</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-cream"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-carbon border-t border-cream/10 p-6 animate-fade-in-up">
          <div className="flex flex-col gap-4">
            <a href="#problema" className="text-cream/80 py-1.5" onClick={() => setIsMobileMenuOpen(false)}>El problema</a>
            <a href="#ciclo" className="text-cream/80 py-1.5" onClick={() => setIsMobileMenuOpen(false)}>El ciclo</a>
            <a href="#cumplimiento" className="text-cream/80 py-1.5" onClick={() => setIsMobileMenuOpen(false)}>Cumplimiento</a>
            <a href="#quien" className="text-cream/80 py-1.5" onClick={() => setIsMobileMenuOpen(false)}>Quién somos</a>
            <Button
              asChild
              className="bg-mostaza text-carbon hover:bg-mostaza/90 font-semibold w-full mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <a href="#contacto">Reserva una demo</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
