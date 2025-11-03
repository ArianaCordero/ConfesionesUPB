import type { Poi } from "@/src/features/maps/types";

const campusPois: Poi[] = [
  // UPB (La Paz)
  {
    id: "upb-lapaz",
    title: "UPB La Paz (Campus Achocalla)",
    description: "Campus Achocalla",
    coordinate: { latitude: -16.57533, longitude: -68.12708 },
    color: "#003DA5",
  },
  {
    id: "upb-lapaz-postgrado",
    title: "UPB Postgrado La Paz (Obrajes)",
    description: "Obrajes",
    coordinate: { latitude: -16.52472, longitude: -68.11045 },
    color: "#003DA5",
  },

  // UPB (Cochabamba)
  {
    id: "upb-cochabamba",
    title: "UPB Cochabamba (Campus JLP)",
    description: "Campus JLP, Km 6.5",
    coordinate: { latitude: -17.39889, longitude: -66.21850 },
    color: "#003DA5",
  },

  // UPB (Santa Cruz)
  {
    id: "upb-santacruz",
    title: "UPB Santa Cruz (Campus)",
    description: "Prol. Av. Piraí, 6º-7º anillo",
    coordinate: { latitude: -17.72845, longitude: -63.15701 },
    color: "#003DA5",
  },
  {
    id: "upb-santacruz-postgrado",
    title: "UPB Postgrado Santa Cruz",
    description: "Av. Los Cusis",
    coordinate: { latitude: -17.76501, longitude: -63.17310 },
    color: "#003DA5",
  },

  // Puntos juveniles (La Paz)
  {
    id: "megacenter",
    title: "Megacenter (Irpavi)",
    description: "Irpavi",
    coordinate: { latitude: -16.53222, longitude: -68.08723 },
    color: "#E91E63",
  },
  {
    id: "zona-sanmiguel",
    title: "Zona San Miguel (Calacoto)",
    description: "Calacoto",
    coordinate: { latitude: -16.54115, longitude: -68.07828 },
    color: "#FF9800",
  },
  {
    id: "multicine",
    title: "Multicine (San Jorge)",
    description: "Av. Arce 2631",
    coordinate: { latitude: -16.51090, longitude: -68.12210 },
    color: "#9C27B0",
  },
  {
    id: "plaza-abaroa",
    title: "Plaza Abaroa (Sopocachi)",
    description: "Sopocachi",
    coordinate: { latitude: -16.51061, longitude: -68.12674 },
    color: "#4CAF50",
  },
  {
    id: "el-prado",
    title: "El Prado",
    description: "Av. Mariscal Santa Cruz",
    coordinate: { latitude: -16.49965, longitude: -68.13429 },
    color: "#00BCD4",
  },
];

export async function loadCampusPois(): Promise<Poi[]> {
  return Promise.resolve(campusPois);
}

