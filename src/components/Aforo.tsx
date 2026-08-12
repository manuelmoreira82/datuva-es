/**
 * El aforo: la regla graduada con la que se mide un depósito.
 *
 * Es el índice de la página. Sustituye a la traza de circuito que se usaba antes,
 * que era un recurso decorativo y genérico; esto es un objeto del oficio y además
 * una pantalla real de la app (`/bodega/aforos`).
 *
 * Va pegado al margen izquierdo de cada sección y se dibuja con la tinta que le
 * corresponda al fondo.
 */
const Aforo = ({ oscuro = true }: { oscuro?: boolean }) => {
  const tinta = oscuro ? "#F5F0E8" : "#241C12";
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-6 top-0 hidden w-6 lg:block"
      aria-hidden="true"
    >
      {/* Cuerpo de la regla */}
      <div
        className="absolute bottom-0 left-0 top-0 w-px"
        style={{ background: tinta, opacity: 0.22 }}
      />
      {/* Graduación: marca larga cada cinco, corta el resto. */}
      <div className="absolute inset-y-0 left-0 flex flex-col justify-around py-8">
        {Array.from({ length: 21 }).map((_, i) => (
          <span
            key={i}
            className="block h-px"
            style={{
              width: i % 5 === 0 ? 14 : 7,
              background: tinta,
              opacity: i % 5 === 0 ? 0.4 : 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Aforo;
