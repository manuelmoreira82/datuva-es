import { motion } from "framer-motion";
import Aforo from "@/components/Aforo";
import { Clock, Ban, Scale, Brain } from "lucide-react";
import EncabezadoSeccion from "@/components/EncabezadoSeccion";

const costes = [
  {
    icon: Clock,
    value: "16+",
    unidad: "horas/mes",
    label: "Tiempo perdido en tareas administrativas manuales",
  },
  {
    icon: Ban,
    value: "2.000–10.000",
    unidad: "euros",
    label: "Coste potencial de un error en SILICIE o trazabilidad",
  },
  {
    icon: Scale,
    value: "30.000",
    unidad: "euros, hasta",
    label: "Sanción por incumplimiento normativo en inspección",
  },
  {
    icon: Brain,
    value: "—",
    unidad: "incalculable",
    label: "Decisiones tomadas sin datos fiables ni históricos",
  },
];

/**
 * La sección del coste de no digitalizar. Las cifras son el argumento, así que
 * mandan en la composición: van en display grande y con cifras tabulares, no
 * escondidas dentro de cuatro tarjetas iguales y centradas.
 */
const ROISection = () => {
  return (
    <section className="relative overflow-hidden py-28 text-cream md:py-44">
      <Aforo />

      <div className="container relative z-10 mx-auto px-6 md:px-10 lg:pl-20">
        <EncabezadoSeccion
          codigo="04"
          etiqueta="Retorno de inversión"
          titulo={
            <>
              Lo que cuesta{" "}
              <span className="italic text-gold">no digitalizar tu bodega.</span>
            </>
          }
          descripcion="Datuva cuesta menos que una jornada administrativa mal empleada."
          className="mb-16 md:mb-24"
        />

        {/* Cifras en fila, separadas por hairlines: se leen como el renglón de un
            libro de cuentas, que es de lo que hablan. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {costes.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col border border-mosto/20 bg-barrica-oscura p-7 md:p-9"
            >
              <c.icon className="mb-6 h-5 w-5 text-gold/70" aria-hidden="true" />
              <div
                className="cifras font-serif text-[2.4rem] font-normal leading-none tracking-[-0.02em] text-gold md:text-[2.9rem]"
              >
                {c.value}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/45">
                {c.unidad}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-cream/60">{c.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 max-w-2xl text-lg leading-relaxed text-cream/75"
        >
          Con Datuva, desde{" "}
          <span className="cifras font-semibold text-gold">150 €/mes</span>{" "}
          eliminas el riesgo, recuperas horas y tomas decisiones con datos reales.
          No es un gasto, es la inversión más rentable de tu bodega.
        </motion.p>
      </div>
    </section>
  );
};

export default ROISection;
