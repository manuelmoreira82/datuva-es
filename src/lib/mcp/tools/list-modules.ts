import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const modules = [
  { id: "normativa", title: "Cumplimiento normativo · SILICIE automático", description: "SILICIE, INFOVI, libros JCYL y alertas de rendimiento/mermas." },
  { id: "costes", title: "Control de costes", description: "Coste por litro, por depósito y por botella con desglose completo." },
  { id: "campo", title: "Campo y viñedo", description: "Parcelas SIGPAC, cuaderno de campo digital (RD 1311/2012), fitosanitarios, fenología, ecológico (Reg. UE 2018/848)." },
  { id: "vendimia", title: "Vendimia", description: "Entradas de uva por viticultor con trazabilidad parcela → depósito → lote → botella." },
  { id: "bodega", title: "Bodega", description: "Depósitos y barricas con QR, movimientos, catálogo de vinos con código NC." },
  { id: "laboratorio", title: "Laboratorio", description: "Analíticas completas, seguimiento de fermentación y alertas." },
  { id: "embotellado", title: "Embotellado y etiquetado", description: "Lotes, descuento automático de materiales, e-label (Reg. UE 2021/2117)." },
  { id: "expediciones", title: "Expediciones", description: "Albaranes nacionales, EMCS intracomunitario y exportación." },
  { id: "rrhh", title: "Recursos humanos", description: "Control horario (RD-ley 8/2019), partes de trabajo, carnets ROPO." },
  { id: "proveedores", title: "Proveedores", description: "Ficha centralizada con condiciones de pago." },
];

export default defineTool({
  name: "list_modules",
  title: "Listar módulos de Datuva",
  description: "Devuelve la lista de módulos funcionales del software vitivinícola Datuva con id, título y descripción breve.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(modules, null, 2) }],
    structuredContent: { modules },
  }),
});

export { modules };
