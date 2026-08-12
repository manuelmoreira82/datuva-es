import EncabezadoSeccion from "@/components/EncabezadoSeccion";

const DemoAppSection = () => {
  return (
    <section id="demo-app" className="relative overflow-hidden bg-[#0B0A14] py-24 md:py-32">
      <div className="fondo-reticula pointer-events-none absolute inset-0 opacity-50" />
      <div className="traza-vertical pointer-events-none absolute bottom-0 left-6 top-0 hidden w-px lg:block" />

      <div className="container relative z-10 mx-auto px-6 md:px-10 lg:pl-20">
        <EncabezadoSeccion
          codigo="02"
          etiqueta="Demo interactiva · 2 minutos"
          titulo="Esto es lo que vas a usar cada día"
          descripcion="Bodega, campo, embotellado y cumplimiento normativo. Sin Excel y sin papeles."
          className="mb-12"
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
