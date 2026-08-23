import type { Unit } from "@/types/learning";

export const units: Unit[] = [
  {
    id: "es-u1",
    languageId: "es",
    title: "Basics 1",
    description: "Greetings, introductions, and everyday courtesy words.",
    order: 1,
    color: "#58CC02",
    image: "https://picsum.photos/seed/es-u1/800/600",
  },
  {
    id: "fr-u1",
    languageId: "fr",
    title: "Basics 1",
    description: "Greetings, introductions, and everyday courtesy words.",
    order: 1,
    color: "#1CB0F6",
    image: "https://picsum.photos/seed/fr-u1/800/600",
  },
  {
    id: "ja-u1",
    languageId: "ja",
    title: "Basics 1",
    description: "Greetings, introductions, and everyday courtesy words.",
    order: 1,
    color: "#FF4B4B",
    image: "https://picsum.photos/seed/ja-u1/800/600",
  },
];

export function getUnitsByLanguage(languageId: string): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
