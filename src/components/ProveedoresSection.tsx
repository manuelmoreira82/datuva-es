import { Building2 } from "lucide-react";

const ProveedoresSection = () => {
  return (
    <section id="proveedores" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Proveedores
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12">
            Tus proveedores, centralizados
          </h2>

          <div className="flex items-start gap-4 p-5 rounded-lg bg-card border border-border/50">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <p className="text-foreground/85 leading-relaxed">
              Ficha de proveedores con categorías, condiciones de pago y descuentos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProveedoresSection;