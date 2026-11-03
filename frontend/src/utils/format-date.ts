export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  if (dateStr.includes("-")) {
    const parts = dateStr.split("-").map(Number);
    if (parts.length === 3) {
      const [p1, p2, p3] = parts;
      const year = p1 > 1000 ? p1 : p3;
      const day = p1 > 1000 ? p3 : p1;
      const month = p2;
      const dateObj = new Date(year, month - 1, day);
      return dateObj.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
  }
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
