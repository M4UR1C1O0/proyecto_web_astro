// Esquemas de las colecciones de contenido del sitio.
// Todos los datos editables viven en src/content/*.json y se validan aquí al compilar:
// si un dato no cumple su esquema (campo faltante, tipo incorrecto o fuente inexistente), el build falla.
import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

// ---------------------------------------------------------------------------
// Piezas reutilizables de los esquemas
// ---------------------------------------------------------------------------

// Identificador de fuente de la matriz de la Fase A (F01, F02, ...). Otro formato hace fallar el build.
const idFuente = z.string().regex(/^F\d{2}$/, 'El id debe tener el formato F01, F02, ...');

// Lista de fuentes citadas: al menos una, y cada una debe existir en referencias.json.
const fuentes = z.array(reference('referencias')).min(1);

// Texto redactado por el equipo y no tomado de la fuente (Fase D: dato vs. interpretación).
// En el sitio se muestra siempre con el rótulo "Interpretación del equipo".
const notaEquipo = z.string().min(1).optional();

// Secciones de la página donde puede mostrarse una cifra (orden de la Fase C).
// "franja": cifras de la banda oscura bajo la portada; "insignia": tarjeta flotante sobre la foto;
// "contacto": datos de contacto del pie de página.
const seccion = z.enum(['portada', 'franja', 'insignia', 'sobre', 'plan', 'campo', 'admision', 'respaldo', 'contacto']);

// Íconos propios (SVG) disponibles para las cifras destacadas. Son decorativos.
const icono = z.enum(['empleo', 'dinero', 'escudo', 'personas', 'certificado', 'correo', 'ubicacion']);

// ---------------------------------------------------------------------------
// Colecciones
// ---------------------------------------------------------------------------

// Fuentes citadas en el sitio, en formato APA 7. El id de cada entrada es el de la matriz (F01...).
const referencias = defineCollection({
	loader: file('src/content/referencias.json'),
	schema: z.object({
		id: idFuente,
		autor: z.string(),
		// Sigla del autor para la cita breve en el texto, por ejemplo "UTEM" o "CNA".
		sigla: z.string().optional(),
		// Fecha tal como se escribe en APA: "2022, 2 de agosto", "2025", "s.f.-b".
		fecha: z.string(),
		titulo: z.string(),
		// Tipo de documento entre corchetes, por ejemplo "Folleto" o "Base de datos".
		formato: z.string().optional(),
		// Sitio o editor que aparece después del título, por ejemplo "Mi Futuro".
		sitio: z.string().optional(),
		// Fecha de consulta: solo para páginas sin fecha que cambian con el tiempo (regla APA 7).
		recuperado: z.string().optional(),
		url: z.url(),
	}),
});

// Textos de cada sección (título, pregunta que responde e introducción). Así ningún texto
// queda escrito dentro de los componentes: se edita aquí, igual que los datos.
const secciones = defineCollection({
	loader: file('src/content/secciones.json'),
	schema: z.object({
		titulo: z.string().min(1),
		// Pregunta del público que responde la sección (Fase C).
		pregunta: z.string().min(1),
		intro: z.string().min(1).optional(),
		// Fuentes de la introducción, si contiene datos verificables.
		fuentes: z.array(reference('referencias')).default([]),
		notaEquipo,
		// Recuadro destacado de la portada en celular. Es redacción del equipo (interpretación),
		// no un dato tomado de una fuente: por eso no lleva cita.
		destacado: z.object({ titulo: z.string().min(1), texto: z.string().min(1) }).optional(),
	}),
});

// Cifras y datos verificables. Cada una indica su período y al menos una fuente;
// si falta alguno de los dos, o la fuente no existe, el build falla.
const cifras = defineCollection({
	loader: file('src/content/cifras.json'),
	schema: z.object({
		etiqueta: z.string(),
		valor: z.string(),
		detalle: z.string().optional(),
		periodo: z.string().min(1),
		fuentes,
		secciones: z.array(seccion).min(1),
		// Valor abreviado para la franja de cifras (por ejemplo "$2,2 a 2,3 millones").
		valorCorto: z.string().optional(),
		// Etiqueta corta para la franja de cifras (por ejemplo "Empleabilidad 1.er año").
		etiquetaCorta: z.string().optional(),
		icono: icono.optional(),
		notaEquipo,
		orden: z.number().int().default(0),
	}),
});

// Carreras comparadas en "Sobre la carrera": la propia y dos afines de la misma universidad.
const afines = defineCollection({
	loader: file('src/content/afines.json'),
	schema: z.object({
		carrera: z.string(),
		titulo: z.string(),
		grado: z.string(),
		duracionSemestres: z.number().int().positive(),
		// Frase breve, citada textualmente de la fuente, que resume el foco de la carrera.
		enfoque: z.string(),
		fuentes,
		// Ícono decorativo de la tarjeta (dibujos propios en SVG, ver SobreCarrera.astro).
		icono: z.enum(['software', 'sistemas', 'datos']),
		// true solo para la carrera que promociona el sitio (se destaca en la comparación).
		propia: z.boolean().default(false),
		orden: z.number().int().default(0),
	}),
});

// Perfil de egreso: competencias reescritas en lenguaje claro, cada una con su fuente.
// "textoOficial" guarda la redacción original, para que cualquiera pueda comparar.
const perfil = defineCollection({
	loader: file('src/content/perfil.json'),
	schema: z.object({
		competencia: z.string().min(1),
		textoOficial: z.string().min(1),
		fuentes,
		orden: z.number().int().default(0),
	}),
});

// Áreas donde puede trabajar el egresado.
const campoLaboral = defineCollection({
	loader: file('src/content/campo-laboral.json'),
	schema: z.object({
		titulo: z.string(),
		descripcion: z.string(),
		fuentes,
	}),
});

// Malla curricular: un registro por semestre con sus asignaturas.
const malla = defineCollection({
	loader: file('src/content/malla.json'),
	schema: z.object({
		semestre: z.number().int().min(1).max(8),
		// Nombres tal como aparecen en el folleto oficial (F02), que no publica códigos ni créditos por asignatura.
		asignaturas: z.array(z.string().min(1)).min(1),
		fuentes,
	}),
});

// Ponderaciones de admisión: cada prueba con su porcentaje (0 a 100).
const ponderaciones = defineCollection({
	loader: file('src/content/ponderaciones.json'),
	schema: z.object({
		prueba: z.string(),
		porcentaje: z.number().int().min(0).max(100),
		fuentes,
		orden: z.number().int().default(0),
	}),
});

// Fechas clave del proceso de admisión. "fecha" usa el formato AAAA-MM-DD para poder ordenarlas.
const fechas = defineCollection({
	loader: file('src/content/fechas.json'),
	schema: z.object({
		fecha: z.iso.date(),
		// Fecha final, solo cuando el hito dura varios días.
		hasta: z.iso.date().optional(),
		hora: z.string().optional(),
		hito: z.string(),
		fuentes,
	}),
});

// Laboratorios del departamento que imparte la carrera.
const laboratorios = defineCollection({
	loader: file('src/content/laboratorios.json'),
	schema: z.object({
		nombre: z.string(),
		unidad: z.string(),
		fuentes,
	}),
});

// Preguntas frecuentes: preguntas reales de la encuesta de la Fase B (entre 5 y 8, según la propuesta).
const faq = defineCollection({
	loader: file('src/content/faq.json'),
	schema: z.object({
		pregunta: z.string(),
		respuesta: z.string(),
		orden: z.number().int().default(0),
		fuentes,
		notaEquipo,
	}),
});

// Imágenes de terceros con licencia abierta: texto alternativo y crédito obligatorios.
// Si falta el autor, la licencia o el enlace a la fuente, el build falla (regla de la propuesta).
const imagenes = defineCollection({
	loader: file('src/content/imagenes.json'),
	schema: z.object({
		// Nombre del archivo dentro de src/assets/.
		archivo: z.string().regex(/\.(jpe?g|png|webp)$/i),
		// Texto alternativo descriptivo (WCAG 1.1.1).
		alt: z.string().min(20),
		autor: z.string().min(1),
		titulo: z.string().min(1),
		licencia: z.string().min(1),
		licenciaUrl: z.url(),
		fuenteUrl: z.url(),
		// Nombre del sitio de origen que se muestra en el crédito (ej. "Wikimedia Commons", "Archivo del equipo").
		sitio: z.string().min(1).default('Wikimedia Commons'),
		// Qué se modificó de la obra original (exigido por las licencias CC).
		cambios: z.string().min(1),
	}),
});

export const collections = {
	referencias,
	secciones,
	cifras,
	afines,
	perfil,
	'campo-laboral': campoLaboral,
	malla,
	ponderaciones,
	fechas,
	laboratorios,
	faq,
	imagenes,
};
