/*
 * Módulo pesado de la portada: se carga con import() después del primer pintado.
 *
 *   · Lenis (scroll suave) alimentando a GSAP ScrollTrigger.
 *   · WebGL con three.js: racimo en el hero, fondo de hileras detrás de
 *     «Trazabilidad» y botella que se llena en «Del viñedo a la botella».
 *   · El mapa real de la app (45 fotogramas) al ritmo del scroll.
 *   · Contadores, trazos del río y paralaje de los móviles.
 *
 * Portado del concepto «Datuva Signature» con sus reducciones: en modo ligero
 * (táctil, < 860 px, ahorro de datos) sin Lenis, menos geometría, vidrio sin
 * transmisión, sin fondo animado y la mitad de fotogramas; con
 * prefers-reduced-motion, sin Lenis ni animaciones de entrada; sin WebGL, los
 * respaldos en CSS (.no-webgl).
 *
 * `iniciarPortada` devuelve una función que lo desmonta todo (navegación SPA a
 * las páginas legales).
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

interface Opciones {
  lite: boolean;
  reduce: boolean;
  /** URL del logo (lockup) para la etiqueta de la botella. */
  logo: string;
  /** import.meta.env.BASE_URL */
  base: string;
}

export function iniciarPortada(raiz: HTMLElement, { lite, reduce, logo, base }: Opciones) {
  const $ = <T extends Element = HTMLElement>(s: string) => raiz.querySelector(s) as T | null;
  const $$ = <T extends Element = HTMLElement>(s: string) => [...raiz.querySelectorAll(s)] as T[];
  const limpiezas: (() => void)[] = [];
  const escuchar = (
    t: EventTarget,
    ev: string,
    fn: EventListenerOrEventListenerObject,
    o?: AddEventListenerOptions,
  ) => {
    t.addEventListener(ev, fn, o);
    limpiezas.push(() => t.removeEventListener(ev, fn, o));
  };
  const ctx = gsap.context(() => {}, raiz);
  const tactil = matchMedia("(pointer: coarse)").matches;
  raiz.classList.add("animada");

  if (tactil) {
    const h = $("#hud-pista");
    if (h) h.innerHTML = "Desliza · <b>baja</b>";
  }

  /* ---------------- scroll: Lenis alimenta a ScrollTrigger ---------------- */
  let lenis: Lenis | null = null;
  let tickLenis: ((t: number) => void) | null = null;
  if (!reduce && !lite) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    tickLenis = (t: number) => lenis!.raf(t * 1000);
    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);
    // Si un diálogo de Radix bloquea el scroll del body, Lenis también se para.
    const obs = new MutationObserver(() => {
      if (document.body.hasAttribute("data-scroll-locked")) lenis!.stop();
      else lenis!.start();
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked", "style"] });
    limpiezas.push(() => obs.disconnect());
  }
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    escuchar(a, "click", (e) => {
      const d = raiz.querySelector(a.getAttribute("href")!) as HTMLElement | null;
      if (!d) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(d, { duration: 1.6 });
      else d.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }),
  );

  ctx.add(() => {
    /* nav con velo solo sobre secciones DOM */
    ["#traza", "#app", "#cifras", "#bierzo", "#faq", "#demo"].forEach((s) => {
      if (!$(s)) return;
      ScrollTrigger.create({
        trigger: $(s),
        start: "top 60",
        end: "bottom 60",
        onToggle: (st) => raiz.classList.toggle("nav-solida", st.isActive),
      });
    });
  });

  /* ---------------- WebGL ---------------- */
  const canvas = $<HTMLCanvasElement>("#gl")!;
  let renderer: THREE.WebGLRenderer | null = null;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !lite,
      alpha: false,
      powerPreference: lite ? "low-power" : "high-performance",
    });
  } catch {
    renderer = null;
  }
  if (!renderer) raiz.classList.add("no-webgl");

  let raf = 0;
  const css = getComputedStyle(raiz);
  const col = (v: string) => new THREE.Color(css.getPropertyValue(v).trim() || "#000");
  const ORO = col("--oro"),
    VINO = col("--vino"),
    CREMA = col("--crema"),
    NEGRO = col("--negro");

  if (renderer) {
    const R = renderer;
    R.setPixelRatio(lite ? 1 : Math.min(devicePixelRatio, 2));
    R.outputColorSpace = THREE.SRGBColorSpace;
    R.toneMapping = THREE.ACESFilmicToneMapping;
    R.toneMappingExposure = 1.05;
    R.localClippingEnabled = true;
    R.setClearColor(NEGRO, 1);
    const pmrem = new THREE.PMREMGenerator(R);
    const entorno = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    /* ===== 1 · el racimo ===== */
    const hero = new THREE.Scene();
    hero.environment = entorno;
    const camHero = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camHero.position.set(0, 0, 9);
    const racimo = new THREE.Group();
    hero.add(racimo);

    const uva = new THREE.MeshPhysicalMaterial({
      color: 0x2a0a14, roughness: 0.38, metalness: 0, clearcoat: 0.7, clearcoatRoughness: 0.35,
      sheen: 1, sheenRoughness: 0.55, sheenColor: new THREE.Color(0x8f97a8), envMapIntensity: 1.1,
    });
    const bayas: number[][] = [];
    let semillaR = 11;
    const azar = () => (semillaR = (semillaR * 9301 + 49297) % 233280) / 233280;
    const filas = lite ? 11 : 16;
    for (let f = 0; f < filas; f++) {
      const t = f / (filas - 1);
      const y = 1.5 - t * 3.3 + (azar() - 0.5) * 0.08;
      const Rr = (1.0 * Math.sin(Math.PI * (0.15 + 0.75 * (1 - t))) * (1 - t * 0.6) + 0.1) * (0.9 + azar() * 0.2);
      const n = Math.max(2, Math.round(Rr * 8 + azar() * 2));
      const giro = azar() * 6.28;
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2 + giro + (azar() - 0.5) * 0.6;
        const rr = Rr * (0.6 + azar() * 0.45);
        bayas.push([Math.cos(a) * rr + (azar() - 0.5) * 0.1, y + (azar() - 0.5) * 0.24, Math.sin(a) * rr, 0.22 + azar() * 0.07]);
      }
      if (Rr > 0.45 && azar() > 0.3) bayas.push([(azar() - 0.5) * 0.2, y, (azar() - 0.5) * 0.2, 0.25]);
    }
    const geoBaya = lite ? new THREE.SphereGeometry(1, 18, 12) : new THREE.SphereGeometry(1, 40, 28);
    const inst = new THREE.InstancedMesh(geoBaya, uva, bayas.length);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s3 = new THREE.Vector3(), p3 = new THREE.Vector3();
    bayas.forEach((b, i) => {
      p3.set(b[0], b[1], b[2]);
      s3.set(b[3], b[3] * 1.08, b[3]);
      q.setFromEuler(new THREE.Euler(azar() * 6.28, azar() * 6.28, 0));
      m4.compose(p3, q, s3);
      inst.setMatrixAt(i, m4);
    });
    racimo.add(inst);

    const madera = new THREE.MeshStandardMaterial({ color: 0x5a4126, roughness: 0.85 });
    const raspon = new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 1.4, 0), new THREE.Vector3(0.05, 1.9, 0.05),
          new THREE.Vector3(0.25, 2.3, -0.05), new THREE.Vector3(0.6, 2.55, 0),
        ]),
        40, 0.045, 8,
      ),
      madera,
    );
    racimo.add(raspon);

    // hoja de vid: cinco lóbulos
    const hojaShape = new THREE.Shape();
    const lob = [[0, 1], [0.62, 0.78], [0.95, 0.22], [0.5, -0.25], [0, -0.05], [-0.5, -0.25], [-0.95, 0.22], [-0.62, 0.78]];
    hojaShape.moveTo(0, -0.42);
    lob.forEach(([x, y], i) => {
      const prev = i === 0 ? [0, -0.42] : lob[i - 1];
      hojaShape.quadraticCurveTo((prev[0] + x) * 0.5 + x * 0.25, (prev[1] + y) * 0.5 + y * 0.25, x, y);
    });
    hojaShape.quadraticCurveTo(0.2, -0.3, 0, -0.42);
    const hoja = new THREE.Mesh(
      new THREE.ShapeGeometry(hojaShape, 24),
      new THREE.MeshPhysicalMaterial({ color: 0x2f3b1a, roughness: 0.7, sheen: 0.25, sheenColor: new THREE.Color(0xc9a227), side: THREE.DoubleSide }),
    );
    hoja.scale.setScalar(1.25);
    hoja.position.set(-0.75, 1.85, -0.9);
    hoja.rotation.set(-0.15, 0.35, 0.55);
    racimo.add(hoja);

    const clave = new THREE.DirectionalLight(0xffe2b8, 2.2);
    clave.position.set(3, 4, 5);
    hero.add(clave);
    const contra = new THREE.DirectionalLight(ORO, 3.0);
    contra.position.set(-4, 1.5, -3);
    hero.add(contra);
    hero.add(new THREE.AmbientLight(0xffffff, 0.15));
    racimo.position.set(1.15, -0.1, 0);

    // muelle: tensión 170, fricción 26
    const muelle = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
    let ultimoToque = 0;
    let arrastre: { x: number; y: number; tx: number; ty: number } | null = null;
    escuchar(window, "pointermove", ((e: PointerEvent) => {
      if (e.pointerType === "touch" && !arrastre) return;
      if (arrastre) {
        muelle.tx = arrastre.tx + ((e.clientX - arrastre.x) / innerWidth) * 1.6;
        muelle.ty = arrastre.ty + ((e.clientY - arrastre.y) / innerHeight) * 1.2;
      } else {
        muelle.tx = (e.clientX / innerWidth - 0.5) * 0.9;
        muelle.ty = (e.clientY / innerHeight - 0.5) * 0.55;
      }
      ultimoToque = performance.now();
    }) as EventListener, { passive: true });
    escuchar($("#hero")!, "pointerdown", ((e: PointerEvent) => {
      if (e.pointerType === "touch") arrastre = { x: e.clientX, y: e.clientY, tx: muelle.tx, ty: muelle.ty };
    }) as EventListener);
    escuchar(window, "pointerup", () => {
      arrastre = null;
    });

    /* ===== 2 · fondo de hileras (detrás de Trazabilidad): un único shader ===== */
    const zoom = new THREE.Scene();
    const camOrto = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uZoom = {
      uRes: { value: new THREE.Vector2(1, 1) }, uLog: { value: 3.2 }, uTime: { value: 0 }, uVino: { value: 0 }, uFondo: { value: 0 },
      cOro: { value: ORO }, cVino: { value: VINO }, cNegro: { value: NEGRO }, cCrema: { value: CREMA },
    };
    const matZoom = new THREE.ShaderMaterial({
      uniforms: uZoom,
      depthTest: false,
      depthWrite: false,
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }`,
      fragmentShader: /* glsl */ `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 uRes; uniform float uLog, uTime, uVino, uFondo;
      uniform vec3 cOro, cVino, cNegro, cCrema;
      float h1(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      vec2 h2(vec2 p){ return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453); }
      float ns(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
        return mix(mix(h1(i),h1(i+vec2(1,0)),u.x),mix(h1(i+vec2(0,1)),h1(i+vec2(1,1)),u.x),u.y); }
      float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*ns(p); p=p*2.03+vec2(1.7,9.2); a*=.5; } return v; }
      vec3 vor(vec2 x){
        vec2 n=floor(x), f=fract(x), mg=vec2(0.), mr=vec2(0.); float md=8.; vec2 id=vec2(0.);
        for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){ vec2 g=vec2(float(i),float(j)); vec2 r=g+h2(n+g)-f; float d=dot(r,r);
          if(d<md){ md=d; mr=r; mg=g; id=n+g; } }
        float me=8.;
        for(int j=-2;j<=2;j++) for(int i=-2;i<=2;i++){ vec2 g=mg+vec2(float(i),float(j)); vec2 r=g+h2(n+g)-f;
          if(dot(mr-r,mr-r)>1e-5) me=min(me, dot(.5*(mr+r), normalize(r-mr))); }
        return vec3(sqrt(md), me, h1(id));
      }
      vec3 parcelas(vec2 p){
        vec3 v=vor(p/220.);
        vec3 verde=vec3(.20,.25,.12), ocre=vec3(.36,.28,.17), bosque=vec3(.10,.14,.09);
        vec3 c = v.z<.55 ? mix(verde,vec3(.27,.30,.15),fract(v.z*7.)) : (v.z<.8 ? ocre : bosque);
        float ang=v.z*6.283; vec2 d=vec2(cos(ang),sin(ang));
        c*= .82+.18*sin(dot(p,d)/2.4*6.283);
        c*= .7+.6*fbm(p/90.);
        c=mix(c, cOro, smoothstep(2.4/220.,0.,v.y)*.9);
        return c;
      }
      vec3 hileras(vec2 p){
        float fila=abs(fract(p.x/2.4)-.5);
        float copa=smoothstep(.27,.16, fila + .07*(fbm(p*.9)-.5));
        vec3 suelo=mix(vec3(.30,.22,.14),vec3(.42,.33,.21),fbm(p*.35));
        vec3 hoja=mix(vec3(.12,.20,.08),vec3(.30,.38,.15),fbm(p*2.2));
        vec3 c=mix(suelo,hoja,copa);
        float poste=smoothstep(.09,.05,length(vec2(fract(p.x/2.4)-.5, (fract(p.y/6.)-.5)*2.4)));
        c=mix(c,cOro*.7,poste);
        return c*(.85+.3*fbm(p*.12));
      }
      vec3 cepa(vec2 p){
        vec3 v=vor(p*2.6);
        vec3 c=mix(vec3(.10,.18,.07),vec3(.32,.40,.16),v.z);
        c*= .55+.45*smoothstep(0.,.18,v.y);
        float nervio=smoothstep(.03,0.,abs(fract(atan(v.x,v.y)*1.2)-.5)*v.x*.6);
        c+=nervio*.05;
        float tronco=smoothstep(.07,.03,abs(p.x+.12*sin(p.y*2.3)+.05*fbm(p*6.)));
        c=mix(c,vec3(.27,.19,.12)*(.7+.5*fbm(p*14.)),tronco);
        vec3 r=vor(p*1.1+3.);
        float rac=smoothstep(.34,.27,r.x)*step(r.z,.3);
        c=mix(c,cVino*.45*(.6+.6*fbm(p*30.)),rac);
        return c;
      }
      vec3 racimo(vec2 p){
        vec3 v=vor(p/.016);
        float r=.46;
        float n=clamp(1.-pow(v.x/r,2.),0.,1.);
        vec3 piel=mix(vec3(.10,.02,.05),cVino*.75,.3+.5*v.z);
        vec3 c=piel*(.25+.85*sqrt(n));
        vec2 off=fract(p/.016)-.5;
        c+=vec3(.75,.78,.85)*smoothstep(.2,.0,length(off-vec2(-.16,.17)))*n*.35;
        c=mix(c,vec3(.55,.58,.66),.18*n*fbm(p*900.));
        c*=smoothstep(.0,.06,r-v.x+.05);
        return c;
      }
      vec3 baya(vec2 p){
        vec3 v=vor(p/.00055);
        vec3 c=mix(cVino*.55,cVino*.95,v.z);
        c*= .7+.3*smoothstep(0.,.12,v.y);
        float pruina=smoothstep(.55,.85,fbm(p/.0011+uTime*.02));
        c=mix(c,vec3(.62,.64,.72),pruina*.35);
        vec2 q=(vUv-.5)*vec2(uRes.x/uRes.y,1.);
        c+=vec3(1.,.9,.85)*smoothstep(.6,.0,length(q-vec2(-.25,.22)))*.22;
        return c;
      }
      void main(){
        float W=pow(10.,uLog);
        vec2 q=(vUv-.5)*vec2(uRes.x/uRes.y,1.);
        vec2 p=q*W + vec2(13.7,-8.2);
        float L=uLog;
        float w0=exp(-pow((L-3.0)/.42,2.)), w1=exp(-pow((L-1.6)/.42,2.)), w2=exp(-pow((L-.3)/.38,2.)),
              w3=exp(-pow((L+1.0)/.36,2.)),  w4=exp(-pow((L+2.2)/.42,2.));
        float s=w0+w1+w2+w3+w4+1e-4;
        vec3 c=vec3(0.);
        if(w0>.01) c+=parcelas(p)*w0;
        if(w1>.01) c+=hileras(p)*w1;
        if(w2>.01) c+=cepa(p)*w2;
        if(w3>.01) c+=racimo(p)*w3;
        if(w4>.01) c+=baya(p)*w4;
        c/=s;
        vec3 vino=mix(cVino*1.05, cVino*.5, vUv.y*.6+.2*fbm(q*3.+uTime*.05));
        c=mix(c,vino,uVino);
        if(uFondo>0.){
          float pulso=smoothstep(.985,1.,sin((p.y*.35 - uTime*1.6) + floor(p.x/2.4)*1.7));
          float fila=smoothstep(.06,.0,abs(fract(p.x/2.4)-.5)-.0);
          c=mix(c, c*.28 + cOro*pulso*fila*.9, uFondo);
        }
        float vig=smoothstep(1.2,.25,length(q));
        c*=mix(.55,1.,vig);
        gl_FragColor=vec4(c,1.);
        #include <colorspace_fragment>
      }`,
    });
    zoom.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), matZoom));

    /* ===== 3 · la botella ===== */
    const bot = new THREE.Scene();
    bot.environment = entorno;
    const camBot = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    const perfil = [[0, 0], [0.33, 0], [0.37, 0.03], [0.375, 0.12], [0.375, 1.55], [0.368, 1.63], [0.34, 1.76], [0.27, 1.9], [0.19, 2.0], [0.146, 2.08],
      [0.136, 2.18], [0.133, 2.62], [0.145, 2.64], [0.145, 2.73], [0.126, 2.75]];
    const v2 = (a: number[][]) => a.map(([x, y]) => new THREE.Vector2(x, y));
    // en modo ligero, vidrio sin transmisión (evita una pasada de render extra en móviles modestos)
    const vidrio = lite
      ? new THREE.MeshPhysicalMaterial({ color: 0x6f8f72, metalness: 0, roughness: 0.08, clearcoat: 1, envMapIntensity: 1.2,
          transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide })
      : new THREE.MeshPhysicalMaterial({
          color: 0xd6e4d2, metalness: 0, roughness: 0.04, transmission: 1, thickness: 0.3, ior: 1.5,
          attenuationColor: new THREE.Color(0x5f8a62), attenuationDistance: 2.6, envMapIntensity: 1.2, side: THREE.DoubleSide,
          transparent: true,
        });
    const botella = new THREE.Group();
    bot.add(botella);
    botella.add(new THREE.Mesh(new THREE.LatheGeometry(v2(perfil), 96), vidrio));

    const nivelVino = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.02);
    const perfilVino = perfil.slice(0, 13).map(([x, y]) => [Math.max(0, x * 0.93 - 0.008), Math.min(y, 2.55)]);
    const vinoMat = new THREE.MeshPhysicalMaterial({ color: 0x4a0f1c, roughness: 0.15, clearcoat: 1, clippingPlanes: [nivelVino], side: THREE.DoubleSide });
    botella.add(new THREE.Mesh(new THREE.LatheGeometry(v2(perfilVino), 96), vinoMat));
    const superficie = new THREE.Mesh(new THREE.CircleGeometry(1, 64), new THREE.MeshPhysicalMaterial({ color: 0x6d1a2c, roughness: 0.1, clearcoat: 1 }));
    superficie.rotation.x = -Math.PI / 2;
    botella.add(superficie);
    const radioEn = (y: number) => {
      for (let i = 1; i < perfilVino.length; i++) {
        const [x0, y0] = perfilVino[i - 1], [x1, y1] = perfilVino[i];
        if (y <= y1) return x0 + (x1 - x0) * ((y - y0) / Math.max(1e-4, y1 - y0));
      }
      return perfilVino[perfilVino.length - 1][0];
    };

    // etiqueta pintada en un canvas
    const lienzo = document.createElement("canvas");
    lienzo.width = 1024;
    lienzo.height = 512;
    const g = lienzo.getContext("2d")!;
    const logoImg = new Image();
    const texEtiqueta = new THREE.CanvasTexture(lienzo);
    texEtiqueta.colorSpace = THREE.SRGBColorSpace;
    texEtiqueta.anisotropy = 8;
    const pintarEtiqueta = () => {
      g.fillStyle = "#F5F0E8";
      g.fillRect(0, 0, 1024, 512);
      g.fillStyle = "#C9A227";
      g.fillRect(0, 34, 1024, 3);
      g.fillRect(0, 475, 1024, 3);
      g.textAlign = "center";
      // franja oscura con el logo (el lockup tiene el fondo recortado y en crema perdería sus sombras)
      g.fillStyle = "#0B0A14";
      g.fillRect(0, 52, 1024, 176);
      if (logoImg.complete && logoImg.naturalWidth) {
        const h = 150, w = h * (logoImg.naturalWidth / logoImg.naturalHeight);
        g.drawImage(logoImg, 512 - w / 2, 65, w, h);
      } else {
        g.fillStyle = "#C9A227";
        g.font = '500 92px Georgia, "Times New Roman", serif';
        g.fillText("DATUVA", 512, 172);
      }
      g.font = 'italic 400 46px Georgia, "Times New Roman", serif';
      g.fillStyle = "#7C2D3E";
      g.fillText("Vino tinto · Añada 2026", 512, 290);
      g.font = "500 24px ui-monospace, Menlo, Consolas, monospace";
      g.fillStyle = "#0B0A14";
      g.fillText("LOTE L2026E1", 512, 350);
      g.fillStyle = "#6b665e";
      g.fillText("ETIQUETA DE EJEMPLO", 512, 392);
      texEtiqueta.needsUpdate = true;
    };
    logoImg.onload = () => pintarEtiqueta();
    logoImg.src = logo;
    const etiqueta = new THREE.Mesh(
      new THREE.CylinderGeometry(0.381, 0.381, 0.66, 96, 1, true, -Math.PI * 0.58, Math.PI * 1.16),
      new THREE.MeshStandardMaterial({ map: texEtiqueta, roughness: 0.75, transparent: true, opacity: 0 }),
    );
    etiqueta.position.y = 0.8;
    etiqueta.rotation.y = 0.5;
    botella.add(etiqueta);
    pintarEtiqueta();

    const capsula = new THREE.Mesh(
      new THREE.CylinderGeometry(0.152, 0.152, 0.26, 48),
      new THREE.MeshPhysicalMaterial({ color: VINO, roughness: 0.35, metalness: 0.4, clearcoat: 0.6 }),
    );
    botella.add(capsula);

    // sombra de contacto
    const sombraTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const x = c.getContext("2d")!;
      const gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, "rgba(0,0,0,.75)");
      gr.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = gr;
      x.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    })();
    const sombra = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.6), new THREE.MeshBasicMaterial({ map: sombraTex, transparent: true, depthWrite: false }));
    sombra.rotation.x = -Math.PI / 2;
    sombra.position.y = 0.002;
    botella.add(sombra);
    const reflejoMat = new THREE.MeshBasicMaterial({ color: VINO, transparent: true, opacity: 0, depthWrite: false, map: sombraTex });
    const reflejo = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), reflejoMat);
    reflejo.rotation.x = -Math.PI / 2;
    reflejo.position.y = 0.001;
    bot.add(reflejo);

    const k2 = new THREE.SpotLight(0xffe6c4, 26, 14, 0.45, 0.6);
    k2.position.set(2.5, 5, 3);
    k2.target.position.set(0, 1, 0);
    bot.add(k2, k2.target);
    const r2 = new THREE.DirectionalLight(ORO, 2.4);
    r2.position.set(-3, 2, -2.5);
    bot.add(r2);

    /* ===== estado de scroll ===== */
    const est = { bot: 0 };
    ctx.add(() => {
      ScrollTrigger.create({ trigger: $("#botella"), start: "top top", end: "bottom bottom", onUpdate: (s) => (est.bot = s.progress) });
    });

    const secc = { hero: $("#hero")!, escala: $("#escala")!, traza: $("#traza")!, botella: $("#botella")! };
    const enVista = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < innerHeight;
    };
    const pasosEl = $$("#pasos li");
    const expoOut = gsap.parseEase("expo.out");

    const tam = () => {
      const w = innerWidth, h = innerHeight;
      R.setSize(w, h, false);
      camHero.aspect = camBot.aspect = w / h;
      camHero.updateProjectionMatrix();
      camBot.updateProjectionMatrix();
      uZoom.uRes.value.set(w, h);
      racimo.position.x = w < 860 ? 0.35 : 1.55;
      racimo.position.y = w < 860 ? 0.55 : -0.05;
      racimo.scale.setScalar(w < 860 ? 0.6 : 1);
    };
    escuchar(window, "resize", tam);
    tam();

    const reloj = new THREE.Clock();
    let ant = performance.now();
    const cuadro = () => {
      const ahora = performance.now();
      const dt = Math.min(0.05, (ahora - ant) / 1000);
      ant = ahora;
      const t = reloj.getElapsedTime();
      uZoom.uTime.value = t;

      let modo = "nada";
      if (enVista(secc.hero) && secc.hero.getBoundingClientRect().bottom > innerHeight * 0.35) modo = "hero";
      else if (enVista(secc.escala) && secc.escala.getBoundingClientRect().bottom > innerHeight * 0.5) modo = "zoom";
      else if (enVista(secc.traza)) modo = "fondo";
      else if (enVista(secc.botella)) modo = "botella";

      if (modo === "hero") {
        // si nadie toca, se mece sola
        if (performance.now() - ultimoToque > 2500) {
          muelle.tx = Math.sin(t * 0.5) * 0.22;
          muelle.ty = Math.sin(t * 0.37) * 0.08;
        }
        const k = 170, c = 26;
        muelle.vx += (k * (muelle.tx - muelle.x) - c * muelle.vx) * dt;
        muelle.vy += (k * (muelle.ty - muelle.y) - c * muelle.vy) * dt;
        muelle.x += muelle.vx * dt;
        muelle.y += muelle.vy * dt;
        racimo.rotation.y = muelle.x * 1.2 + t * (reduce ? 0 : 0.08);
        racimo.rotation.x = muelle.y * 0.6;
        racimo.rotation.z = -muelle.x * 0.15 + Math.sin(t * 0.9) * 0.02;
        const salida = Math.max(0, -secc.hero.getBoundingClientRect().top / innerHeight);
        camHero.position.z = 9 - salida * 4;
        canvas.style.opacity = "1";
        R.render(hero, camHero);
      } else if (modo === "zoom") {
        // la sección del mapa es solo el mapa real: el lienzo WebGL no dibuja nada
        canvas.style.opacity = "0";
      } else if (modo === "fondo" && lite) {
        canvas.style.opacity = "0";
      } else if (modo === "fondo") {
        uZoom.uLog.value = 1.35 + Math.sin(t * 0.05) * 0.05;
        uZoom.uVino.value = 0;
        uZoom.uFondo.value = 1;
        canvas.style.opacity = "1";
        R.render(zoom, camOrto);
      } else if (modo === "botella") {
        const p = est.bot;
        const llenado = gsap.utils.clamp(0, 1, p / 0.55);
        const nivel = 0.05 + llenado * 2.0;
        nivelVino.constant = nivel;
        superficie.position.y = nivel;
        superficie.scale.setScalar(Math.max(0.001, radioEn(nivel)));
        superficie.visible = llenado > 0.01;
        const et = gsap.utils.clamp(0, 1, (p - 0.5) / 0.22);
        (etiqueta.material as THREE.MeshStandardMaterial).opacity = et;
        etiqueta.position.y = 0.8 + (1 - et) * 0.12;
        const cap = gsap.utils.clamp(0, 1, (p - 0.72) / 0.18);
        capsula.position.y = 2.66 + (1 - expoOut(cap)) * 1.6;
        capsula.visible = cap > 0;
        reflejoMat.opacity = 0.25 * llenado;
        const ang = -0.9 + p * 1.5 + (reduce ? 0 : Math.sin(t * 0.3) * 0.03);
        const mov = innerWidth < 860;
        const dist = (mov ? 9.4 : 7.6) - p * 1.2;
        camBot.position.set(Math.sin(ang) * dist, 1.6 + p * 0.3, Math.cos(ang) * dist);
        camBot.lookAt(mov ? 0 : -0.75, mov ? 1.0 : 1.4, 0);
        pasosEl.forEach((li, i) => li.classList.toggle("on", p >= [0, 0.45, 0.7][i]));
        canvas.style.opacity = "1";
        R.render(bot, camBot);
      } else {
        canvas.style.opacity = "0";
      }
      raf = requestAnimationFrame(cuadro);
    };
    raf = requestAnimationFrame(cuadro);

    limpiezas.push(() => {
      cancelAnimationFrame(raf);
      [hero, zoom, bot].forEach((esc) =>
        esc.traverse((o: THREE.Object3D) => {
          const m = o as THREE.Mesh;
          if (m.geometry) m.geometry.dispose();
          const mat = m.material as THREE.Material | THREE.Material[] | undefined;
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
          else mat?.dispose();
        }),
      );
      texEtiqueta.dispose();
      sombraTex.dispose();
      entorno.dispose();
      pmrem.dispose();
      R.dispose();
    });
  } else {
    // sin WebGL los pasos de la botella siguen al scroll igualmente
    const pasosEl = $$("#pasos li");
    ctx.add(() => {
      ScrollTrigger.create({
        trigger: $("#botella"), start: "top top", end: "bottom bottom",
        onUpdate: (s) => pasosEl.forEach((li, i) => li.classList.toggle("on", s.progress >= [0, 0.45, 0.7][i])),
      });
    });
  }

  /* ---------------- el mapa real de la app, al ritmo del scroll ----------------
     45 fotogramas del Mapa de Parcelas 3D (de zoom 6 a 17). El acercamiento termina
     en el viñedo 3D: el último fotograma se mantiene en el tramo final. */
  const MAPA_N = 45;
  const mapaCv = $<HTMLCanvasElement>("#mapa")!;
  const mapaCtx = mapaCv.getContext("2d")!;
  const panelMapa = $("#pantalla-mapa")!;
  const fotos: (HTMLImageElement | null)[] = [];
  let idxMapa = 0;
  // en modo ligero, la mitad de los fotogramas (≈ 1,3 MB en vez de 2,6 MB); el primero y el último siempre
  const pasoMapa = lite ? 2 : 1;
  const cargarFotos = () => {
    if (fotos.length) return;
    for (let i = 0; i < MAPA_N; i++) {
      if (i % pasoMapa && i !== MAPA_N - 1) {
        fotos.push(null);
        continue;
      }
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        if (Math.abs(i - idxMapa) < 3) pintarMapa(idxMapa);
      };
      im.src = `${base}portada/mapa/m${String(i).padStart(2, "0")}.webp`;
      fotos.push(im);
    }
  };
  const lista = (im: HTMLImageElement | null | undefined) => !!(im && im.complete && im.naturalWidth);
  function pintarMapa(i: number) {
    idxMapa = i;
    let im = fotos[i];
    for (let d = 1; !lista(im) && d < MAPA_N; d++) im = lista(fotos[i - d]) ? fotos[i - d] : fotos[i + d];
    if (!lista(im)) return;
    const r = mapaCv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio, 2);
    const W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
    if (!W || !H) return;
    if (mapaCv.width !== W || mapaCv.height !== H) {
      mapaCv.width = W;
      mapaCv.height = H;
    }
    const k = Math.max(W / im!.naturalWidth, H / im!.naturalHeight), w = im!.naturalWidth * k, h = im!.naturalHeight * k;
    mapaCtx.drawImage(im!, (W - w) / 2, (H - h) / 2, w, h);
  }

  const numEl = $("#esc-num")!, txtEl = $("#esc-txt")!, aumEl = $("#aum")!;
  const barraT = $("#barra-t")!, barraI = $("#barra-i")!;
  const etapasEl = $$("#etapas li");
  const TEXTOS = [
    "<b>El mapa de la app.</b> Tus parcelas sobre la foto de satélite, con los límites del Catastro.",
    "<b>Parcelas.</b> La app las busca en el Catastro por su polígono y parcela y las coloca en el mapa.",
    "<b>Viñedo en 3D.</b> Toca la parcela y apunta allí mismo un trabajo, un tratamiento o una muestra.",
  ];
  const fmt = (v: number, d: number) => v.toLocaleString("es-ES", { minimumFractionDigits: d, maximumFractionDigits: d });
  const medida = (m: number): [string, string] => {
    if (m >= 1000) return [fmt(m / 1000, m < 10000 ? 1 : 0), "km"];
    if (m >= 1) return [fmt(m, m < 10 ? 1 : 0), "m"];
    if (m >= 0.01) return [fmt(m * 100, m < 0.1 ? 1 : 0), "cm"];
    return [fmt(m * 1000, 1), "mm"];
  };
  const ANCHO_INICIAL = (360 * 116800) / 64; // metros que cubre la pantalla del móvil a zoom 6 en Roa (lat. 41,7°)
  let etapaActual = 0;
  const escala = (p: number) => {
    const f = Math.min(1, p / 0.85);
    pintarMapa(Math.round(f * (MAPA_N - 1)));
    const z = 6 + 11 * f;
    const W = (360 * 116800) / Math.pow(2, z);
    const etapa = f < 0.34 ? 0 : f < 0.72 ? 1 : 2;
    const pxPorM = (panelMapa.getBoundingClientRect().width || innerWidth) / W;
    const [n, u] = medida(W);
    numEl.innerHTML = `≈ ${n} <small>${u}</small>`;
    aumEl.textContent = "×" + fmt(ANCHO_INICIAL / W, 0);
    const obj = Math.pow(10, Math.floor(Math.log10(W / 5)));
    const [bn, bu] = medida(obj);
    barraT.textContent = `${bn} ${bu}`;
    barraI.style.width = Math.min(240, obj * pxPorM) + "px";
    if (etapa !== etapaActual) {
      etapaActual = etapa;
      etapasEl.forEach((li, i) => li.classList.toggle("on", i === etapa));
      txtEl.innerHTML = TEXTOS[etapa];
      if (!reduce) gsap.fromTo(txtEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    }
  };
  ctx.add(() => {
    ScrollTrigger.create({ trigger: $("#escala"), start: "top 250%", once: true, onEnter: cargarFotos });
    ScrollTrigger.create({
      trigger: $("#escala"), start: "top top", end: "bottom bottom",
      onUpdate: (st) => escala(st.progress), onRefresh: (st) => escala(st.progress),
    });
  });
  escuchar(window, "resize", () => pintarMapa(idxMapa));

  ctx.add(() => {
    if (reduce) return;
    /* trazabilidad: los pasos se encienden al entrar (desde un estado visible) */
    gsap.fromTo("#traza .recorrido li", { opacity: 0.35, x: -8 }, {
      opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
      scrollTrigger: { trigger: "#traza .recorrido", start: "top 80%", once: true },
    });

    /* cifras y gráficos */
    $$(".cifra").forEach((c) => {
      const span = c.querySelector("[data-n]") as HTMLElement, fin = +span.dataset.n!;
      const path = c.querySelector("path") as SVGPathElement;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      ScrollTrigger.create({
        trigger: c, start: "top 85%", once: true,
        onEnter: () => {
          gsap.fromTo({ v: 0 }, { v: 0 }, {
            v: fin, duration: 1.6, ease: "power3.out",
            onUpdate() { span.textContent = String(Math.round(this.targets()[0].v)); },
          });
          gsap.to(path, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" });
        },
      });
    });
    /* el río se traza */
    $$(".mapa .rio").forEach((r) => {
      gsap.set(r, { strokeDasharray: 1, strokeDashoffset: 1 });
      ScrollTrigger.create({
        trigger: "#bierzo", start: "top 70%", once: true,
        onEnter: () => gsap.to(r, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }),
      });
    });
    /* la app: los móviles flotan a distinta velocidad */
    if (innerWidth >= 860) {
      $$(".movil").forEach((m, i) => {
        gsap.fromTo(m, { y: 60 + i * 18 }, {
          y: -40 - i * 10, ease: "none",
          scrollTrigger: { trigger: "#app", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }
  });

  // Las imágenes con loading="lazy" y el FAQ cambian alturas: recalcular al cargar.
  const refrescar = () => ScrollTrigger.refresh();
  escuchar(window, "load", refrescar);
  const tRefresco = window.setTimeout(refrescar, 600);
  limpiezas.push(() => window.clearTimeout(tRefresco));

  return () => {
    limpiezas.forEach((f) => f());
    ctx.revert();
    if (tickLenis) gsap.ticker.remove(tickLenis);
    lenis?.destroy();
    raiz.classList.remove("animada", "nav-solida", "no-webgl");
  };
}
