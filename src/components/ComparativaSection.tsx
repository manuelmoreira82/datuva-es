import { Check, X, Minus } from "lucide-react";
import Aforo from "@/components/Aforo";
import EncabezadoSeccion from "@/components/EncabezadoSeccion";

const rows = [
  { feature: "Movimientos con validación QR", excel: "no", erp: "no", datuva: "yes" },
  { feature: "Libro SILICIE en formato oficial AEAT", excel: "no", erp: "no", datuva: "yes" },
  { feature: "Libros JCyL preparados", excel: "no", erp: "no", datuva: "yes" },
  { feature: "Datos de INFOVI preparados", excel: "no", erp: "no", datuva: "yes" },
  { feature: "Cuaderno de campo digital", excel: "no", erp: "partial", datuva: "yes" },
  { feature: "Trazabilidad viñedo → botella", excel: "no", erp: "partial", datuva: "yes" },
  { feature: "Stock en tiempo real", excel: "no", erp: "yes", datuva: "yes" },
  { feature: "Diseñado para bodegas españolas", excel: "no", erp: "no", datuva: "yes" },
  { feature: "Implantación in situ con QRs", excel: "no", erp: "no", datuva: "yes" },
];

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "yes") return <Check className="w-5 h-5 mx-auto text-[#8FBF7A]" />;
  if (status === "partial") return <Minus className="w-5 h-5 text-gold mx-auto" />;
  return <X className="w-5 h-5 mx-auto text-cream/25" />;
};

const ComparativaSection = () => {
  return (
    <section id="comparativa" className="relative py-28 text-cream md:py-44">
      <Aforo />
      <div className="container relative mx-auto px-6 md:px-10 lg:pl-20">
        <EncabezadoSeccion
          codigo="05"
          etiqueta="Comparativa"
          titulo={
            <>
              No es lo mismo un Excel que{" "}
              <span className="italic text-gold">una herramienta profesional.</span>
            </>
          }
          className="mb-16 md:mb-20"
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-cream/25">
                <th className="text-left py-4 pr-4 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/50">
                  Funcionalidad
                </th>
                <th className="py-4 px-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-cream/50 w-28">
                  Excel
                </th>
                <th className="py-4 px-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-cream/50 w-28">
                  ERP genérico
                </th>
                <th className="w-28 px-4 py-4 text-center font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-gold">
                  Datuva
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-cream/10 transition-colors hover:bg-cream/[0.04]"
                >
                  <td className="py-4 pr-4 text-sm text-cream/85">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4">
                    <StatusIcon status={row.excel} />
                  </td>
                  <td className="py-4 px-4">
                    <StatusIcon status={row.erp} />
                  </td>
                  <td className="py-4 px-4 bg-primary/5 first:rounded-t-lg last:rounded-b-lg">
                    <StatusIcon status={row.datuva} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparativaSection;
