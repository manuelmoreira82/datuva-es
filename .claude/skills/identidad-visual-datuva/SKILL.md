---
name: identidad-visual-datuva
description: Paleta y tokens de la web comercial de Datuva. Úsalo al crear o modificar cualquier sección o componente, al elegir colores o clases de Tailwind, y siempre que la tarea hable de rediseñar, modernizar o mejorar el aspecto de la web. Tiene prioridad sobre cualquier skill de diseño genérica.
---

# Identidad visual de la web

## Precedencia

Si otra skill de diseño (`frontend-design` o similar) propone una dirección estética
distinta, **los colores y tipografías de aquí ganan**. Esas skills están para ayudarte
con composición, jerarquía, ritmo y copy — no para reasignar la paleta de una marca que
ya existe y que comparte identidad con la aplicación.

Aviso concreto: alguna skill de diseño marca «fondo cream ≈#F4F1EA + serif de alto
contraste + acento terracota» como un default de IA a evitar. Aquí el cream `#F5F0E8`
**es la marca**, y la comparte con la app. No lo cambies por evitar parecerte a un
patrón. Lo que sí puedes hacer distinto: composición, tipo de retícula, tratamiento de
las imágenes, densidad, ritmo de secciones.

## Paleta

| Nombre | Hex | Token |
|---|---|---|
| Negro | `#0B0A14` | — |
| Dorado | `#C9A227` | `--gold`, `--secondary`, `--accent` |
| Cream | `#F5F0E8` | `--cream`, `--background` |
| Azul oscuro | `#1B2A4A` | `--primary` |
| Vino | `#7C2D3E` | `--bordeaux` |

Los tokens viven en `src/index.css` como HSL. **Usa las clases de Tailwind
(`bg-primary`, `text-foreground`, `bg-card`), no hex sueltos en el JSX.**

## Nada de morados

`--primary` estuvo en **hue 301** y pintó de morado todos los titulares y CTAs de la
web. Es el error visual más caro que ha tenido este repo. `--bordeaux` tenía el mismo
problema.

**Si ves un hue entre 270 y 320 en un token de marca, es un bug, no una decisión.**
Los valores correctos hoy: `--primary: 221 47% 20%` · `--bordeaux: 347 47% 33%`.

## Tipografía

Playfair Display (display) + Inter (texto), cargadas desde Google Fonts en
`src/index.css`. Cambiarlas es una decisión de marca: propónlo, no lo hagas.

## Reglas de repo

- **No introducir librerías nuevas** sin proponerlo antes.
- shadcn/ui es la base de componentes; está en `src/components/ui`.
- **Trabajar siempre en rama.** `main` despliega producción.

## Trampas de assets

- **`og-image.png` pesa 1,1 MB.** Por encima de ~300 KB WhatsApp no renderiza la
  miniatura al compartir, y WhatsApp es canal de captación. Objetivo: < 300 KB
  manteniendo 1200×630.
- Hay assets sin usar y pesados en `src/assets` (`datuva-logo.jpg` 1,7 MB,
  `hero-bodega.jpg` 2,3 MB). **No afectan al bundle** — Vite solo empaqueta lo
  importado — pero engordan el repo. No los borres sin comprobar que nadie los importa.
