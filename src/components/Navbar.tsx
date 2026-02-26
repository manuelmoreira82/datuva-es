import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import datuvaLogo from "@/assets/datuva-logo-new.webp";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Problema", href: "#inicio" },
    { label: "Solución", href: "#solucion" },
    { label: "Comparativa", href: "#comparativa" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <img
            src={datuvaLogo}
            alt="Datuva Logo"
            className="h-12 w-auto rounded-lg"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="heroOutline" size="default">
            Acceso Clientes
          </Button>
          <Button variant="hero" size="default" asChild>
            <a href="https://wa.me/34627130891?text=Hola%2C%20quiero%20solicitar%20una%20demo%20de%20Datuva" target="_blank" rel="noopener noreferrer">
              Solicitar Demo
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card shadow-card p-6 animate-fade-in-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/80 hover:text-primary font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-border my-2" />
            <Button variant="heroOutline" className="w-full">
              Acceso Clientes
            </Button>
            <Button variant="hero" className="w-full" asChild>
              <a href="https://wa.me/34627130891?text=Hola%2C%20quiero%20solicitar%20una%20demo%20de%20Datuva" target="_blank" rel="noopener noreferrer">
                Solicitar Demo
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
