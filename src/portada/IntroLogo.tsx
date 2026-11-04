import { useEffect, useState } from "react";
import logoLockup from "@/assets/datuva-logo-lockup.webp";

/**
 * Intro de la portada: el racimo del logo se dibuja en oro trazo a trazo, el
 * logo real se descubre detrás con un brillo, y la cortina sube al hero.
 *
 * El dibujo es una versión vectorial del racimo-circuito del logo, calcada sobre
 * `datuva-logo-lockup.webp` (mismo viewBox 600×253) para que los trazos caigan
 * encima del arte real cuando este aparece. Solo es un acompañamiento de la
 * animación: el logo que se queda es siempre el original.
 *
 * Toda la secuencia es CSS (portada.css) para que no dependa de ningún script
 * pesado. Se salta con un toque o una tecla. Quien la monta decide si se ve:
 * en móvil, ahorro de datos o movimiento reducido no se monta.
 */

const r1 = [38, 79, 120].map((cx) => ({ cx, cy: 119, r: 19 }));
const us = [
  ...[57, 98, 139].map((cx) => ({ cx, cy: 160, r: 18 })),
  ...[76, 117].map((cx) => ({ cx, cy: 195, r: 17 })),
  { cx: 99, cy: 229, r: 19 },
];
/** Arco en U abierto por arriba (como las bayas inferiores del logo). */
const arcoU = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => {
  const dx = r * 0.82;
  const dy = r * 0.57;
  return `M${cx - dx} ${cy - dy} A${r} ${r} 0 1 0 ${cx + dx} ${cy - dy}`;
};
const lineas = [
  "M21 46 H66 L84 64 V98",
  "M15 60 H70 L80 70 V99",
  "M34 73 H72 L77 78 V100",
  "M16 82 H67 L70 85 V100",
  "M93 50 V96",
  "M173 52 H130 L111 71 V98",
  "M158 64 H128 L118 74 V99",
  "M172 77 H158 L154 73 H137 L133 77 V100",
  "M57 145 V168",
  "M91 140 V152",
  "M120 185 V199",
  "M99 205 V230",
];
const terminales = [
  [16, 46], [10, 60], [29, 73], [11, 82], [178, 52], [177, 77],
].map(([cx, cy]) => ({ cx, cy, r: 5 }));
const puntos = [
  [163, 64, 5], [36, 130, 4], [89, 113, 4], [130, 121, 4], [57, 142, 3], [91, 155, 4],
  [138, 158, 4], [66, 164, 3], [70, 203, 4], [120, 203, 4], [90, 221, 4], [99, 234, 4],
].map(([cx, cy, r]) => ({ cx, cy, r }));

const IntroLogo = ({ onFin }: { onFin: (saltada: boolean) => void }) => {
  const [fuera, setFuera] = useState(false);

  useEffect(() => {
    const fin = window.setTimeout(() => onFin(false), 1700);
    const saltar = () => {
      setFuera(true);
      window.clearTimeout(fin);
      window.setTimeout(() => onFin(true), 380);
    };
    window.addEventListener("keydown", saltar, { once: true });
    window.addEventListener("pointerdown", saltar, { once: true });
    return () => {
      window.clearTimeout(fin);
      window.removeEventListener("keydown", saltar);
      window.removeEventListener("pointerdown", saltar);
    };
  }, [onFin]);

  let i = 0;
  const sig = () => ({ "--i": i++ }) as React.CSSProperties;

  return (
    <div className={`intro${fuera ? " fuera" : ""}`} aria-hidden="true">
      <div className="sello">
        <img className="lockup" src={logoLockup} alt="" width={600} height={253} />
        <div
          className="brillo"
          style={{ WebkitMaskImage: `url(${logoLockup})`, maskImage: `url(${logoLockup})` }}
        />
        <svg className="trazo" viewBox="0 0 600 253" preserveAspectRatio="xMidYMid meet">
          <path pathLength={1} style={sig()} d="M64 7 C82 8 94 20 93 37 C78 41 64 30 64 7 Z" />
          <path pathLength={1} style={sig()} d="M122 33 C108 48 98 70 102 95" />
          {lineas.map((d) => (
            <path key={d} pathLength={1} style={sig()} d={d} />
          ))}
          {terminales.map((c) => (
            <circle key={`t${c.cx}-${c.cy}`} pathLength={1} style={sig()} {...c} />
          ))}
          {r1.map((c) => (
            <circle key={`r${c.cx}`} pathLength={1} style={sig()} {...c} />
          ))}
          {us.map((c) => (
            <path key={`u${c.cx}-${c.cy}`} pathLength={1} style={sig()} d={arcoU(c)} />
          ))}
          {puntos.map((c) => (
            <circle key={`p${c.cx}-${c.cy}`} className="punto" pathLength={1} style={sig()} {...c} />
          ))}
        </svg>
      </div>
      <div className="saltar mono">Toca para entrar</div>
    </div>
  );
};

export default IntroLogo;
