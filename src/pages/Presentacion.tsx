import { Button } from "@/components/ui/button";
import { Download, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Presentacion = () => {
  const pdfUrl = "/datuva-presentacion.pdf";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <header className="text-center mb-8">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-3">
              Presentación · Datuva
            </h1>
            <p className="text-lg text-foreground/70">
              Gestión integral para bodegas — de la viña a la botella.
            </p>
          </header>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button variant="contact" size="lg" asChild>
              <a href={pdfUrl} download>
                <Download className="mr-2 h-5 w-5" />
                Descargar PDF
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://wa.me/34627130891?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20demo%20de%20Datuva"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Solicitar demo
              </a>
            </Button>
          </div>

          <div className="w-full rounded-lg overflow-hidden shadow-card border border-border bg-card">
            <img
              src="/datuva-presentacion.jpg"
              alt="Presentación comercial de Datuva"
              className="w-full h-auto"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            ¿No se ve el PDF?{" "}
            <a href={pdfUrl} className="text-primary underline" target="_blank" rel="noopener noreferrer">
              Ábrelo en una pestaña nueva
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Presentacion;
