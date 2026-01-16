import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("datuva-cookies-accepted");
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("datuva-cookies-accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-sm border-t border-primary-foreground/10 p-4 animate-fade-in-up">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-primary-foreground/80 text-sm text-center sm:text-left">
          Usamos cookies técnicas para que la app funcione correctamente. Al continuar navegando, aceptas su uso.
        </p>
        <Button
          onClick={acceptCookies}
          className="bg-gold hover:bg-gold/90 text-foreground font-medium px-6 py-2 text-sm whitespace-nowrap"
        >
          Aceptar
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
