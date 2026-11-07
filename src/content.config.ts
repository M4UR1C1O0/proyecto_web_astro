import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

// Malla curricular: un registro por semestre con sus asignaturas.
const malla = defineCollection({
	loader: file('src/content/malla.json'),
	schema: z.object({
		semestre: z.number().int().positive(),
		asignaturas: z.array(
			z.object({
				codigo: z.string(),
				nombre: z.string(),
				creditos: z.number().int().nonnegative(),
			}),
		),
	}),
});

// Preguntas frecuentes.
const faq = defineCollection({
	loader: file('src/content/faq.json'),
	schema: z.object({
		pregunta: z.string(),
		respuesta: z.string(),
		orden: z.number().int().default(0),
	}),
});

// Áreas donde puede trabajar el egresado.
const campoLaboral = defineCollection({
	loader: file('src/content/campo-laboral.json'),
	schema: z.object({
		titulo: z.string(),
		descripcion: z.string(),
	}),
});

// Fuentes bibliográficas o enlaces citados en el sitio.
const referencias = defineCollection({
	loader: file('src/content/referencias.json'),
	schema: z.object({
		autor: z.string(),
		titulo: z.string(),
		anio: z.number().int(),
		url: z.url().optional(),
	}),
});

export const collections = {
	malla,
	faq,
	'campo-laboral': campoLaboral,
	referencias,
};
