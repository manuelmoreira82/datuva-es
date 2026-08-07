/**
 * Definición de un módulo de la plataforma. La usan la rejilla del bento
 * (ModulosBento), el modal de detalle (SectionDetailModal) y la home (Index).
 *
 * Vivía dentro de ScrollDrivenCards.tsx, un componente que ya no se usaba:
 * de ese archivo solo se importaba este tipo.
 */
export interface SectionCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  features: { icon: React.ComponentType<{ className?: string }>; text: string }[];
  /** Aclaración legal opcional que se muestra en letra pequeña bajo las features. */
  nota?: string;
  /** Frase corta para la tarjeta del bento. Si falta, se usa la primera feature. */
  resumen?: string;
  /** Captura real de la app. Las tarjetas que la tienen ocupan el doble de ancho. */
  captura?: string;
  /** Icono de la tarjeta en el bento. */
  icono?: React.ComponentType<{ className?: string }>;
}
