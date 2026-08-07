import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/components/ContactDialog";
import datuvaLogo from "@/assets/datuva-logo-new.webp";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { abrir } = useContactDialog();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      /* La barra es siempre oscura: la mitad de las secciones tienen fondo negro
         y una barra color crema flotando encima cortaba los titulares. Además el
         header negro con el logo dorado es la identidad de Datuva. */
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0A14]/90 backdrop-blur-md shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <img
            src={datuvaLogo}
            alt="Datuva Logo"
            className="h-10 w-auto rounded-lg"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#modulos"
            className="font-medium text-[#F5F0E8]/75 hover:text-[#C9A227] transition-colors duration-200"
          >
            Módulos
          </a>
          <a
            href="/presentacion"
            className="font-medium text-[#F5F0E8]/75 hover:text-[#C9A227] transition-colors duration-200"
          >
            Presentación
          </a>
          <a
            href="#demo"
            className="font-medium text-[#F5F0E8]/75 hover:text-[#C9A227] transition-colors duration-200"
          >
            Contacto
          </a>
        </div>

        <div className="hidden md:flex items-center">
          <Button variant="contact" size="default" onClick={() => abrir("navbar")}>
            Solicitar demo
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-[#F5F0E8]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0B0A14]/97 backdrop-blur-md shadow-lg p-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <a
              href="#modulos"
              className="text-[#F5F0E8]/80 hover:text-[#C9A227] font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Módulos
            </a>
            <a
              href="/presentacion"
              className="text-[#F5F0E8]/80 hover:text-[#C9A227] font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Presentación
            </a>
            <a
              href="#demo"
              className="text-[#F5F0E8]/80 hover:text-[#C9A227] font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </a>
            <hr className="border-[#F5F0E8]/15 my-2" />
            <Button
              variant="contact"
              className="w-full"
              onClick={() => {
                setIsMobileMenuOpen(false);
                abrir("navbar-movil");
              }}
            >
              Solicitar demo
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
