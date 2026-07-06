import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact",
  title: "Datos de contacto de Datuva",
  description: "Devuelve los canales oficiales de contacto para solicitar demo o información comercial de Datuva.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const contact = {
      name: "Manuel Moreira",
      email: "manuelmoreira@datuva.es",
      whatsapp: "+34 627 130 891",
      website: "https://datuva.es",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
      structuredContent: contact,
    };
  },
});
