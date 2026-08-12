import EncabezadoSeccion from "@/components/EncabezadoSeccion";
import Aforo from "@/components/Aforo";

const DemoAppSection = () => {
  return (
    <section id="demo-app" className="relative overflow-hidden bg-[#0B0A14] py-28 md:py-44">
      <Aforo />

      <div className="container relative z-10 mx-auto px-6 md:px-10 lg:pl-20">
        <EncabezadoSeccion
          codigo="02"
          etiqueta="Demo interactiva · 2 minutos"
          titulo="Esto es lo que vas a usar cada día"
          descripcion="Bodega, campo, embotellado y cumplimiento normativo. Sin Excel y sin papeles."
          className="mb-14 md:mb-16"
        />

        <div className="relative border border-cream/10 bg-[#0e0b06] shadow-2xl">
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              src="/demo/index.html"
              title="Demo interactiva de Datuva"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allow="autoplay"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoAppSection;
