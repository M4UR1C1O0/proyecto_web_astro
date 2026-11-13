// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// URL pública del sitio (Vercel). Se usa para el sitemap, la URL canónica y las URLs absolutas de Open Graph.
	// Vercel publica el sitio en la raíz del dominio, así que no se necesita "base".
	site: 'https://proyecto-web-astro.vercel.app',
	// URLs siempre con "/" final, para que cada página tenga una sola dirección (evita duplicados en el sitemap).
	trailingSlash: 'always',
	// Incluye el CSS dentro del HTML: el navegador no espera un archivo extra antes de mostrar la página
	// (mejora la métrica "First Contentful Paint" de Lighthouse; el CSS del sitio es pequeño).
	build: {
		inlineStylesheets: 'always',
	},
	integrations: [sitemap()],
});
