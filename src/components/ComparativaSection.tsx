import { Check, X, Minus } from "lucide-react";

const rows = [
  { feature: "Movimientos con validación QR", excel: "no", erp: "no", datuva: "yes" },
  { feature: "Libro SILICIE en formato oficial AEAT", excel: "no", erp: "no", datuva: "yes" },
  { feature: "Libros JCyL preparados", excel: "no", erp: "no", datuva: "yes" },
  { feature: "Datos de INFOVI preparados", excel: "no", erp: "no", datuva: "yes" },
  { feature: "Cuaderno de campo digital", excel: "no", erp: "partial", datuva: "yes" },
  { feature: "Modo offline real", excel: "partial", erp: "no", datuva: "yes" },
  { feature: "Trazabilidad viñedo → botella", excel: "no", erp: "partial", datuva: "yes" },
  { feature: "Stock en tiempo real", excel: "no", erp: "yes", datuva: "yes" },
  { feature: "Diseñado para bodegas españolas", excel: "no", erp: "no", datuva: "yes" },
  { feature: "Implantación in situ con QRs", excel: "no", erp: "no", datuva: "yes" },
];

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "yes") return <Check className="w-5 h-5 text-vineyard mx-auto" />;
  if (status === "partial") return <Minus className="w-5 h-5 text-gold mx-auto" />;
  return <X className="w-5 h-5 text-destructive/60 mx-auto" />;
};

const ComparativaSection = () => {
  return (
    <section id="comparativa" className="py-24 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Comparativa
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            No es lo mismo un Excel que{" "}
            <span className="text-primary">una herramienta profesional.</span>
          </h2>
        </div>

        {/* Table */}
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-4 pr-4 text-muted-foreground font-medium text-sm">
                  Funcionalidad
                </th>
                <th className="py-4 px-4 text-center text-muted-foreground font-medium text-sm w-28">
                  Excel
                </th>
                <th className="py-4 px-4 text-center text-muted-foreground font-medium text-sm w-28">
                  ERP genérico
                </th>
                <th className="py-4 px-4 text-center font-bold text-sm w-28 text-primary">
                  Datuva
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border/50 hover:bg-background/50 transition-colors"
                >
                  <td className="py-4 pr-4 text-foreground text-sm font-medium">
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
