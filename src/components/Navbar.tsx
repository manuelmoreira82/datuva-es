import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactDialog } from "@/components/ContactDialog";
import Logo from "@/components/Logo";

/* La barra se adapta al tramo del descenso en el que esté: clara sobre la luz de
   la viña, oscura a partir de que el fondo se vuelve marrón. Con un valor fijo,
   o los enlaces desaparecían arriba (cream sobre cream) o la barra quedaba color
   crema flotando sobre las secciones oscuras. */
const Navbar = ({ sobreClaro: forzarClaro }: { sobreClaro?: boolean } = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [enZonaClara, setEnZonaClara] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { abrir } = useContactDialog();
  const sobreClaro = forzarClaro ?? enZonaClara;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // La primera pantalla es la foto de la cepa, oscura: ahí la barra va en
      // modo oscuro. Se mide contra el FONDO REAL de esa sección, no contra una
      // fracción de pantalla: en móvil la cepa es bastante más alta que una
      // pantalla y con un umbral fijo la barra se aclaraba encima de la foto.
      const cepa = document.getElementById("cepa");
      const pasadaLaCepa = cepa ? cepa.getBoundingClientRect().bottom <= 64 : true;
      const recorrible = document.documentElement.scrollHeight - window.innerHeight;
      const progreso = recorrible > 0 ? window.scrollY / recorrible : 0;
      setEnZonaClara(pasadaLaCepa && progreso < 0.2);
    };
    handleScroll();
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
          ? sobreClaro
            ? "bg-[#F5F0E8]/90 py-3 shadow-lg shadow-black/10 backdrop-blur-md"
            : "bg-[#0B0A14]/90 py-3 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#inicio" className={`transition-opacity hover:opacity-80 ${sobreClaro ? "bg-[#0B0A14] px-3 py-2" : ""}`}>
          <Logo className="h-9 md:h-10" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#modulos"
            className={`font-medium transition-colors duration-200 hover:text-[#C9A227] ${sobreClaro ? "text-[#241C12]/80" : "text-[#F5F0E8]/75"}`}
          >
            Módulos
          </a>
          <a
            href="/presentacion"
            className={`font-medium transition-colors duration-200 hover:text-[#C9A227] ${sobreClaro ? "text-[#241C12]/80" : "text-[#F5F0E8]/75"}`}
          >
            Presentación
          </a>
          <a
            href="#demo"
            className={`font-medium transition-colors duration-200 hover:text-[#C9A227] ${sobreClaro ? "text-[#241C12]/80" : "text-[#F5F0E8]/75"}`}
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
          className={`p-2 md:hidden ${sobreClaro ? "text-[#241C12]" : "text-[#F5F0E8]"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0B0A14]/95 backdrop-blur-md shadow-lg p-6 animate-fade-in-up">
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
