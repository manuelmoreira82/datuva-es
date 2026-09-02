import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Aviso de cookies — informativo.
 *
 * La web solo usa almacenamiento técnico necesario (este propio aviso y, en su
 * caso, preferencias de interfaz); no hay analítica ni cookies de terceros. Ese
 * almacenamiento está exento de consentimiento (art. 22.2 LSSI-CE), así que el
 * banner solo informa: ni casillas obligatorias, ni condicionar la navegación.
 *
 * Si algún día se añade analítica (Cloudflare, GA, etc.), aquí hará falta un
 * banner con Aceptar / Rechazar / Configurar en igualdad, y actualizar la
 * Política de Cookies.
 */
const CLAVE_AVISO = "datuva-cookies-accepted";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CLAVE_AVISO)) setIsVisible(true);
    } catch {
      /* almacenamiento no disponible (modo privado, etc.): no mostramos nada */
    }
  }, []);

  const cerrar = () => {
    try {
      localStorage.setItem(CLAVE_AVISO, "true");
    } catch {
      /* si no se puede guardar, al menos ocultamos el aviso en esta sesión */
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-sm border-t border-primary-foreground/10 p-4 animate-fade-in-up">
      <div className="container mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-primary-foreground/80 text-sm max-w-3xl">
          Usamos únicamente <strong>almacenamiento técnico necesario</strong> para el
          funcionamiento del sitio. No usamos cookies de analítica ni de publicidad.
          Más información en la{" "}
          <a href="/politica-cookies" className="text-gold underline hover:text-gold/80">
            Política de Cookies
          </a>{" "}
          y la{" "}
          <a href="/privacidad" className="text-gold underline hover:text-gold/80">
            Política de Privacidad
          </a>
          .
        </p>
        <Button
          onClick={cerrar}
          className="bg-gold hover:bg-gold/90 text-foreground font-medium px-6 py-2 text-sm whitespace-nowrap"
        >
          Entendido
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
