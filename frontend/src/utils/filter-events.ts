import type { CampusEvent, Category } from "../types/campus-event";

export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  if (!q) return list;
  return list.filter(
    (e) =>
      e.title.toLocaleLowerCase("tr-TR").includes(q) ||
      e.description.toLocaleLowerCase("tr-TR").includes(q)
  );
}

export function filterByCategory(
  list: CampusEvent[],
  category: Category | ""
): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

export function findEventById(
  list: CampusEvent[],
  id: string
): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3) return dateStr;
  const [day, month, year] = parts;
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}