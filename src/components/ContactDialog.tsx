import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ArrowRight, Check, Loader2, Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

/** Endpoint que recibe el formulario. Si no está configurado se usa /api/contacto. */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "/api/contacto";

const EMAIL_CONTACTO = "manuelmoreira@datuva.es";
const TEL_CONTACTO = "+34627130891";
const TEL_CONTACTO_LEGIBLE = "627 130 891";

type Estado = "idle" | "enviando" | "ok" | "error";

interface ContactDialogContextValue {
  /** Abre el diálogo. `origen` se envía con el formulario para saber desde qué CTA vino. */
  abrir: (origen?: string) => void;
}

const ContactDialogContext = createContext<ContactDialogContextValue | null>(null);

export const useContactDialog = () => {
  const ctx = useContext(ContactDialogContext);
  if (!ctx) {
    throw new Error("useContactDialog debe usarse dentro de <ContactDialogProvider>");
  }
  return ctx;
};

const camposIniciales = {
  nombre: "",
  bodega: "",
  email: "",
  telefono: "",
  mensaje: "",
};

export const ContactDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [abierto, setAbierto] = useState(false);
  const [origen, setOrigen] = useState("");
  const [campos, setCampos] = useState(camposIniciales);
  const [privacidad, setPrivacidad] = useState(false);
  const [estado, setEstado] = useState<Estado>("idle");
  const [errores, setErrores] = useState<Record<string, string>>({});
  /** Relleno por bots: si viene con contenido, descartamos el envío en el servidor. */
  const [honeypot, setHoneypot] = useState("");

  const abrir = useCallback((desde = "") => {
    setOrigen(desde);
    setEstado("idle");
    setErrores({});
    setAbierto(true);
  }, []);

  const cerrar = (siguienteAbierto: boolean) => {
    setAbierto(siguienteAbierto);
    if (!siguienteAbierto && estado === "ok") {
      // Al cerrar tras un envío correcto, dejamos el formulario limpio para la próxima vez.
      setCampos(camposIniciales);
      setPrivacidad(false);
      setEstado("idle");
    }
  };

  const actualizar = (campo: keyof typeof campos) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCampos((prev) => ({ ...prev, [campo]: e.target.value }));
    setErrores((prev) => {
      if (!prev[campo]) return prev;
      const siguiente = { ...prev };
      delete siguiente[campo];
      return siguiente;
    });
  };

  const validar = () => {
    const nuevos: Record<string, string> = {};
    if (!campos.nombre.trim()) nuevos.nombre = "Dinos cómo te llamas.";
    if (!campos.email.trim()) {
      nuevos.email = "Necesitamos un correo para responderte.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(campos.email.trim())) {
      nuevos.email = "Ese correo no parece válido.";
    }
    if (!privacidad) nuevos.privacidad = "Tienes que aceptar la política de privacidad.";
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (estado === "enviando") return;
    if (!validar()) return;

    setEstado("enviando");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...campos, origen, website: honeypot }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setEstado("ok");
    } catch {
      setEstado("error");
    }
  };

  const valor = useMemo(() => ({ abrir }), [abrir]);

  return (
    <ContactDialogContext.Provider value={valor}>
      {children}

      <Dialog open={abierto} onOpenChange={cerrar}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {estado === "ok" ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                <Check className="h-7 w-7 text-accent" />
              </div>
              <DialogTitle className="font-serif text-2xl">Mensaje recibido</DialogTitle>
              <DialogDescription className="mt-3 text-base">
                Gracias, {campos.nombre.split(" ")[0]}. Te escribimos a{" "}
                <span className="font-medium text-foreground">{campos.email}</span> en menos de
                24&nbsp;horas laborables.
              </DialogDescription>
              <Button className="mt-7" variant="contact" onClick={() => cerrar(false)}>
                Cerrar
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  ¿Quieres verlo en tu bodega?
                </DialogTitle>
                <DialogDescription>
                  Déjanos tu correo y te escribimos para enseñarte Datuva funcionando en
                  20&nbsp;minutos. Sin compromiso.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={enviar} className="space-y-4" noValidate>
                {/* Trampa para bots: invisible para personas, no enfocable. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contacto-nombre">Nombre *</Label>
                    <Input
                      id="contacto-nombre"
                      autoComplete="name"
                      value={campos.nombre}
                      onChange={actualizar("nombre")}
                      aria-invalid={!!errores.nombre}
                      aria-describedby={errores.nombre ? "error-nombre" : undefined}
                    />
                    {errores.nombre && (
                      <p id="error-nombre" className="text-sm text-destructive">
                        {errores.nombre}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contacto-bodega">Bodega</Label>
                    <Input
                      id="contacto-bodega"
                      autoComplete="organization"
                      value={campos.bodega}
                      onChange={actualizar("bodega")}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contacto-email">Correo electrónico *</Label>
                    <Input
                      id="contacto-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={campos.email}
                      onChange={actualizar("email")}
                      aria-invalid={!!errores.email}
                      aria-describedby={errores.email ? "error-email" : undefined}
                    />
                    {errores.email && (
                      <p id="error-email" className="text-sm text-destructive">
                        {errores.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contacto-telefono">Teléfono</Label>
                    <Input
                      id="contacto-telefono"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={campos.telefono}
                      onChange={actualizar("telefono")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contacto-mensaje">¿Qué te gustaría ver?</Label>
                  <Textarea
                    id="contacto-mensaje"
                    rows={3}
                    placeholder="Cuántos kilos elaboráis, qué usáis ahora, qué os preocupa…"
                    value={campos.mensaje}
                    onChange={actualizar("mensaje")}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="contacto-privacidad"
                      checked={privacidad}
                      onCheckedChange={(v) => {
                        setPrivacidad(v === true);
                        setErrores((prev) => {
                          if (!prev.privacidad) return prev;
                          const siguiente = { ...prev };
                          delete siguiente.privacidad;
                          return siguiente;
                        });
                      }}
                      className="mt-0.5"
                      aria-describedby={errores.privacidad ? "error-privacidad" : undefined}
                    />
                    <Label
                      htmlFor="contacto-privacidad"
                      className="text-sm font-normal leading-relaxed text-muted-foreground"
                    >
                      He leído y acepto la{" "}
                      <a
                        href="/privacidad"
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline underline-offset-2"
                      >
                        política de privacidad
                      </a>
                      . Usaremos tus datos solo para responderte.
                    </Label>
                  </div>
                  {errores.privacidad && (
                    <p id="error-privacidad" className="text-sm text-destructive">
                      {errores.privacidad}
                    </p>
                  )}
                </div>

                {estado === "error" && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
                    <p className="font-medium text-foreground">
                      No hemos podido enviar el mensaje.
                    </p>
                    <p className="mt-1 text-muted-foreground">
                      Escríbenos directamente y lo resolvemos igual de rápido:
                    </p>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-5">
                      <a
                        href={`mailto:${EMAIL_CONTACTO}`}
                        className="flex items-center gap-2 font-medium text-primary"
                      >
                        <Mail className="h-4 w-4" />
                        {EMAIL_CONTACTO}
                      </a>
                      <a
                        href={`tel:${TEL_CONTACTO}`}
                        className="flex items-center gap-2 font-medium text-primary"
                      >
                        <Phone className="h-4 w-4" />
                        {TEL_CONTACTO_LEGIBLE}
                      </a>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="contact"
                  size="lg"
                  className="w-full gap-2"
                  disabled={estado === "enviando"}
                >
                  {estado === "enviando" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      Quiero que me escribáis
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ContactDialogContext.Provider>
  );
};
