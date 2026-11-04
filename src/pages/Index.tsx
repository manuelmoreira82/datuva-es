import { useCallback, useEffect, useRef, useState } from "react";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useContactDialog } from "@/components/ContactDialog";
import { waHref, TEL_CONTACTO, TEL_CONTACTO_LEGIBLE } from "@/lib/contacto";
import IntroLogo from "@/portada/IntroLogo";
import logoLockup from "@/assets/datuva-logo-lockup.webp";
import "@/portada/portada.css";

/*
 * Portada (nov-2026), portada del concepto «Datuva Signature».
 *
 * Todo el texto va en el HTML (SEO y lectura sin JavaScript). Lo pesado —three.js
 * (racimo, fondo y botella en WebGL), GSAP + ScrollTrigger y Lenis— se carga
 * aparte con import() después del primer pintado: `@/portada/escena`. Si ese
 * módulo no llega (mala cobertura) o no hay WebGL, la página se queda en su
 * versión estática, entera y legible.
 *
 * Las secciones de la home anterior (CepaHub, ModulosBento, ROISection…) siguen
 * en src/components sin usarse, por si se quieren recuperar.
 */

const BASE = import.meta.env.BASE_URL;
const img = (f: string) => `${BASE}portada/${f}`;
const CORREO = "manuelmoreira@datuva.es";

/** Móvil, pantalla pequeña o ahorro de datos: versión ligera (como el concepto). */
const detectarLite = () => {
  if (typeof window === "undefined") return true;
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection || {};
  return (
    matchMedia("(pointer: coarse)").matches ||
    innerWidth < 860 ||
    c.saveData === true ||
    /(^|-)2g$/.test(c.effectiveType || "")
  );
};
const detectarReduce = () =>
  typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

const Copiar = ({ texto, selId }: { texto: string; selId: string }) => {
  const [etiqueta, setEtiqueta] = useState("Copiar");
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setEtiqueta("Copiado");
    } catch {
      const el = document.getElementById(selId);
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const s = getSelection();
        s?.removeAllRanges();
        s?.addRange(r);
      }
      setEtiqueta("Selecciónalo");
    }
    setTimeout(() => setEtiqueta("Copiar"), 1800);
  };
  return (
    <button type="button" onClick={copiar}>
      {etiqueta}
    </button>
  );
};

const Index = () => {
  const raiz = useRef<HTMLDivElement>(null);
  const { abrir } = useContactDialog();
  const [lite] = useState(detectarLite);
  const [reduce] = useState(detectarReduce);
  const [conIntro] = useState(() => !lite && !reduce);
  const [introVisible, setIntroVisible] = useState(conIntro);
  const [introSaltada, setIntroSaltada] = useState(false);

  const finIntro = useCallback((saltada: boolean) => {
    if (saltada) setIntroSaltada(true);
    setIntroVisible(false);
  }, []);

  // Animación y 3D: después del primer pintado, y solo en el navegador.
  useEffect(() => {
    let cancelado = false;
    let limpiar: (() => void) | undefined;
    const cargar = () => {
      import("@/portada/escena")
        .then((m) => {
          if (cancelado || !raiz.current) return;
          limpiar = m.iniciarPortada(raiz.current, { lite, reduce, logo: logoLockup, base: BASE });
        })
        .catch(() => {
          /* sin módulo de animación: la página estática sigue entera */
        });
    };
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number })
      .requestIdleCallback;
    const id = ric ? ric(cargar, { timeout: 1200 }) : window.setTimeout(cargar, 200);
    return () => {
      cancelado = true;
      if (!ric) window.clearTimeout(id);
      limpiar?.();
    };
  }, [lite, reduce]);

  const clases = ["portada", lite && "lite", conIntro && "con-intro", introSaltada && "intro-saltada"]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={raiz} className={clases}>
      {introVisible && <IntroLogo onFin={finIntro} />}

      <canvas id="gl" aria-hidden="true" />

      <nav className="nav g" aria-label="Principal">
        <div className="in">
          <a className="logo" href="#hero">
            <img src={logoLockup} alt="Datuva" width={600} height={253} />
          </a>
          <ul>
            <li><a href="#escala">El mapa</a></li>
            <li><a href="#traza">Trazabilidad</a></li>
            <li><a href="#app">La app</a></li>
            <li><a href="#botella">La botella</a></li>
            <li><a href="#bierzo">El Bierzo</a></li>
          </ul>
          <button type="button" className="btn lleno" onClick={() => abrir("portada-nav")}>
            Solicitar demo
          </button>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section id="hero" aria-label="Datuva">
          <div className="respaldo" />
          <div className="hud tl">
            <div className="mono">Hecho en<br /><b>Villafranca del Bierzo</b></div>
          </div>
          <div className="hud tr">
            <div className="mono">Campo · Bodega · Costes<br /><b>Desde el móvil</b></div>
          </div>
          <h1 className="titular" id="t1">
            <span className="p">De la cepa</span>
            <span className="sr"> a la botella</span>
          </h1>
          <p className="titular" id="t2" aria-hidden="true">
            <span className="p">a la <em>botella.</em></span>
          </p>
          <p className="hero-p">
            Apunta desde el móvil lo que pasa en la viña y en la bodega, y{" "}
            <b>sabe cuánto te cuesta cada botella.</b>
          </p>
          <div className="hud bl"><div className="mono">Software para bodegas españolas</div></div>
          <div className="hud br">
            <div className="mono" id="hud-pista">Mueve el cursor · <b>baja</b></div>
          </div>
        </section>

        {/* ZOOM DE ESCALA: el mapa real de la app */}
        <section id="escala" aria-label="El mapa de la app, de España al viñedo">
          <div className="fijo">
            <div className="pantalla-mapa" id="pantalla-mapa">
              <img className="poster" src={img("mapa/m00.webp")} alt="" width={486} height={864} />
              <canvas
                id="mapa"
                role="img"
                aria-label="Mapa 3D de la app de Datuva acercándose desde España hasta un viñedo con sus parcelas"
              />
            </div>
            <div className="velo" />
            <div className="mapa-nota mono" id="mapa-nota">
              Mapa 3D de la app · parcelas de ejemplo<br />
              <b>Bodega de pruebas · Roa (Ribera del Duero)</b>
            </div>
            <div className="aum mono">Aumento<br /><b id="aum" dangerouslySetInnerHTML={{ __html: "×1" }} /></div>
            <ol className="etapas" id="etapas">
              <li className="on"><span>650 km</span>España</li>
              <li><span>5 km</span>Parcelas</li>
              <li><span>120 m</span>Viñedo 3D</li>
            </ol>
            <p className="esc-num" id="esc-num" dangerouslySetInnerHTML={{ __html: "≈ 657 <small>km</small>" }} />
            <p
              className="esc-txt"
              id="esc-txt"
              dangerouslySetInnerHTML={{
                __html:
                  "<b>El mapa de la app.</b> Tus parcelas sobre la foto de satélite, con los límites del Catastro.",
              }}
            />
            <div className="barra mono">
              <span id="barra-t" dangerouslySetInnerHTML={{ __html: "320 m" }} />
              <i id="barra-i" style={{ width: 120 }} />
            </div>
          </div>
        </section>

        {/* TRAZABILIDAD */}
        <section id="traza" className="g" aria-label="Trazabilidad">
          <div className="in rejilla">
            <div>
              <div className="mono" style={{ color: "var(--oro)" }}>Trazabilidad</div>
              <h2>Cada dato, donde <em>nace.</em></h2>
              <p className="intro-t">
                Cada paso se apunta en el móvil cuando se hace. Así, después puedes ver de dónde viene un
                vino y por dónde ha pasado.
              </p>
              <ol className="recorrido">
                <li>
                  <span className="ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M3 20 9 4h6l6 16Z" /><path d="M8 20l3.2-16M16 20 12.8 4" /></svg>
                  </span>
                  <div>
                    <h3>Parcela</h3>
                    <p>Tocas la parcela en el mapa y apuntas el trabajo: poda, laboreo, una muestra o una foto de la viña.</p>
                  </div>
                </li>
                <li>
                  <span className="ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M12 3c3.5 4.6 6 8 6 11a6 6 0 0 1-12 0c0-3 2.5-6.4 6-11Z" /></svg>
                  </span>
                  <div>
                    <h3>Tratamiento</h3>
                    <p>Producto, dosis y plaga. Los tratamientos y abonados pasan solos al cuaderno de campo.</p>
                  </div>
                </li>
                <li>
                  <span className="ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle cx="9" cy="9" r="2.6" /><circle cx="15" cy="9" r="2.6" /><circle cx="12" cy="13.5" r="2.6" />
                      <circle cx="12" cy="19" r="2.2" /><path d="M12 6.4V3l3-1" />
                    </svg>
                  </span>
                  <div>
                    <h3>Vendimia</h3>
                    <p>Cada carga que llega: viticultor, parcela, kilos y el depósito al que va.</p>
                  </div>
                </li>
                <li>
                  <span className="ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M6 12h12M9 21v1.5M15 21v1.5" /></svg>
                  </span>
                  <div>
                    <h3>Depósito</h3>
                    <p>Trasiegos, análisis y fermentación, apuntados en su depósito.</p>
                  </div>
                </li>
                <li>
                  <span className="ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M10 2h4v5c0 1 3 2 3 5v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9c0-3 3-4 3-5Z" /><path d="M7 14h10" /></svg>
                  </span>
                  <div>
                    <h3>Botella</h3>
                    <p>Con la precinta o el lote de la etiqueta, buscas de qué parcela viene y a qué cliente fue.</p>
                  </div>
                </li>
              </ol>
              <p className="legal">
                Con esos mismos datos, la app prepara <b>SILICIE, INFOVI y los libros de la Junta</b> para que
                los presente tu bodega o tu gestoría.
              </p>
            </div>
            <figure className="traza-movil">
              <div className="marco">
                <img
                  src={img("movil-trazabilidad.webp")}
                  alt="Trazabilidad del depósito D-09 en la app: tempranillo de la añada 2026, ha pasado por los depósitos D-01 y D-09, y su uva viene de tres parcelas de la bodega de pruebas con el porcentaje de cada una"
                  loading="lazy"
                  width={780}
                  height={1688}
                />
              </div>
              <figcaption>
                <div className="mono">Captura real · bodega de pruebas</div>
                <p>Un depósito y su recorrido: por qué depósitos ha pasado el vino y de qué parcelas viene la uva.</p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* LA APP: capturas reales */}
        <section id="app" className="g" aria-label="La app de Datuva">
          <div className="in">
            <div className="cab">
              <div>
                <div className="mono" style={{ color: "var(--oro)" }}>La app, tal cual</div>
                <h2>Esto es lo que llevas en el <em>bolsillo.</em></h2>
              </div>
              <p>
                Del mapa de la parcela al coste de cada lote. Así se ve Datuva en el móvil del que trabaja en
                la viña y en la bodega.
              </p>
            </div>
            <div className="moviles-scroll">
              <div className="moviles">
                <figure className="movil">
                  <div className="marco">
                    <img
                      src={img("movil-mapa.webp")}
                      alt="Mapa de Parcelas 3D: vista inclinada sobre satélite junto al río Duero, con la parcela Los Olmos elegida y el menú de acciones abierto: registrar trabajo, abonado, tratamiento, muestra de maduración, registro fenológico y reportar incidencia"
                      loading="lazy" width={780} height={1688}
                    />
                  </div>
                  <figcaption>
                    <div className="mono">Campo</div>
                    <p>Tocas la parcela en el mapa y eliges qué has hecho: trabajo, tratamiento, abonado o muestra.</p>
                  </figcaption>
                </figure>
                <figure className="movil">
                  <div className="marco">
                    <img
                      src={img("movil-vendimia.webp")}
                      alt="Formulario Registrar Entrada de Vendimia: fecha, viticultor, precio por kilo, depósito, kilogramos totales y tipo de uva"
                      loading="lazy" width={780} height={1688}
                    />
                  </div>
                  <figcaption>
                    <div className="mono">Vendimia</div>
                    <p>Cada carga de uva, con su viticultor, sus kilos y el depósito al que va.</p>
                  </figcaption>
                </figure>
                <figure className="movil">
                  <div className="marco">
                    <img
                      src={img("movil-depositos.webp")}
                      alt="Depósitos: resumen de 19 depósitos con parciales y vacíos, buscador, y la ficha del depósito D-01 al 65 % con uva en fermentación"
                      loading="lazy" width={780} height={1688}
                    />
                  </div>
                  <figcaption>
                    <div className="mono">Bodega</div>
                    <p>Cada depósito, su nivel y lo que contiene, de un vistazo.</p>
                  </figcaption>
                </figure>
                <figure className="movil">
                  <div className="marco">
                    <img
                      src={img("movil-costes-lote.webp")}
                      alt="Costes por lote de un embotellado: coste por botella y por litro, y desglose en material de embotellado, material de etiquetado, roturas y mano de obra"
                      loading="lazy" width={780} height={1688}
                    />
                  </div>
                  <figcaption>
                    <div className="mono">Costes</div>
                    <p>Lo que cuesta cada botella de un lote, y de dónde sale ese coste.</p>
                  </figcaption>
                </figure>
              </div>
            </div>
            <figure className="escritorio">
              <div className="navegador">
                <div className="barra-nav"><i /><i /><i /><span>app.datuva.es</span></div>
                <img
                  src={img("escritorio-campo.webp")}
                  alt="Gestión de Campo en el ordenador: mapa de parcelas, viñas y parajes, clima, protección del viñedo, partes de trabajo, gestión ecológica, análisis del terreno, recogida de muestras, inventario, calendario, historial y fenología"
                  loading="lazy" width={1600} height={1000}
                />
              </div>
              <figcaption>
                <div className="mono">Y en el ordenador de la oficina</div>
                <p>La misma app y los mismos datos, en pantalla grande.</p>
              </figcaption>
            </figure>
            <p className="mono nota-app">Capturas reales de la app, con la bodega de pruebas de Datuva</p>
          </div>
        </section>

        {/* CIFRAS */}
        <section id="cifras" className="g" aria-label="Datuva en cifras">
          <div className="in">
            <div className="mono" style={{ color: "var(--oro)" }}>Datuva, en cuatro números</div>
            <h2>Una sola app, del viñedo a la botella.</h2>
            <div className="cifras">
              <div className="cifra">
                <div className="n"><span data-n="1">1</span><small>app</small></div>
                <p>Campo, vendimia, bodega, laboratorio, embotellado, etiquetado, costes y fichajes, en el móvil y en el ordenador.</p>
                <svg viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"><path d="M0,40 L20,36 L40,30 L60,31 L80,24 L100,20 L120,17 L140,12 L160,10 L180,6 L200,4" /></svg>
              </div>
              <div className="cifra">
                <div className="n"><span data-n="3">3</span><small>trámites</small></div>
                <p>SILICIE, INFOVI y libros de la Junta de Castilla y León, preparados para que los presente tu bodega o tu gestoría.</p>
                <svg viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"><path d="M0,30 L66,30 L66,18 L133,18 L133,8 L200,8" /></svg>
              </div>
              <div className="cifra">
                <div className="n"><span data-n="30">30</span><small>min</small></div>
                <p>Media hora de demo: te lo enseñamos funcionando, sin compromiso.</p>
                <svg viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"><path d="M0,22 C25,6 50,38 75,22 C100,6 125,38 150,22 C175,6 200,22 200,22" /></svg>
              </div>
              <div className="cifra">
                <div className="n"><span data-n="150">150</span><small>€/mes</small></div>
                <p>Desde 150 €/mes + IVA.</p>
                <svg viewBox="0 0 200 44" preserveAspectRatio="none" aria-hidden="true"><path d="M0,8 L200,8" /></svg>
              </div>
            </div>
          </div>
        </section>

        {/* BOTELLA */}
        <section id="botella" aria-label="Del viñedo a la botella">
          <div className="fijo">
            <div className="respaldo" />
            <h2>Del viñedo a la <em>botella.</em></h2>
            <ol className="pasos" id="pasos">
              <li className="on">
                <div className="mono">01 · Depósito</div>
                <p>Cada entrada de uva se apunta con su parcela y el depósito al que va.</p>
              </li>
              <li>
                <div className="mono">02 · Embotellado</div>
                <p>Cada embotellado lleva su partida, descuenta corchos y botellas y calcula el coste por botella.</p>
              </li>
              <li>
                <div className="mono">03 · Etiquetado</div>
                <p>Al etiquetar se apuntan las precintas. Con una precinta o el lote, buscas de dónde viene esa botella.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* EL BIERZO */}
        <section id="bierzo" className="g" aria-label="Diseñado en El Bierzo">
          <div className="in rejilla">
            <div>
              <div className="mono">Diseñado en El Bierzo</div>
              <h2>Hecho entre <em>viñas.</em></h2>
              <p>
                Datuva nace en Villafranca del Bierzo. Está pensada para el móvil del que poda, trata y
                vendimia, y para el ordenador de la oficina de la bodega.
              </p>
              <p>Ya la usan varias bodegas del Bierzo.</p>
              <dl>
                <dt>Dónde</dt><dd>Villafranca del Bierzo, León</dd>
                <dt>Fundador</dt><dd>Manuel Moreira · Director General</dd>
                <dt>Ayuda</dt><dd>Por WhatsApp o correo, de lunes a viernes de 9:00 a 18:00</dd>
              </dl>
            </div>
            <svg className="mapa" viewBox="0 0 520 420" role="img" aria-label="Esquema del valle del Burbia y el río Valcarce en Villafranca del Bierzo">
              <path className="curva" d="M20,80 C120,40 220,70 300,50 S460,30 510,70" />
              <path className="curva" d="M10,140 C110,110 210,140 310,120 S450,100 515,140" />
              <path className="curva" d="M10,330 C120,300 230,340 330,315 S460,290 515,320" />
              <path className="curva" d="M10,390 C130,365 240,395 340,375 S470,355 515,385" />
              <path className="rio" pathLength={1} d="M60,30 C110,90 150,140 210,190 S300,250 330,300 S410,370 500,400" />
              <path className="rio" pathLength={1} style={{ strokeWidth: 1.2 }} d="M20,250 C80,240 140,225 190,215 S250,200 270,232" />
              <text className="cota" x="70" y="72">Burbia</text>
              <text className="cota" x="40" y="266">Valcarce</text>
              <text className="cota" x="430" y="356">→ Ponferrada</text>
              <circle className="pin" cx="262" cy="230" r="7" />
              <circle cx="262" cy="230" r="16" fill="none" stroke="#7C2D3E" strokeOpacity=".4" />
              <text className="eti" x="284" y="226">VILLAFRANCA</text>
              <text className="cota" x="284" y="244">42.6063° N · 6.8073° O</text>
            </svg>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES (componente de siempre) */}
        <div className="pie-web">
          <FAQSection codigo="" />
        </div>

        {/* DEMO */}
        <section id="demo" aria-label="Solicitar demo">
          <div className="g">
            <div className="in tarjeta">
              <div>
                <img className="logo-cierre" src={logoLockup} alt="Datuva" width={600} height={253} loading="lazy" />
                <div className="mono" style={{ color: "var(--oro)" }}>Empezar</div>
                <h2>Te lo enseñamos funcionando en <em>media hora.</em></h2>
              </div>
              <div className="lateral">
                <p className="precio" style={{ margin: 0 }}>Desde <b>150 €/mes</b> + IVA</p>
                <button type="button" className="btn lleno" onClick={() => abrir("portada-cierre")}>
                  Solicitar demo
                </button>
                <a className="btn sec" href={waHref()} target="_blank" rel="noopener noreferrer">
                  O escríbenos por WhatsApp
                </a>
                <div className="contacto">
                  <div className="fila-tel">
                    <span id="tel"><a href={`tel:${TEL_CONTACTO}`}>{TEL_CONTACTO_LEGIBLE}</a></span>
                    <Copiar texto="627130891" selId="tel" />
                  </div>
                  <div className="fila-tel">
                    <div>
                      <small>O escríbenos un correo</small>
                      <a id="correo" href={`mailto:${CORREO}?subject=Demo%20de%20Datuva`}>{CORREO}</a>
                    </div>
                    <Copiar texto={CORREO} selId="correo" />
                  </div>
                  <div className="mono aviso">Manuel Moreira · trato directo, sin intermediarios</div>
                </div>
              </div>
            </div>
          </div>
          <div className="marquesina" aria-hidden="true">
            <div>Datuva — del viñedo a la <em>botella</em> — Datuva — del viñedo a la <em>botella</em> — </div>
          </div>
        </section>

        <div className="pie-web">
          <Footer />
        </div>
      </main>

      <CookieBanner />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
