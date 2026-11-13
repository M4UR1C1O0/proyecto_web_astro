# Registro de cambios

## 2026-11-12

- Secciones en el orden de la Fase C: portada, sobre la carrera, perfil, campo laboral, plan, admisión, preguntas, respaldo y referencias.
- Datos oficiales cargados en `src/content/` con esquemas: cifras con período y fuentes, malla (F02), perfil de egreso, campo laboral, ponderaciones y fechas de Admisión 2027 (DEMRE), carreras afines, laboratorios y 16 referencias APA 7.
- Se excluye la fuente F12 (USACH); la comparación usa dos carreras afines de la UTEM (F20, F21).
- Diseño con colores del Manual de identidad visual UTEM 2026 (F15), ícono e imagen para redes propios.
- Isla interactiva: filtro de la malla por año, con mejora progresiva.
- SEO: robots.txt, imagen Open Graph, CSS incluido en el HTML.
- Publicación automática en GitHub Pages (`.github/workflows/deploy.yml`).
- Pruebas: Lighthouse 100/100/100/100 (móvil y escritorio, build local), axe-core sin violaciones WCAG 2.2 AA, responsivo 360/768/1280 px.
- README para personas no técnicas e INFORME.md completo (con marcas [completar] para datos del equipo).

## 2026-11-12 (tarde)

- Rediseño visual: portada en celeste de la Facultad de Ingeniería, foto con licencia CC BY-SA 4.0, logo oficial UTEM (con autorización, Anexo I), franja de cifras, banda «Postula 2027» y pie en columnas.
- **Temporal, decisión pendiente del equipo:** «Campo laboral», «Plan de estudios», «Admisión» y «Preguntas frecuentes» se muestran vacías, solo con su ancla. Sus componentes y datos siguen en el proyecto; para restaurarlas, ver los comentarios en `src/pages/index.astro`. Son secciones obligatorias de la propuesta (Fase C).
- Se quita la franja superior del encabezado con el aviso «Proyecto académico… No es el sitio oficial de la UTEM». El aviso se mantiene en el pie de página y en el nombre del sitio para redes (`og:site_name`).
- Capturas de responsivo (360, 768 y 1280 px) tomadas de nuevo con el diseño actual: sin desplazamiento horizontal en los tres anchos.
- **Decisión del equipo:** se ocultan los recuadros «Interpretación del equipo» (interruptor `MOSTRAR` en `src/components/NotaEquipo.astro`). Los textos siguen en `src/content/*.json`. Las citas se muestran en formato discreto (sin la palabra «Fuente:» visible).

## 2026-11-12 (noche)

- La publicación pasa de GitHub Pages a **Vercel** (https://proyecto-web-astro.vercel.app/), para tener vistas previas de la rama `develop` sin tocar `main`.
- Se quita `base: '/proyecto_web_astro'` de `astro.config.mjs` (Vercel publica en la raíz) y se actualiza la dirección del sitio en la configuración, `robots.txt`, README e INFORME.
- Se elimina `.github/workflows/deploy.yml`, que publicaba en GitHub Pages.
