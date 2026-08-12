import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

const PoliticaCookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-foreground py-6">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center gap-3 text-primary-foreground hover:opacity-80 transition-opacity w-fit">
            <ArrowLeft className="w-5 h-5" />
            <Logo className="h-8" />
            <span className="font-semibold">Volver al inicio</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto prose prose-lg prose-slate">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Política de Cookies
          </h1>
          <p className="text-muted-foreground mb-8">
            Última actualización: Abril 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. ¿Qué son las cookies?</h2>
            <p className="text-foreground/80 leading-relaxed">
              Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario (ordenador, tablet o teléfono móvil) cuando los visita. Permiten que el sitio web recuerde información sobre su visita, como su idioma preferido y otras opciones, facilitando la siguiente visita y haciendo que el sitio sea más útil.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. ¿Qué tipos de cookies utilizamos?</h2>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.1 Cookies técnicas (necesarias)</h3>
            <p className="text-foreground/80 leading-relaxed mb-3">
              Son aquellas que permiten al usuario la navegación a través del sitio web y la utilización de las diferentes opciones o servicios que en ella existen. Incluyen:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 space-y-2">
              <li><strong>Cookies de sesión:</strong> Permiten gestionar y controlar la sesión del usuario.</li>
              <li><strong>Cookies de preferencias:</strong> Almacenan las preferencias del usuario, como la aceptación de cookies y uso de datos.</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.2 Cookies analíticas</h3>
            <p className="text-foreground/80 leading-relaxed">
              Actualmente este sitio web <strong>no utiliza cookies analíticas</strong> de terceros (Google Analytics, etc.). En caso de incorporarlas en el futuro, se actualizará esta política y se solicitará el consentimiento previo del usuario.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Cookies utilizadas en este sitio</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-foreground font-semibold">Cookie</th>
                    <th className="text-left p-3 text-foreground font-semibold">Tipo</th>
                    <th className="text-left p-3 text-foreground font-semibold">Duración</th>
                    <th className="text-left p-3 text-foreground font-semibold">Finalidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-foreground/80">datuva-cookies-accepted</td>
                    <td className="p-3 text-foreground/80">Técnica</td>
                    <td className="p-3 text-foreground/80">Persistente</td>
                    <td className="p-3 text-foreground/80">Registra la aceptación de cookies técnicas</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 text-foreground/80">datuva-data-accepted</td>
                    <td className="p-3 text-foreground/80">Técnica</td>
                    <td className="p-3 text-foreground/80">Persistente</td>
                    <td className="p-3 text-foreground/80">Registra la aceptación de la política de privacidad</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. ¿Cómo gestionar las cookies?</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Al acceder al sitio web por primera vez, se mostrará un banner informativo sobre el uso de cookies donde podrá aceptar o rechazar su uso. También puede configurar su navegador para aceptar o rechazar todas las cookies, o para que le avise cuando un sitio web intente establecer una cookie:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 space-y-2">
              <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
              <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
              <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web</li>
              <li><strong>Microsoft Edge:</strong> Configuración → Cookies y permisos del sitio</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Tenga en cuenta que si desactiva las cookies, algunas funcionalidades del sitio web podrían no estar disponibles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Base legal</h2>
            <p className="text-foreground/80 leading-relaxed">
              El uso de cookies técnicas se ampara en el interés legítimo del titular del sitio web para garantizar el correcto funcionamiento del servicio (artículo 22.2 de la LSSI-CE). Para cualquier otro tipo de cookie que pueda incorporarse en el futuro, se solicitará el consentimiento expreso del usuario conforme al Reglamento General de Protección de Datos (RGPD).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Actualizaciones</h2>
            <p className="text-foreground/80 leading-relaxed">
              Esta política de cookies puede ser actualizada en función de exigencias legislativas, reglamentarias o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos.
            </p>
          </section>

          <section className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Para cualquier consulta, contacta con nosotros en{" "}
              <a href="mailto:manuelmoreira@datuva.es" className="text-primary hover:underline">
                manuelmoreira@datuva.es
              </a>
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default PoliticaCookies;
