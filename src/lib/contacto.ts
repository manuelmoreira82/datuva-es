/**
 * Contacto directo de Datuva: teléfono y WhatsApp.
 *
 * La web no tiene formulario: el contacto es directo, para que la solicitud
 * llegue al instante al móvil del fundador (aviso de WhatsApp) sin depender de
 * ningún backend ni de correo. Centralizado aquí para no repetir el número en
 * media docena de componentes.
 */
export const TEL_CONTACTO = "+34627130891";
export const TEL_CONTACTO_LEGIBLE = "627 130 891";

const WA_NUMERO = "34627130891";
const WA_MENSAJE_DEMO = "Hola, me gustaría solicitar una demo de Datuva";

/** Enlace a WhatsApp con un mensaje preescrito (por defecto, pedir una demo). */
export const waHref = (mensaje: string = WA_MENSAJE_DEMO) =>
  `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(mensaje)}`;
