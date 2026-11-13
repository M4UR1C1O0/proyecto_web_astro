# Landing page · Ingeniería en Informática UTEM

Página web de una sola vista que presenta la carrera de **Ingeniería en Informática** de la Universidad Tecnológica Metropolitana (UTEM) a quienes piensan postular. Cada cifra del sitio indica su año y enlaza a la fuente oficial de donde proviene.

> Proyecto académico de la asignatura EFE685 – Electivo de Computación Móvil (2026). No es un sitio oficial de la UTEM.

- **Sitio publicado:** https://proyecto-web-astro.vercel.app/
- **Repositorio:** https://github.com/M4UR1C1O0/proyecto_web_astro
- **Informe del proyecto:** [INFORME.md](INFORME.md)

---

## 1. ¿Dónde está publicada la página?

En **https://proyecto-web-astro.vercel.app/**, alojada en [Vercel](https://vercel.com/). Se publica sola: cada vez que se guarda un cambio en la rama `main` del repositorio, Vercel compila el sitio y lo actualiza en uno o dos minutos.

Los cambios en otras ramas (por ejemplo `develop`) también se compilan, pero en una **dirección de vista previa** distinta, sin tocar la página principal. Así se puede revisar un cambio antes de publicarlo. El estado de cada publicación y su enlace aparecen junto al commit en GitHub (ícono ✓ o ✗) y en el panel de Vercel.

## 2. ¿Cómo actualizar la información? (sin programar)

Todos los textos y datos están en archivos de la carpeta [`src/content/`](src/content/). No hay que tocar el código para cambiarlos.

| Quiero cambiar… | Archivo |
|---|---|
| Una cifra (empleabilidad, arancel, vacantes, acreditación…) | [`cifras.json`](src/content/cifras.json) |
| Una pregunta frecuente o su respuesta | [`faq.json`](src/content/faq.json) |
| La malla (asignaturas por semestre) | [`malla.json`](src/content/malla.json) |
| Las ponderaciones de admisión | [`ponderaciones.json`](src/content/ponderaciones.json) |
| Las fechas del proceso de admisión | [`fechas.json`](src/content/fechas.json) |
| El perfil de egreso | [`perfil.json`](src/content/perfil.json) |
| Las áreas del campo laboral | [`campo-laboral.json`](src/content/campo-laboral.json) |
| La comparación con carreras afines | [`afines.json`](src/content/afines.json) |
| Los laboratorios | [`laboratorios.json`](src/content/laboratorios.json) |
| Títulos e introducciones de cada sección | [`secciones.json`](src/content/secciones.json) |
| Fotos y sus créditos (autor, licencia, texto alternativo) | [`imagenes.json`](src/content/imagenes.json) + archivo en `src/assets/` |
| Una fuente o referencia (APA 7) | [`referencias.json`](src/content/referencias.json) |

### Paso a paso desde el navegador (GitHub)

1. Abre el archivo en GitHub y presiona el ícono del lápiz (**Edit this file**).
2. Cambia solo el texto que está entre comillas, por ejemplo `"valor": "87,1 %"`.
3. Si cambias una cifra, actualiza también su `"periodo"` (año del dato) y sus `"fuentes"`.
4. Presiona **Commit changes** y escribe qué cambiaste, por ejemplo *"Actualiza arancel 2027"*.
5. Espera uno o dos minutos y revisa la página publicada.

### Reglas que el sitio revisa solo

Al publicar, el sitio **se niega a compilar** si un dato está incompleto. Así se evita publicar información sin respaldo. Por ejemplo, falla si:

- una cifra no tiene `"periodo"` o no tiene `"fuentes"`;
- una cifra cita una fuente (por ejemplo `"F25"`) que no existe en `referencias.json`;
- una ponderación no es un número entre 0 y 100;
- una fecha no tiene el formato `AAAA-MM-DD`.

Si la publicación falla, aparece una ✗ junto al commit en GitHub; al abrirla se llega al registro de Vercel, que indica qué archivo y qué campo revisar. Mientras tanto, la versión anterior del sitio sigue en línea.

### Cómo agregar una fuente nueva

Agrega una entrada en `referencias.json` con un `"id"` nuevo (por ejemplo `"F23"`), en el lugar que le corresponde según el orden alfabético de APA 7. Después úsala en el campo `"fuentes"` del dato que respalda.

## 3. ¿Cómo ejecutar el proyecto en un computador? (equipo técnico)

Requisitos: [Node.js](https://nodejs.org/) versión 24 o superior.

```bash
npm install
```

```bash
npm run dev
```

Abre `http://localhost:4321/` en el navegador. Los cambios en `src/content/` se ven al instante.

Otros comandos:

| Comando | Para qué sirve |
|---|---|
| `npm run build` | Compila el sitio en `dist/` y valida todos los datos. |
| `npm run preview` | Muestra el sitio ya compilado, igual que en internet. |
| `npm run og` | Regenera la imagen para redes sociales (`public/og.png`). |

## 4. Estructura del proyecto

```
src/
  content/            # datos y textos editables (JSON), uno por tipo de contenido
  content.config.ts   # esquemas: reglas que debe cumplir cada dato
  components/         # una pieza .astro por sección (Hero, Malla, Admision, ...)
  layouts/BaseLayout.astro  # <head>, metadatos, encabezado y pie comunes
  lib/contenido.ts    # funciones auxiliares (leer secciones, formato de fechas)
  pages/index.astro   # la página: ordena las secciones
  styles/global.css   # colores y estilos generales (Manual de identidad UTEM 2026)
public/               # favicon, imagen para redes, robots.txt
docs/                 # wireframes y evidencias de pruebas (Lighthouse, capturas)
astro.config.mjs      # configuración: dirección pública del sitio, sitemap
```

## 5. Créditos

- Datos: fuentes oficiales listadas en la sección **Referencias** del sitio y en el Anexo A del informe.
- Logo y colores: Manual de identidad visual UTEM 2026. El logo oficial (`public/logos/`) se usa con autorización; ver Anexo I de [INFORME.md](INFORME.md). No se debe achicar a menos de 200 px de ancho ni modificar.
- Imágenes: foto de la portada «Facultad de Ingeniería UTEM, Ñuñoa, Santiago 20240604», de Carlos Figueroa Rojas, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Facultad_de_Ingenier%C3%ADa_UTEM,_%C3%91u%C3%B1oa,_Santiago_20240604.jpg), licencia [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) (reducida y recortada). El ícono, los íconos de las carreras y la imagen para redes son propios.
- Uso de inteligencia artificial: declarado en el Anexo G de [INFORME.md](INFORME.md).
