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
    { label: "Campo", href: "#campo" },
    { label: "Bodega", href: "#bodega" },
    { label: "Normativa", href: "#normativa" },
    { label: "Costes", href: "#costes" },
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
            className="h-10 w-auto rounded-lg"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-medium transition-colors duration-200 ${
                isScrolled
                  ? "text-foreground/80 hover:text-primary"
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <Button variant="contact" size="default" asChild>
            <a href="mailto:manuelmoreira@datuva.es?subject=Solicitud%20de%20demostraci%C3%B3n%20Datuva">
              Solicitar demostración
            </a>
          </Button>
        </div>

        <button
          className={`md:hidden p-2 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
            <Button variant="contact" className="w-full" asChild>
              <a href="mailto:manuelmoreira@datuva.es?subject=Solicitud%20de%20demostraci%C3%B3n%20Datuva">
                Solicitar demostración
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;