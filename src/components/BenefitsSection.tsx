const benefits = [
  "Menos errores manuales.",
  "Ahorro de horas de trabajo cada semana.",
  "Trazabilidad clara y ordenada.",
  "Control total desde cualquier dispositivo.",
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 animate-fade-in-up">
            Beneficios que se notan
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b, idx) => (
              <div
                key={b}
                className={`rounded-2xl bg-card shadow-card p-7 hover:shadow-hover transition-shadow animate-fade-in-up-delay-${
                  idx + 1
                }`}
              >
                <p className="text-foreground text-lg font-semibold">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
