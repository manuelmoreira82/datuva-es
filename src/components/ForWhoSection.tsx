const ForWhoSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto">
        <div className="max-w-4xl rounded-3xl bg-card shadow-card p-10 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-in-up">
            ¿Para quién es DATUVA?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl animate-fade-in-up-delay-1">
            DATUVA está pensada para bodegas pequeñas y medianas que quieren
            profesionalizar su gestión sin depender de Excel ni software
            complicado.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
