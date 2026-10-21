export function formatDate(date: string): string {
  if (!date) return "";
  const parts = date.split("-").map(Number);
  if (parts.length !== 3) return date;
  const [day, month, year] = parts;
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
