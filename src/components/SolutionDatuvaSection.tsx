const SolutionDatuvaSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-in-up">
            La solución: DATUVA
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 animate-fade-in-up-delay-1">
            DATUVA centraliza toda la gestión de tu bodega en una única
            plataforma:
          </p>

          <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up-delay-2">
            <div className="rounded-2xl bg-card shadow-card p-6">
              <p className="font-semibold text-foreground">Viñedo y parcelas</p>
            </div>
            <div className="rounded-2xl bg-card shadow-card p-6">
              <p className="font-semibold text-foreground">Depósitos y barricas</p>
            </div>
            <div className="rounded-2xl bg-card shadow-card p-6">
              <p className="font-semibold text-foreground">
                Entradas de uva, trasiegos y embotellado
              </p>
            </div>
            <div className="rounded-2xl bg-card shadow-card p-6">
              <p className="font-semibold text-foreground">
                Trazabilidad completa del campo a la botella
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-card shadow-card p-8 animate-fade-in-up-delay-3">
            <p className="text-foreground text-lg leading-relaxed">
              Lenguaje claro, sin complicaciones. Control real del día a día.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionDatuvaSection;
