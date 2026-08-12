import logoLockup from "@/assets/datuva-logo-lockup.webp";

/**
 * Logo de Datuva en lockup horizontal.
 *
 * Antes se usaba `datuva-logo-new.webp` directamente: un cuadrado de 1440×1440
 * pensado como icono de app. En cabecera y pie daba tres problemas a la vez:
 *
 *   1. El arte llega al borde del cuadrado, y el `rounded-lg` del `<img>` le
 *      cortaba la «A» final.
 *   2. Traía su propio fondo gris, más claro que el negro de marca, así que
 *      flotaba como una pastilla en vez de integrarse.
 *   3. Al meter un lockup ancho en una caja de 40×40, el nombre quedaba en unos
 *      10 px de alto: ilegible.
 *
 * `datuva-logo-lockup.webp` es el mismo arte recortado a su caja real (ratio
 * 2,4:1) y con el fondo eliminado por clave de croma — el oro tiene R≫B y el
 * fondo gris es neutro, así que se separan limpiamente. Se genera a partir del
 * original; no es un logo nuevo.
 *
 * El fondo es transparente y las sombras neutras del arte se pierden, lo cual no
 * se nota porque todos los sitios donde se usa tienen fondo oscuro. Si algún día
 * hace falta sobre cream, hay que regenerarlo conservando las sombras.
 */
const Logo = ({ className = "h-10" }: { className?: string }) => (
  <img src={logoLockup} alt="Datuva" className={`w-auto ${className}`} />
);

export default Logo;
