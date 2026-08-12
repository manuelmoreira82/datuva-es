import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Aforo from "@/components/Aforo";

const AnuncioSection = () => {
  return (
    <section id="anuncio" className="relative bg-[#0B0A14] py-28 md:py-40">
      <Aforo />

      <div className="container mx-auto px-6 md:px-10 lg:pl-20">
        <EncabezadoSeccion
          codigo="01"
          etiqueta="De la cepa a la copa"
          titulo="Datuva registra cada paso de tu vino"
          descripcion="Del viñedo a la bodega, de la barrica a la copa. Cada trabajo, tratamiento y movimiento, registrado."
          className="mb-14 md:mb-16"
        />

        <div className="relative overflow-hidden border border-mosto/25 bg-barrica-oscura shadow-2xl">
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
