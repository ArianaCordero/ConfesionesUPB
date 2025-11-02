import type { Poi } from "@/src/features/maps/types";

// POIs del campus UPB - datos seed locales
const campusPois: Poi[] = [
  {
    id: "1",
    title: "Biblioteca Central",
    description: "Centro de recursos bibliográficos y estudio",
    coordinate: { latitude: 6.2425, longitude: -75.5795 },
    emoji: "📚",
    color: "#4A90E2",
  },
  {
    id: "2",
    title: "Cafetería Principal",
    description: "Zona de alimentación y encuentro",
    coordinate: { latitude: 6.2430, longitude: -75.5800 },
    emoji: "☕",
    color: "#F5A623",
  },
  {
    id: "3",
    title: "Bloque 1 - Aulas",
    description: "Edificio de aulas de pregrado",
    coordinate: { latitude: 6.2420, longitude: -75.5790 },
    emoji: "🏫",
    color: "#7ED321",
  },
  {
    id: "4",
    title: "Zona Deportiva",
    description: "Canchas y gimnasio",
    coordinate: { latitude: 6.2435, longitude: -75.5805 },
    emoji: "⚽",
    color: "#BD10E0",
  },
  {
    id: "5",
    title: "Teatro Camilo Torres",
    description: "Auditorio principal para eventos",
    coordinate: { latitude: 6.2428, longitude: -75.5798 },
    emoji: "🎭",
    color: "#FF6B6B",
  },
  {
    id: "6",
    title: "Parque Central",
    description: "Zona verde de descanso",
    coordinate: { latitude: 6.2427, longitude: -75.5793 },
    emoji: "🌳",
    color: "#50E3C2",
  },
  {
    id: "7",
    title: "Laboratorios de Ingeniería",
    description: "Labs de prácticas e investigación",
    coordinate: { latitude: 6.2422, longitude: -75.5788 },
    emoji: "🔬",
    color: "#9013FE",
  },
  {
    id: "8",
    title: "Centro de Sistemas",
    description: "Salas de cómputo y recursos IT",
    coordinate: { latitude: 6.2433, longitude: -75.5792 },
    emoji: "💻",
    color: "#F8E71C",
  },
];

export async function loadCampusPois(): Promise<Poi[]> {
  // Simula carga asíncrona (para mantener contrato Promise)
  return Promise.resolve(campusPois);
}
