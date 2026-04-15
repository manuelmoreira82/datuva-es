import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import datuvaLogo from "@/assets/datuva-logo-new.webp";

const Privacidad = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground py-6">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center gap-3 text-primary-foreground hover:opacity-80 transition-opacity w-fit">
            <ArrowLeft className="w-5 h-5" />
            <img src={datuvaLogo} alt="Datuva" className="h-10 w-auto rounded-lg" />
            <span className="font-semibold">Volver a Datuva</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto prose prose-lg prose-slate">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Política de Privacidad
          </h1>
          <p className="text-muted-foreground mb-8">
            Última actualización: Enero 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Responsable del Tratamiento</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              A efectos del Reglamento General de Protección de Datos (RGPD) y la normativa española de protección de datos:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg my-4">
              <p className="text-foreground/80"><strong>Identidad:</strong> Manuel Moreira / Datuva</p>
              <p className="text-foreground/80"><strong>Correo electrónico:</strong> Manuelmoreira@datuva.es</p>
              <p className="text-foreground/80"><strong>Ubicación:</strong> El Bierzo, León, España</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Roles en el Tratamiento de Datos (RGPD)</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              La relación entre Datuva y las bodegas usuarias del servicio se estructura de la siguiente manera:
            </p>
            
            <div className="bg-vineyard/10 border-l-4 border-vineyard p-4 my-4">
              <h3 className="font-semibold text-foreground mb-2">La Bodega (Cliente)</h3>
              <p className="text-foreground/80 text-sm">
                Actúa como <strong>RESPONSABLE DEL TRATAMIENTO</strong> de los datos personales de sus propios clientes, proveedores, empleados y cualquier tercero cuyos datos introduzca en el sistema Datuva.
              </p>
            </div>

            <div className="bg-gold/10 border-l-4 border-gold p-4 my-4">
              <h3 className="font-semibold text-foreground mb-2">Datuva</h3>
              <p className="text-foreground/80 text-sm">
                Actúa como <strong>ENCARGADO DEL TRATAMIENTO</strong>, procesando los datos únicamente según las instrucciones del Responsable (la Bodega) y exclusivamente para la prestación del servicio contratado.
              </p>
            </div>

            <p className="text-foreground/80 leading-relaxed mt-4">
              Esta distinción implica que la Bodega mantiene el control y la responsabilidad última sobre los datos personales, mientras que Datuva proporciona las garantías técnicas y organizativas necesarias para su tratamiento seguro.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Datos que Recopilamos</h2>
            
            <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3.1 Datos de los usuarios de Datuva (Bodegas)</h3>
            <ul className="list-disc pl-6 text-foreground/80 space-y-2">
              <li>Nombre y apellidos del contacto</li>
              <li>Correo electrónico corporativo</li>
              <li>Nombre de la bodega</li>
              <li>Datos de facturación</li>
              <li>Información de uso del servicio (logs, preferencias)</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3.2 Datos introducidos por las Bodegas</h3>
            <p className="text-foreground/80 leading-relaxed">
              Los datos de producción, empleados, proveedores y clientes que las bodegas introduzcan en Datuva son tratados por cuenta del Responsable (la Bodega) y conforme a sus instrucciones.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Finalidad del Tratamiento</h2>
            <ul className="list-disc pl-6 text-foreground/80 space-y-2">
              <li>Prestación del servicio SaaS de gestión de bodega</li>
              <li>Gestión de la relación contractual y facturación</li>
              <li>Comunicaciones relacionadas con el servicio</li>
              <li>Mejora del producto y soporte técnico</li>
              <li>Cumplimiento de obligaciones legales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Base Legal del Tratamiento</h2>
            <ul className="list-disc pl-6 text-foreground/80 space-y-2">
              <li><strong>Ejecución del contrato:</strong> El tratamiento es necesario para la prestación del servicio contratado.</li>
              <li><strong>Interés legítimo:</strong> Mejora del servicio y prevención de fraude.</li>
              <li><strong>Obligación legal:</strong> Cumplimiento de normativa fiscal y mercantil.</li>
              <li><strong>Consentimiento:</strong> Para comunicaciones comerciales opcionales.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Conservación de Datos</h2>
            <p className="text-foreground/80 leading-relaxed">
              Los datos se conservarán mientras dure la relación contractual y, posteriormente, durante los plazos legales de prescripción aplicables. Los datos de producción introducidos por las bodegas se mantendrán disponibles para exportación durante 30 días tras la finalización del contrato.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Medidas de Seguridad</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Datuva implementa medidas técnicas y organizativas apropiadas, incluyendo:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 space-y-2">
              <li>Cifrado de datos en tránsito y en reposo</li>
              <li>Control de acceso basado en roles</li>
              <li>Copias de seguridad automáticas</li>
              <li>Monitorización de seguridad</li>
              <li>Sincronización segura en modo offline</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Derechos de los Interesados</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a{" "}
              <a href="mailto:Manuelmoreira@datuva.es" className="text-primary hover:underline">
                Manuelmoreira@datuva.es
              </a>.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si consideras que el tratamiento no se ajusta a la normativa.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Transferencias Internacionales</h2>
            <p className="text-foreground/80 leading-relaxed">
              Los datos se alojan en servidores ubicados en la Unión Europea. En caso de que fuera necesaria alguna transferencia internacional, se realizaría únicamente a países con decisión de adecuación o con las garantías apropiadas según el RGPD.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">10. Cookies</h2>
            <p className="text-foreground/80 leading-relaxed">
              Este sitio web utiliza cookies técnicas necesarias para el funcionamiento del servicio. Puedes consultar nuestra política de cookies para más información sobre los tipos de cookies utilizadas.
            </p>
          </section>

          <section className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Para cualquier consulta sobre privacidad, contacta con nosotros en{" "}
              <a href="mailto:Manuelmoreira@datuva.es" className="text-primary hover:underline">
                Manuelmoreira@datuva.es
              </a>
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Privacidad;
