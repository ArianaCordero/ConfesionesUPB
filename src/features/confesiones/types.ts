export type Category = "amor" | "academico" | "random" | "confesion";

export type Facultad =
  | "Ingeniería y Tecnología"
  | "Economía y Negocios"
  | "Ciencias Sociales"
  | "Diseño y Arquitectura"
  | "Ciencias de la Salud"
  | "Derecho";

export const FACULTADES_DISPONIBLES: Facultad[] = [
  "Ingeniería y Tecnología",
  "Economía y Negocios",
  "Ciencias Sociales",
  "Diseño y Arquitectura",
  "Ciencias de la Salud",
  "Derecho",
];

export type Carrera =
  // FIA - Facultad de Ingenierías y Arquitectura
  | "Arquitectura"
  | "Ingeniería Civil"
  | "Ingeniería Electromecánica"
  | "Ingeniería del Medio Ambiente y Energías Alternativas"
  | "Ingeniería de la Producción"
  | "Ingeniería de Sistemas"
  | "Ingeniería de Petróleo y Gas Natural"
  | "Ingeniería de Sistemas Electrónicos y Telecomunicaciones"
  | "Ingeniería Industrial y de Sistemas"
  | "Inteligencia Artificial"
  // FACED - Facultad de Ciencias Empresariales y Derecho
  | "Administración de Empresas"
  | "Analítica Gerencial de Datos"
  | "Economía"
  | "Ingeniería Comercial"
  | "Ingeniería Financiera"
  | "Marketing y Logística"
  | "Relaciones y Negocios Internacionales"
  | "Derecho"
  | "Psicología Organizacional";

export const CARRERAS_DISPONIBLES: Carrera[] = [
  // FIA
  "Arquitectura",
  "Ingeniería Civil",
  "Ingeniería Electromecánica",
  "Ingeniería del Medio Ambiente y Energías Alternativas",
  "Ingeniería de la Producción",
  "Ingeniería de Sistemas",
  "Ingeniería de Petróleo y Gas Natural",
  "Ingeniería de Sistemas Electrónicos y Telecomunicaciones",
  "Ingeniería Industrial y de Sistemas",
  "Inteligencia Artificial",
  // FACED
  "Administración de Empresas",
  "Analítica Gerencial de Datos",
  "Economía",
  "Ingeniería Comercial",
  "Ingeniería Financiera",
  "Marketing y Logística",
  "Relaciones y Negocios Internacionales",
  "Derecho",
  "Psicología Organizacional",
];

// Tipos para las grandes facultades
export type FacultadGrande = "FIA" | "FACED";

// Clasificación de carreras por FIA (Ingeniería y Arquitectura) y FACED
export const CARRERAS_FIA: Carrera[] = [
  "Arquitectura",
  "Ingeniería Civil",
  "Ingeniería Electromecánica",
  "Ingeniería del Medio Ambiente y Energías Alternativas",
  "Ingeniería de la Producción",
  "Ingeniería de Sistemas",
  "Ingeniería de Petróleo y Gas Natural",
  "Ingeniería de Sistemas Electrónicos y Telecomunicaciones",
  "Ingeniería Industrial y de Sistemas",
  "Inteligencia Artificial",
];

export const CARRERAS_FACED: Carrera[] = [
  "Administración de Empresas",
  "Analítica Gerencial de Datos",
  "Economía",
  "Ingeniería Comercial",
  "Ingeniería Financiera",
  "Marketing y Logística",
  "Relaciones y Negocios Internacionales",
  "Derecho",
  "Psicología Organizacional",
];

// Función para obtener la facultad grande de una carrera
export function getFacultadGrande(carrera: string): FacultadGrande {
  // Verificar si es una ingeniería o arquitectura
  const carreraLower = carrera.toLowerCase();

  // Lista de palabras clave para FIA
  const palabrasFIA = ['ingeniería', 'ingenieria', 'arquitectura', 'inteligencia artificial'];

  // Excepciones que van a FACED aunque contengan "ingeniería"
  const excepcionesFACED = ['ingeniería comercial', 'ingenieria comercial', 'ingeniería financiera', 'ingenieria financiera'];

  // Verificar excepciones primero
  if (excepcionesFACED.some(exc => carreraLower.includes(exc))) {
    return "FACED";
  }

  // Verificar si es de FIA por las listas oficiales
  if (CARRERAS_FIA.includes(carrera as Carrera)) {
    return "FIA";
  }

  // Verificar por palabras clave
  if (palabrasFIA.some(palabra => carreraLower.includes(palabra))) {
    return "FIA";
  }

  // Por defecto, FACED
  return "FACED";
}

export const CARRERAS_POR_FACULTAD: Record<Facultad, Carrera[]> = {
  "Ingeniería y Tecnología": [
    "Ingeniería Civil",
    "Ingeniería Electromecánica",
    "Ingeniería del Medio Ambiente y Energías Alternativas",
    "Ingeniería de la Producción",
    "Ingeniería de Sistemas",
    "Ingeniería de Petróleo y Gas Natural",
    "Ingeniería de Sistemas Electrónicos y Telecomunicaciones",
    "Ingeniería Industrial y de Sistemas",
    "Inteligencia Artificial",
  ],
  "Economía y Negocios": [
    "Administración de Empresas",
    "Analítica Gerencial de Datos",
    "Economía",
    "Ingeniería Comercial",
    "Ingeniería Financiera",
    "Marketing y Logística",
    "Relaciones y Negocios Internacionales",
    "Psicología Organizacional",
  ],
  "Ciencias Sociales": [],
  "Diseño y Arquitectura": [
    "Arquitectura",
  ],
  "Ciencias de la Salud": [],
  "Derecho": [
    "Derecho",
  ],
};

export type Confesion = {
  id: number;
  content: string;
  category: Category;
  carrera: string;
  date: number;
  likes: number;
  image?: any;
  nexo?: string;
};
