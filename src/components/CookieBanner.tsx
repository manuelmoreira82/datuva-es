import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [dataAccepted, setDataAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("datuva-cookies-accepted");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    if (!cookiesAccepted || !dataAccepted) return;
    localStorage.setItem("datuva-cookies-accepted", "true");
    localStorage.setItem("datuva-data-accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const bothChecked = cookiesAccepted && dataAccepted;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-sm border-t border-primary-foreground/10 p-4 animate-fade-in-up">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={cookiesAccepted}
                onCheckedChange={(v) => setCookiesAccepted(v === true)}
                className="mt-0.5 border-primary-foreground/40 data-[state=checked]:bg-gold data-[state=checked]:border-gold data-[state=checked]:text-foreground"
              />
              <span className="text-primary-foreground/80 text-sm">
                Acepto el uso de <strong>cookies técnicas</strong> necesarias para el funcionamiento del sitio.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={dataAccepted}
                onCheckedChange={(v) => setDataAccepted(v === true)}
                className="mt-0.5 border-primary-foreground/40 data-[state=checked]:bg-gold data-[state=checked]:border-gold data-[state=checked]:text-foreground"
              />
              <span className="text-primary-foreground/80 text-sm">
                He leído y acepto la{" "}
                <a href="/privacidad" className="text-gold underline hover:text-gold/80">
                  Política de Privacidad
                </a>{" "}
                y el tratamiento de mis datos.
              </span>
            </label>
          </div>
          <Button
            onClick={handleAccept}
            disabled={!bothChecked}
            className="bg-gold hover:bg-gold/90 text-foreground font-medium px-6 py-2 text-sm whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
