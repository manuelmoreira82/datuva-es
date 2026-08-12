import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Aforo from "@/components/Aforo";

const AnuncioSection = () => {
  return (
    <section id="anuncio" className="relative bg-background py-20 md:py-28">
      {/* Primer respiro en cream después del hero: el vídeo destaca más sobre
          claro, y rompe la cadena de secciones oscuras. */}
      <Aforo oscuro={false} />

      <div className="container mx-auto px-6 md:px-10 lg:pl-20">
        <EncabezadoSeccion
          codigo="01"
          etiqueta="De la cepa a la copa"
          oscuro={false}
          titulo="Datuva registra cada paso de tu vino"
          descripcion="Del viñedo a la bodega, de la barrica a la copa. Cada trabajo, tratamiento y movimiento, registrado."
          className="mb-12"
        />

        <div className="relative overflow-hidden border border-primary/15 bg-[#0b0e18] shadow-2xl">
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <video
              className="absolute inset-0 h-full w-full"
              controls
              playsInline
              preload="metadata"
              poster="/poster-anuncio.jpg"
            >
              <source src="/datuva-anuncio-web.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnuncioSection;
