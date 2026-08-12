import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Aforo from "@/components/Aforo";

const AnuncioSection = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [conSonido, setConSonido] = useState(false);

  /**
   * El vídeo va incrustado y en automático, sin controles: forma parte de la
   * página, no es una pestaña de reproductor.
   *
   * OJO AL PESO: `datuva-anuncio-web.mp4` son 16 MB. Por eso NO lleva `preload`
   * ni el atributo `autoPlay` — arrancarían la descarga nada más abrir la
   * portada. La fuente se asigna y se reproduce solo cuando la sección entra en
   * pantalla, y se pausa al salir, así quien no baja hasta aquí no paga nada.
   * Aun así conviene comprimirlo:
   *   ffmpeg -i public/datuva-anuncio-web.mp4 -vf "scale=1280:-2" \
   *     -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k \
   *     public/datuva-anuncio-web-ligero.mp4
   */
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          if (!video.getAttribute("src")) video.setAttribute("src", "/datuva-anuncio-web.mp4");
          // Un autoplay rechazado por política del navegador no debe romper nada.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const alternarSonido = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setConSonido(!video.muted);
    if (!video.muted) video.play().catch(() => {});
  };

  return (
    <section id="anuncio" className="relative py-28 md:py-40">
      <Aforo oscuro={false} />

      <div className="container mx-auto px-6 md:px-10 lg:pl-20">
        <EncabezadoSeccion
          codigo="01"
          etiqueta="De la cepa a la copa"
          oscuro={false}
          titulo="Datuva registra cada paso de tu vino"
          descripcion="Del viñedo a la bodega, de la barrica a la copa. Cada trabajo, tratamiento y movimiento, registrado."
          className="mb-14 md:mb-16"
        />

        <div className="relative">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
            <video
              ref={ref}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              loop
              playsInline
              poster="/poster-anuncio.jpg"
              aria-label="Anuncio de Datuva"
            />
          </div>

          {/* Único control: el sonido. Arranca mudo porque ningún navegador
              permite autoplay con audio. */}
          <button
            type="button"
            onClick={alternarSonido}
            aria-pressed={conSonido}
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-[#0B0A14]/70 text-cream backdrop-blur-sm transition-colors hover:bg-[#0B0A14]"
          >
            {conSonido ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="sr-only">
              {conSonido ? "Silenciar el vídeo" : "Activar el sonido del vídeo"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnuncioSection;
