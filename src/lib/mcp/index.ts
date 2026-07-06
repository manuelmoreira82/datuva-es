import { defineMcp } from "@lovable.dev/mcp-js";
import listModulesTool from "./tools/list-modules";
import getModuleTool from "./tools/get-module";
import getContactTool from "./tools/get-contact";

export default defineMcp({
  name: "datuva-mcp",
  title: "Datuva MCP",
  version: "0.1.0",
  instructions:
    "Servidor MCP de Datuva, software integral de gestión vitivinícola. Usa list_modules para descubrir las áreas funcionales (cumplimiento SILICIE/INFOVI, campo, vendimia, bodega, laboratorio, embotellado, expediciones, RRHH, costes y proveedores), get_module para el detalle de un módulo concreto y get_contact para los canales oficiales de contacto comercial.",
  tools: [listModulesTool, getModuleTool, getContactTool],
});
