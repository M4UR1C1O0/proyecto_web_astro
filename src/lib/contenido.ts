// Funciones utilitarias para leer contenido y dar formato a fechas.
// Todas tienen tipos explícitos (TypeScript estricto, sin "any").
import { getEntry, type CollectionEntry } from 'astro:content';

/** Identificadores de las secciones definidas en src/content/secciones.json. */
export type IdSeccion =
	| 'portada'
	| 'sobre'
	| 'perfil'
	| 'campo'
	| 'plan'
	| 'admision'
	| 'faq'
	| 'respaldo'
	| 'referencias'
	| 'llamado';

/**
 * Devuelve los textos de una sección. Si la sección no existe en el JSON,
 * detiene el build con un mensaje claro en vez de publicar una sección vacía.
 */
export async function obtenerSeccion(id: IdSeccion): Promise<CollectionEntry<'secciones'>> {
	const seccion: CollectionEntry<'secciones'> | undefined = await getEntry('secciones', id);
	if (!seccion) {
		throw new Error(`Falta la sección "${id}" en src/content/secciones.json`);
	}
	return seccion;
}

/** Ordena por el campo "orden" de menor a mayor (sin modificar el arreglo original). */
export function porOrden<T extends { data: { orden: number } }>(entradas: T[]): T[] {
	return [...entradas].sort((a, b) => a.data.orden - b.data.orden);
}

// Formato de fecha en español de Chile, por ejemplo "30 de noviembre de 2026".
// Se usa UTC para que la fecha no cambie según la zona horaria del computador que compila.
const formatoFecha: Intl.DateTimeFormat = new Intl.DateTimeFormat('es-CL', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC',
});

/** Convierte "2026-11-30" en "30 de noviembre de 2026". */
export function fechaLarga(iso: string): string {
	return formatoFecha.format(new Date(`${iso}T00:00:00Z`));
}

/** Texto de un rango de fechas: "30 de noviembre de 2026 al 2 de diciembre de 2026". */
export function rangoFechas(desde: string, hasta?: string): string {
	return hasta ? `${fechaLarga(desde)} al ${fechaLarga(hasta)}` : fechaLarga(desde);
}

/**
 * Clave de orden APA 7 para la fecha de una referencia: primero las obras sin fecha (s.f.),
 * luego por año; dentro de un mismo año, por la letra (2026a antes que 2026b).
 * Ejemplos: "s.f." → "0000", "s.f.-b" → "0000b", "2022, 2 de agosto" → "2022", "2026a" → "2026a".
 */
export function claveFechaApa(fecha: string): string {
	if (fecha.startsWith('s.f.')) {
		return `0000${fecha.replace('s.f.', '').replace('-', '')}`;
	}
	return fecha.split(',')[0].trim();
}

/** Ordena referencias según APA 7: autor alfabético y, para el mismo autor, por fecha. */
export function ordenApa<T extends { data: { autor: string; fecha: string } }>(referencias: T[]): T[] {
	return [...referencias].sort(
		(a, b) =>
			a.data.autor.localeCompare(b.data.autor, 'es') ||
			claveFechaApa(a.data.fecha).localeCompare(claveFechaApa(b.data.fecha)),
	);
}
