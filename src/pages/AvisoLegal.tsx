import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import datuvaLogo from "@/assets/datuva-logo-new.webp";

const AvisoLegal = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-foreground py-6">
        <div className="container mx-auto px-4">
          <Link to="/" className="flex items-center gap-3 text-primary-foreground hover:opacity-80 transition-opacity w-fit">
            <ArrowLeft className="w-5 h-5" />
            <img src={datuvaLogo} alt="Datuva" className="h-10 w-auto rounded-lg" />
            <span className="font-semibold">Volver a Datuva</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto prose prose-lg prose-slate">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Aviso Legal
          </h1>
          <p className="text-muted-foreground mb-8">
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Datos identificativos del titular</h2>
            <div className="bg-muted/50 p-5 rounded-lg space-y-2">
              <p className="text-foreground/80"><strong>Titular:</strong> Manuel Moreira</p>
              <p className="text-foreground/80"><strong>Nombre comercial:</strong> Datuva</p>
              <p className="text-foreground/80"><strong>Domicilio:</strong> C/ Yedra 3, 24500 Villafranca del Bierzo, León, España</p>
              <p className="text-foreground/80"><strong>Correo electrónico:</strong> manuelmoreira@datuva.es</p>
              <p className="text-foreground/80"><strong>Teléfono:</strong> 627 130 891</p>
              <p className="text-foreground/80"><strong>Sitio web:</strong> www.datuva.es</p>
              <p className="text-foreground/80"><strong>Actividad:</strong> Prestación de servicios de software como servicio (SaaS) para la gestión integral de bodegas.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Objeto</h2>
            <p className="text-foreground/80 leading-relaxed">
              El presente aviso legal regula el uso del sitio web <strong>www.datuva.es</strong>, del que es titular Manuel Moreira (en adelante, "el titular"). La navegación por el sitio web atribuye la condición de usuario e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este aviso legal.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Propiedad intelectual e industrial</h2>
            <p className="text-foreground/80 leading-relaxed">
              El sitio web, incluyendo a título enunciativo pero no limitativo su programación, edición, compilación y demás elementos necesarios para su funcionamiento, los diseños, logotipos, texto, fotografías y/o gráficos, son propiedad del titular o, en su caso, dispone de licencia o autorización expresa por parte de los autores.
            </p>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Todos los contenidos del sitio web se encuentran debidamente protegidos por la normativa de propiedad intelectual e industrial, así como inscritos en los registros públicos correspondientes. Independientemente de la finalidad para la que fueran destinados, la reproducción total o parcial, uso, explotación, distribución y comercialización requiere en todo caso la autorización escrita previa por parte del titular.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Condiciones de uso</h2>
            <p className="text-foreground/80 leading-relaxed">
              El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que Datuva ofrece a través de su sitio web y, con carácter enunciativo pero no limitativo, a no emplearlos para:
            </p>
            <ul className="list-disc pl-6 text-foreground/80 space-y-2 mt-3">
              <li>Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
              <li>Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico, de apología del terrorismo o atentatorio contra los derechos humanos.</li>
              <li>Provocar daños en los sistemas físicos y lógicos del titular, de sus proveedores o de terceras personas.</li>
              <li>Introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Exclusión de garantías y responsabilidad</h2>
            <p className="text-foreground/80 leading-relaxed">
              El titular no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Enlaces externos</h2>
            <p className="text-foreground/80 leading-relaxed">
              El sitio web puede contener enlaces (links) a otros sitios de Internet. El titular no asume ninguna responsabilidad por el contenido que pueda aparecer en páginas de terceros. Los enlaces que aparecen en esta web tienen finalidad meramente informativa y en ningún caso implican sugerencia, invitación o recomendación sobre los mismos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Protección de datos</h2>
            <p className="text-foreground/80 leading-relaxed">
              Para todo lo relativo al tratamiento de datos personales, consulte nuestra{" "}
              <Link to="/privacidad" className="text-primary hover:underline">Política de Privacidad</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Legislación aplicable y jurisdicción</h2>
            <p className="text-foreground/80 leading-relaxed">
              Para la resolución de todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él desarrolladas, será de aplicación la legislación española, a la que se someten expresamente las partes, siendo competentes para la resolución de todos los conflictos derivados o relacionados con su uso los Juzgados y Tribunales de Ponferrada (León).
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

export default AvisoLegal;
