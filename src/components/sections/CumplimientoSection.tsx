import { useEffect, useRef, useState } from "react";

const rows = [
  { fecha: "2026-09-12", tipo: "Entrada uva", parcela: "Valdeobispo · Mencía", kg: "4 820 kg", code: "2204" },
  { fecha: "2026-09-15", tipo: "Trasiego",    parcela: "Dep. 14 → Dep. 07",  kg: "3 200 L",  code: "2204" },
  { fecha: "2026-09-21", tipo: "Descube",     parcela: "Dep. 07 → Barricas", kg: "2 850 L",  code: "2204" },
  { fecha: "2026-10-04", tipo: "Sulfitado",   parcela: "Dep. 03 · SO₂ 30 mg/L", kg: "—",     code: "2204" },
  { fecha: "2026-11-18", tipo: "Embotellado", parcela: "Lote 2026/A · Mencía",  kg: "3 800 ud", code: "2204" },
  { fecha: "2026-12-02", tipo: "Salida",      parcela: "Cliente NIE · EMCS",    kg: "240 ud",   code: "2204" },
];

const CumplimientoSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setCount(rows.length);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          const tick = () => {
            i += 1;
            setCount(i);
            if (i < rows.length) setTimeout(tick, 320);
          };
          tick();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="cumplimiento" className="bg-tinta text-cream py-24 md:py-36">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <p className="text-mostaza text-xs tracking-[0.3em] uppercase mb-6">
            Cumplimiento
          </p>
          <h2 className="font-display font-medium leading-[1.02] tracking-[-0.02em] text-balance text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl">
            Cada operación genera su <span className="italic text-mostaza">asiento</span>.
            <span className="block">Sola.</span>
          </h2>
          <p className="mt-8 text-cream/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Tú trabajas como siempre: pesas la uva, llenas el depósito, embotellas.
            Datuva escribe el libro contable detrás de cada gesto.
          </p>
        </div>

        {/* Libro SILICIE */}
        <div
          ref={ref}
          className="mt-16 rounded-lg bg-carbon/60 border border-cream/10 overflow-hidden"
        >
          <div className="px-5 md:px-8 py-4 border-b border-cream/10 flex items-center justify-between text-cream/60 text-xs tracking-[0.25em] uppercase">
            <span>Libro SILICIE · Vigente</span>
            <span className="hidden sm:inline text-mostaza/80">Sede electrónica AEAT</span>
          </div>
          <div className="px-3 md:px-6 py-4 md:py-6 font-mono text-[12px] md:text-sm overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-12 gap-4 text-cream/40 text-[10px] md:text-xs uppercase tracking-wider pb-3 border-b border-cream/8">
                <span className="col-span-2">Fecha</span>
                <span className="col-span-3">Asiento</span>
                <span className="col-span-5">Concepto</span>
                <span className="col-span-1 text-right">NC</span>
                <span className="col-span-1 text-right">Cant.</span>
              </div>
              {rows.map((r, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-4 py-3 border-b border-cream/5 last:border-b-0 transition-all duration-500"
                  style={{
                    opacity: i < count ? 1 : 0,
                    transform: `translateY(${i < count ? 0 : 8}px)`,
                  }}
                >
                  <span className="col-span-2 text-cream/70">{r.fecha}</span>
                  <span className="col-span-3 text-mostaza">{r.tipo}</span>
                  <span className="col-span-5 text-cream/80">{r.parcela}</span>
                  <span className="col-span-1 text-right text-cream/45">{r.code}</span>
                  <span className="col-span-1 text-right text-cream/85">{r.kg}</span>
                </div>
              ))}
              <div
                className="grid grid-cols-12 gap-4 pt-4 transition-opacity duration-500"
                style={{ opacity: count >= rows.length ? 1 : 0 }}
              >
                <span className="col-span-12 text-mostaza/90 text-[11px] tracking-widest uppercase">
                  ✓ Libro listo para presentar
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pies */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-cream/70 text-sm">
          {["SILICIE", "INFOVI", "Cuaderno de campo (CUE)", "Libros JCYL"].map((t) => (
            <div key={t} className="border-l-2 border-mostaza/70 pl-4">
              <div className="font-display text-cream text-lg">{t}</div>
              <div className="text-cream/45 text-xs tracking-wide mt-1">Generación automática</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CumplimientoSection;
