import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

/**
 * Botón flotante de WhatsApp.
 *
 * Va en dorado, no en el verde de Meta: sobre la paleta negro/dorado/vino el
 * #25D366 era el elemento más saturado de toda la página. Y solo aparece una vez
 * pasado el hero, donde antes tapaba el botón "Explorar plataforma".
 */
const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alHacerScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    alHacerScroll();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    return () => window.removeEventListener("scroll", alHacerScroll);
  }, []);

  return (
    <a
      href="https://wa.me/34627130891?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20demo%20de%20Datuva"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A227] text-[#0B0A14] shadow-lg shadow-black/25 transition-all duration-300 hover:scale-110 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
