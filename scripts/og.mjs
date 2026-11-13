// Genera public/og.png (1200x630 px), la imagen que aparece al compartir el sitio en redes y mensajería.
// Es una imagen propia: solo texto y colores del Manual de identidad visual UTEM 2026 (F15), sin logos.
// Uso: npm run og   (requiere "sharp", que ya viene instalado con Astro)
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

// Ruta de salida, relativa a este archivo.
const salida = fileURLToPath(new URL('../public/og.png', import.meta.url));

// Imagen en SVG: fondo azul complementario, franja celeste (Facultad de Ingeniería) y texto blanco.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0b2341"/>
  <rect y="600" width="1200" height="30" fill="#00b6ed"/>
  <rect x="80" y="110" width="120" height="10" fill="#78bf26"/>
  <text x="80" y="200" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#00b6ed" font-weight="700">UNIVERSIDAD TECNOLÓGICA METROPOLITANA</text>
  <text x="80" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="84" fill="#ffffff" font-weight="800">Ingeniería en</text>
  <text x="80" y="395" font-family="Segoe UI, Arial, sans-serif" font-size="84" fill="#ffffff" font-weight="800">Informática</text>
  <text x="80" y="480" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#dbe6f3">Plan de estudios, campo laboral y Admisión 2027</text>
  <text x="80" y="530" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#dbe6f3">Cada dato con su fuente oficial · Proyecto académico</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(salida);
console.log(`Imagen generada: ${salida}`);
