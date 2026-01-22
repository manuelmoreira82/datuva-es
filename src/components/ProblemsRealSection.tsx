const ProblemsRealSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 animate-fade-in-up">
            Problemas reales, cada vendimia
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 animate-fade-in-up-delay-1">
            Esto no es teoría. Estos problemas cuestan tiempo, dinero y
            tranquilidad.
          </p>

          <ul className="grid gap-4 animate-fade-in-up-delay-2">
            <li className="rounded-2xl bg-card shadow-card p-6">
              <p className="text-foreground font-semibold">
                Demasiados Excel y papeles.
              </p>
            </li>
            <li className="rounded-2xl bg-card shadow-card p-6">
              <p className="text-foreground font-semibold">
                Errores en movimientos de vino y barricas.
              </p>
            </li>
            <li className="rounded-2xl bg-card shadow-card p-6">
              <p className="text-foreground font-semibold">
                Dificultad para cumplir normativa sin perder tiempo.
              </p>
            </li>
            <li className="rounded-2xl bg-card shadow-card p-6">
              <p className="text-foreground font-semibold">
                Falta de visión clara del estado real de la bodega.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProblemsRealSection;
