import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import datuvaLogo from "@/assets/datuva-logo.jpg";

const Terminos = () => {
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
            Términos y Condiciones de Uso
          </h1>
          <p className="text-muted-foreground mb-8">
            Última actualización: Enero 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Naturaleza del Servicio</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Datuva es una <strong>Herramienta de Software como Servicio (SaaS)</strong> diseñada para la gestión integral de bodegas y viñedos. El presente contrato otorga al usuario una <strong>licencia de uso temporal y no exclusiva</strong> del software, sin que en ningún caso se transfiera la propiedad del mismo.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Datuva <strong>NO constituye un servicio de asesoría fiscal, gestoría administrativa, ni consultoría legal</strong>. El software proporciona herramientas tecnológicas para facilitar la gestión operativa, pero no sustituye el criterio profesional de asesores fiscales, contables o legales debidamente cualificados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Limitación de Responsabilidad</h2>
            <div className="bg-destructive/10 border-l-4 border-destructive p-4 my-6">
              <p className="text-foreground font-semibold uppercase text-sm leading-relaxed">
                DATUVA PROPORCIONA LAS HERRAMIENTAS PARA LA GENERACIÓN DE LIBROS SILICIE Y OTROS REGISTROS OFICIALES, PERO LA VERACIDAD, REVISIÓN Y PRESENTACIÓN DE LOS DATOS ANTE LA AGENCIA TRIBUTARIA (AEAT), CONSEJERÍAS DE AGRICULTURA U OTROS ORGANISMOS OFICIALES ES RESPONSABILIDAD EXCLUSIVA DE LA BODEGA.
              </p>
              <p className="text-foreground font-semibold uppercase text-sm leading-relaxed mt-3">
                DATUVA NO SE HACE RESPONSABLE DE SANCIONES ADMINISTRATIVAS, MULTAS, LUCRO CESANTE, PÉRDIDAS DE PRODUCTO, DAÑOS REPUTACIONALES O CUALQUIER OTRO PERJUICIO DERIVADO DEL USO DEL SOFTWARE O DE LA INCORRECTA INTRODUCCIÓN DE DATOS POR PARTE DEL USUARIO.
              </p>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              El usuario reconoce que es su obligación verificar la exactitud de todos los datos introducidos en el sistema antes de su presentación ante cualquier organismo oficial.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Tope de Indemnización</h2>
            <p className="text-foreground/80 leading-relaxed">
              En caso de que, por cualquier circunstancia, se determinase alguna responsabilidad imputable a Datuva, la <strong>responsabilidad contractual máxima</strong> quedará limitada, en todo caso, al importe equivalente a <strong>doce (12) mensualidades del servicio efectivamente abonadas</strong> por el cliente en los doce meses anteriores al hecho causante.
            </p>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Esta limitación no será aplicable en casos de dolo o negligencia grave por parte de Datuva.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Propiedad Intelectual e Industrial</h2>
            <p className="text-foreground/80 leading-relaxed">
              Todo el código fuente, diseño, interfaz de usuario, algoritmos, bases de datos, documentación técnica, marcas, logotipos y cualquier otro elemento que forme parte de Datuva son <strong>propiedad exclusiva de Manuel Moreira y/o Datuva</strong>.
            </p>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación, ingeniería inversa o cualquier otra forma de explotación no autorizada del software o sus componentes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Licencia de Uso</h2>
            <p className="text-foreground/80 leading-relaxed">
              La suscripción a Datuva otorga al usuario una licencia:
            </p>
            <ul className="list-disc pl-6 mt-3 text-foreground/80 space-y-2">
              <li><strong>Temporal:</strong> Vigente mientras se mantenga activa la suscripción.</li>
              <li><strong>No exclusiva:</strong> Datuva puede licenciar el software a otros usuarios.</li>
              <li><strong>Intransferible:</strong> El usuario no puede ceder, sublicenciar o transferir su licencia a terceros.</li>
              <li><strong>Limitada:</strong> Exclusivamente para uso interno de la bodega contratante.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Disponibilidad del Servicio</h2>
            <p className="text-foreground/80 leading-relaxed">
              Datuva se compromete a mantener una disponibilidad del servicio del 99% mensual, excluyendo mantenimientos programados y causas de fuerza mayor. El modo offline permite el funcionamiento básico sin conexión, sincronizando los datos cuando se restablezca la conectividad.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Modificaciones</h2>
            <p className="text-foreground/80 leading-relaxed">
              Datuva se reserva el derecho de modificar estos términos y condiciones. Los cambios sustanciales serán notificados a los usuarios con al menos 30 días de antelación a su entrada en vigor.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Legislación Aplicable y Jurisdicción</h2>
            <p className="text-foreground/80 leading-relaxed">
              El presente contrato se rige por la legislación española. Para cualquier controversia derivada del mismo, las partes se someten a los Juzgados y Tribunales de Ponferrada (León), con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>

          <section className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Para cualquier consulta sobre estos términos, contacta con nosotros en{" "}
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

export default Terminos;
