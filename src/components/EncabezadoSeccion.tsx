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
    <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
      <span
        aria-hidden="true"
        className={`traza-nodo h-1.5 w-1.5 shrink-0 rounded-full ${oscuro ? "bg-gold" : "bg-bordeaux"}`}
      />
      <span className={oscuro ? "text-gold" : "text-bordeaux"}>{codigo}</span>
      <span aria-hidden="true" className="traza-rama h-px w-6" />
      <span className={oscuro ? "text-cream/55" : "text-foreground/55"}>{etiqueta}</span>
    </div>

    <h2
      className={`font-serif text-[2.1rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-4xl md:text-[3.1rem] ${
        oscuro ? "text-cream" : "text-primary"
      }`}
      style={{ fontVariationSettings: '"opsz" 100, "SOFT" 20' }}
    >
      {titulo}
    </h2>

    {descripcion && (
      <p
        className={`mt-5 max-w-xl text-base leading-relaxed md:text-lg ${
          oscuro ? "text-cream/65" : "text-foreground/70"
        }`}
      >
        {descripcion}
      </p>
    )}
  </motion.div>
);

export default EncabezadoSeccion;
