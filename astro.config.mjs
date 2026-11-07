// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// URL pública del sitio (GitHub Pages). Se usa para el sitemap y las URLs absolutas de Open Graph.
	site: 'https://m4ur1c1o0.github.io',
	// GitHub Pages publica el repositorio en una subcarpeta con su nombre.
	base: '/proyecto_web_astro',
	// URLs siempre con "/" final, para que cada página tenga una sola dirección (evita duplicados en el sitemap).
	trailingSlash: 'always',
	integrations: [sitemap()],
});
