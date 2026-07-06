import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { modules } from "./list-modules";

export default defineTool({
  name: "get_module",
  title: "Detalle de un módulo",
  description: "Devuelve el detalle de un módulo concreto de Datuva por su id.",
  inputSchema: {
    id: z.string().describe("Identificador del módulo (p. ej. 'normativa', 'campo', 'bodega')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const found = modules.find((m) => m.id === id);
    if (!found) {
      return { content: [{ type: "text", text: `Módulo no encontrado: ${id}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(found, null, 2) }],
      structuredContent: found,
    };
  },
});
