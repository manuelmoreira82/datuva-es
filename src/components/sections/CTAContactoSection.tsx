import { useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import DensityCurve from "@/components/DensityCurve";

const tramos = [
  "Menos de 50 000 botellas/año",
  "50 000 – 150 000 botellas/año",
  "150 000 – 400 000 botellas/año",
  "Más de 400 000 botellas/año",
];

const CTAContactoSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nombre = f.get("nombre");
    const bodega = f.get("bodega");
    const telefono = f.get("telefono");
    const tramo = f.get("tramo");
    const body = encodeURIComponent(
      `Hola Manuel,\n\nMe gustaría reservar una demo de Datuva.\n\nNombre: ${nombre}\nBodega: ${bodega}\nTeléfono: ${telefono}\nVolumen aproximado: ${tramo}\n\nGracias.`
    );
    window.location.href = `mailto:manuelmoreira@datuva.es?subject=${encodeURIComponent(
      "Solicitud de demo Datuva"
    )}&body=${body}`;
    setSubmitted(true);
  };

  const wapp =
    "https://wa.me/34627130891?text=" +
    encodeURIComponent("Hola Manuel, me gustaría reservar una demo de Datuva.");

  return (
    <section id="contacto" className="bg-carbon text-cream py-24 md:py-36 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, hsl(var(--mostaza)) 0, transparent 45%), radial-gradient(circle at 10% 90%, hsl(var(--vino)) 0, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Mensaje */}
          <div className="lg:col-span-6">
            <p className="text-mostaza text-xs tracking-[0.3em] uppercase mb-6">
              Hablamos
            </p>
            <h2 className="font-display font-medium leading-[1.02] tracking-[-0.02em] text-balance text-[2.3rem] sm:text-5xl md:text-6xl lg:text-[4.5rem]">
              ¿Hablamos antes de la <span className="italic text-mostaza">vendimia</span>?
            </h2>
            <p className="mt-8 text-cream/70 text-base md:text-lg leading-relaxed max-w-xl">
              Una llamada de 20 minutos. Te enseño la app con tu bodega en mente
              y te digo si te encaja. Sin compromiso.
            </p>

            <div className="mt-10 text-mostaza">
              <DensityCurve color="hsl(var(--mostaza))" strokeWidth={1.5} height={80} showLabels />
            </div>

            <div className="mt-10 space-y-4 text-cream/80">
              <a
                href="tel:+34627130891"
                className="flex items-center gap-3 text-lg hover:text-mostaza transition-colors group"
              >
                <Phone className="w-5 h-5 text-mostaza" />
                <span className="font-display tracking-tight">627 130 891</span>
              </a>
              <a
                href={wapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cream/70 hover:text-cream text-sm border border-cream/20 rounded-md px-4 py-2 hover:border-cream/40 transition-all"
              >
                Escribir por WhatsApp
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <p className="text-cream/50 text-sm">
                manuelmoreira@datuva.es
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="bg-cream/5 border border-cream/12 rounded-lg p-6 md:p-8 backdrop-blur-sm"
            >
              <h3 className="font-display text-cream text-2xl mb-1">Reserva una demo</h3>
              <p className="text-cream/55 text-sm mb-7">Te llamo yo. Sin formularios kilométricos.</p>

              <div className="space-y-5">
                <Field label="Nombre" name="nombre" required placeholder="Marta García" />
                <Field label="Bodega" name="bodega" required placeholder="Bodega Valdebierzo" />
                <Field
                  label="Teléfono"
                  name="telefono"
                  type="tel"
                  required
                  placeholder="6XX XXX XXX"
                />

                <div>
                  <label className="block text-cream/70 text-xs tracking-wider uppercase mb-2">
                    Volumen anual aproximado
                  </label>
                  <select
                    name="tramo"
                    required
                    className="w-full bg-carbon/40 border border-cream/15 rounded-md px-4 h-12 text-cream focus:outline-none focus:border-mostaza/70 transition-colors"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-carbon">
                      Selecciona un tramo
                    </option>
                    {tramos.map((t) => (
                      <option key={t} value={t} className="bg-carbon">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-mostaza text-carbon font-semibold h-14 rounded-md hover:bg-mostaza/90 transition-all hover:shadow-[0_12px_32px_-12px_hsl(var(--mostaza)/0.6)] disabled:opacity-50"
              >
                {submitted ? "Enviado, gracias" : "Reservar demo"}
                {!submitted && <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="mt-4 text-cream/40 text-xs leading-relaxed">
                Al enviar aceptas nuestra{" "}
                <a href="/privacidad" className="underline hover:text-cream/70">
                  política de privacidad
                </a>
                . Solo te contactamos para esta demo.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-cream/70 text-xs tracking-wider uppercase mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-carbon/40 border border-cream/15 rounded-md px-4 h-12 text-cream placeholder:text-cream/30 focus:outline-none focus:border-mostaza/70 transition-colors"
    />
  </div>
);

export default CTAContactoSection;
