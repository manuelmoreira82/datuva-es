import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DemoAppSection from "@/components/DemoAppSection";
import AnuncioSection from "@/components/AnuncioSection";
import { type SectionCard } from "@/components/ScrollDrivenCards";
import ScrollNarrative from "@/components/ScrollNarrative";
import SectionDetailModal from "@/components/SectionDetailModal";
import CTAFinalSection from "@/components/CTAFinalSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";

import {
  MapPin, BookOpen, Leaf, Sun, Bug, Tractor, CloudRain, FlaskConical, Clock, Euro,
  Grape, Route, User,
  Container, Wine, ArrowRightLeft, ScanLine, QrCode,
  TrendingUp, Bell, History,
  Package, Minus, AlertTriangle, Tag, Archive, Boxes, Globe,
  FileOutput, Users, Truck,
  FileCheck, CalendarDays, ShieldCheck,
  BarChart3, Calculator,
  ClipboardList, ListTodo, IdCard,
  Building2,
} from "lucide-react";

import sectionCampo from "@/assets/section-campo.jpg";
import sectionVendimia from "@/assets/section-vendimia.jpg";
import sectionBodega from "@/assets/section-bodega.jpg";
import sectionLaboratorio from "@/assets/section-laboratorio.jpg";
import sectionEmbotellado from "@/assets/section-embotellado.jpg";
import sectionExpediciones from "@/assets/section-expediciones.jpg";
import sectionNormativa from "@/assets/section-normativa.jpg";
import sectionCostes from "@/assets/section-costes.jpg";

const sections: SectionCard[] = [
  {
    id: "normativa",
    title: "Tu SILICIE se prepara solo desde los movimientos reales de tu bodega.",
    subtitle: "Cumplimiento normativo · SILICIE preparado",
    image: sectionNormativa,
    features: [
      { icon: ShieldCheck, text: "SILICIE preparado automáticamente: cada movimiento de vino genera el asiento contable con su código NC (TARIC). El libro se descarga en el formato oficial de importación de la AEAT, listo para que lo presentes tú o tu gestoría." },
      { icon: CalendarDays, text: "Datos de INFOVI preparados mes a mes y exportables en Excel, CSV y PDF." },
      { icon: BookOpen, text: "Libros JCyL (Orden AGR/1616/2022): elaboración, envasado, etiquetado, entradas y salidas." },
      { icon: AlertTriangle, text: "Alertas de rendimiento, lías, mermas y subproductos fuera de rango." },
    ],
    nota: "Datuva prepara y exporta los libros y declaraciones a partir de los movimientos que registras. La presentación ante la AEAT, la Junta de Castilla y León u otros organismos oficiales, así como la revisión y veracidad de los datos, corresponde a la bodega o a su gestoría.",
  },
  {
    id: "costes",
    title: "Si no sabes tu coste por botella, estás perdiendo dinero.",
    subtitle: "Control de costes",
    image: sectionCostes,
    features: [
      { icon: Euro, text: "Coste de producción desde la uva hasta la botella: uva, tratamientos, materiales, mano de obra, mermas, roturas, costes fijos estructurales." },
      { icon: BarChart3, text: "Coste por litro en cada depósito y barrica en tiempo real." },
      { icon: Calculator, text: "Coste final por botella con desglose completo." },
    ],
  },
  {
    id: "campo",
    title: "Tu viñedo, documentado al detalle",
    subtitle: "Campo y viñedo",
    image: sectionCampo,
    features: [
      { icon: MapPin, text: "Ficha completa de parcelas: variedad, superficie, SIGPAC, polígono, parcela catastral, referencia catastral, año de plantación, sistema de conducción y marco de plantación." },
      { icon: MapPin, text: "Mapa de parcelas con geolocalización." },
      { icon: BookOpen, text: "Cuaderno de campo digital (CUE) conforme al RD 1311/2012: tratamientos fitosanitarios con registro completo del aplicador, nº de carnet, equipo ROMA, inspección ITEAF y plazo de seguridad." },
      { icon: Leaf, text: "Registro de fertilizaciones: producto, dosis, parcela y coste." },
      { icon: Sun, text: "Registro fenológico con escala Eichhorn-Lorenz/Baggiolini y fotografía por parcela." },
      { icon: Bug, text: "Incidencias de campo geolocalizadas con foto y flujo de resolución." },
      { icon: FlaskConical, text: "Inventario de productos fitosanitarios y fertilizantes con control de stock mínimo, lote, caducidad y registro sanitario." },
      { icon: Tractor, text: "Maquinaria de aplicación con número ROMA, inspecciones ITEAF y fechas de renovación." },
      { icon: CloudRain, text: "Datos meteorológicos automáticos vinculados a cada tratamiento y parte de trabajo (temperatura, humedad, viento, precipitación, punto de rocío, presión atmosférica)." },
      { icon: Leaf, text: "Gestión ecológica completa: certificación, organismo certificador, fechas de conversión, auditorías, bloqueo automático de mezcla eco/convencional (Reg. UE 2018/848)." },
      { icon: FlaskConical, text: "Analíticas de maduración por parcela: grado probable, pH y acidez." },
      { icon: Clock, text: "Partes de trabajo de campo con registro de horas, trabajadores, materiales y coste de mano de obra." },
      { icon: Euro, text: "Costes de producción por parcela y campaña: tratamientos, fertilizaciones, mano de obra, maquinaria, kg cosechados y coste por kilo de uva." },
    ],
  },
  {
    id: "vendimia",
    title: "Cada kilo de uva, registrado",
    subtitle: "Vendimia",
    image: sectionVendimia,
    features: [
      { icon: Grape, text: "Registro de entradas de uva por viticultor: kg, grado, pH, temperatura, parcela de origen y depósito de destino." },
      { icon: Route, text: "Trazabilidad completa: parcela → depósito → lote → botella." },
      { icon: User, text: "Viticultores con ficha de contacto, tarjeta del Consejo Regulador y precio por kilo." },
    ],
  },
  {
    id: "bodega",
    title: "Escanea el QR. Sabes todo.",
    subtitle: "Bodega",
    image: sectionBodega,
    features: [
      { icon: Container, text: "Control de depósitos de acero inoxidable, hormigón y fibra de vidrio: capacidad, contenido actual, estado, QR identificativo." },
      { icon: Wine, text: "Gestión de barricas: tipo de madera, capacidad, contenido, fecha de llenado, QR." },
      { icon: ArrowRightLeft, text: "Movimientos de bodega: trasiegos, descubes, mezclas, filtraciones, sangrados, prensados, con trazabilidad completa de litros, origen y destino." },
      { icon: ScanLine, text: "Identificación instantánea de cualquier recipiente escaneando su código QR." },
      { icon: QrCode, text: "Catálogo de vinos con configuración de color, calidad DOP/IGP y código NC automático para SILICIE." },
    ],
  },
  {
    id: "laboratorio",
    title: "Fermentación bajo control",
    subtitle: "Laboratorio",
    image: sectionLaboratorio,
    features: [
      { icon: FlaskConical, text: "Analíticas completas: pH, grado alcohólico, acidez total, acidez volátil, SO₂ libre y total, azúcar residual, densidad, glicerina." },
      { icon: TrendingUp, text: "Lecturas rápidas de fermentación (2-3 veces/día) con gráficos de evolución." },
      { icon: Bell, text: "Alertas automáticas cuando los parámetros se salen de los márgenes configurados." },
      { icon: History, text: "Histórico completo por depósito, vino y añada." },
    ],
  },
  {
    id: "embotellado",
    title: "Embotellas. El stock se actualiza solo.",
    subtitle: "Embotellado y etiquetado",
    image: sectionEmbotellado,
    features: [
      { icon: Package, text: "Control por lotes de embotellado con trazabilidad hasta la parcela de origen." },
      { icon: Minus, text: "Descuento automático de materiales: corchos, botellas, cápsulas." },
      { icon: AlertTriangle, text: "Registro de roturas de material." },
      { icon: Tag, text: "Control de etiquetado: contraetiquetas, precintas del Consejo Regulador, palets." },
      { icon: Archive, text: "Stock de producto terminado: sin etiquetar y etiquetado." },
      { icon: Boxes, text: "Inventario de materiales: corchos, botellas, etiquetas, cápsulas, cajas, precintas." },
      { icon: Globe, text: "E-label conforme al Reglamento UE 2021/2117." },
    ],
  },
  {
    id: "expediciones",
    title: "Cada caja que sale, queda registrada",
    subtitle: "Expediciones",
    image: sectionExpediciones,
    features: [
      { icon: FileOutput, text: "Albaranes de salida: ventas nacionales, intracomunitarias (EMCS), exportación, muestras, catas, autoconsumo." },
      { icon: Users, text: "Gestión de clientes con CAE, SEED EMCS, NIF intracomunitario." },
      { icon: Truck, text: "Transportistas con NIF para documentación fiscal." },
    ],
  },
  {
    id: "rrhh",
    title: "Tu equipo, organizado",
    subtitle: "Recursos humanos",
    image: sectionBodega,
    features: [
      { icon: Clock, text: "Control horario conforme al RD-ley 8/2019." },
      { icon: ClipboardList, text: "Partes de trabajo de bodega y campo." },
      { icon: ListTodo, text: "Órdenes de trabajo asignadas a empleados con prioridad y seguimiento." },
      { icon: CalendarDays, text: "Registro de vacaciones." },
      { icon: IdCard, text: "Carnet de aplicador de fitosanitarios: número, nivel, caducidad y número ROPO." },
    ],
  },
  {
    id: "proveedores",
    title: "Tus proveedores, centralizados",
    subtitle: "Proveedores",
    image: sectionExpediciones,
    features: [
      { icon: Building2, text: "Ficha de proveedores con categorías, condiciones de pago y descuentos." },
    ],
  },
];

const Index = () => {
  const [activeCard, setActiveCard] = useState<SectionCard | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AnuncioSection />
      <DemoAppSection />
      
      <div id="modulos">
        <ScrollNarrative cards={sections} onCardClick={setActiveCard} />
      </div>

      <SectionDetailModal card={activeCard} onClose={() => setActiveCard(null)} />
      
      <CTAFinalSection />
      <Footer />
      <CookieBanner />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
