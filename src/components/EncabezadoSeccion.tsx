import { motion } from "framer-motion";

interface EncabezadoSeccionProps {
  /** Código de estación, p. ej. "02". Numera el recorrido, no decora. */
  codigo: string;
  /** Antetítulo corto en mono. */
  etiqueta: string;
  titulo: React.ReactNode;
  descripcion?: React.ReactNode;
  /** `true` sobre fondo negro, `false` sobre cream. */
  oscuro?: boolean;
  className?: string;
}

/**
 * Encabezado de sección anclado a la traza.
 *
 * Antes cada sección repetía el mismo patrón — antetítulo centrado, h2 centrado,
 * párrafo centrado — diez veces seguidas, y por eso ninguna destacaba: todas
 * gritaban igual. Este encabezado va alineado a la izquierda y colgado de la
 * traza con un nodo y su código de estación, de modo que la página se lee como
 * un recorrido numerado y no como diez bloques intercambiables.
 */
const EncabezadoSeccion = ({
  codigo,
  etiqueta,
  titulo,
  descripcion,
  oscuro = true,
  className = "",
}: EncabezadoSeccionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`relative max-w-3xl ${className}`}
  >
    {/* Marca de aforo: la graduación larga señala la sección, como en la regla
        de un depósito. */}
    <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
      <span
        aria-hidden="true"
        className={`h-px w-8 shrink-0 ${oscuro ? "bg-gold" : "bg-[#4A2E1F]"}`}
      />
      <span className={`cifras ${oscuro ? "text-gold" : "text-[#4A2E1F]"}`}>{codigo}</span>
      <span className={oscuro ? "text-cream/50" : "text-[#3A2A16]/70"}>{etiqueta}</span>
    </div>

    <h2
      className={`font-serif text-[2.4rem] font-normal leading-[0.95] tracking-[-0.035em] sm:text-5xl md:text-[3.8rem] ${
        oscuro ? "text-cream" : "text-[#241C12]"
      }`}
    >
      {titulo}
    </h2>

    {descripcion && (
      <p
        className={`mt-5 max-w-xl text-base leading-relaxed md:text-lg ${
          oscuro ? "text-cream/65" : "text-[#3A2A16]/80"
        }`}
      >
        {descripcion}
      </p>
    )}
  </motion.div>
);

export default EncabezadoSeccion;
