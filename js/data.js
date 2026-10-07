// js/data.js
// Öğrenci No: 2311012082

export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    capacity: 100,
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    image: "images/images.png"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    capacity: 20,
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    image: "images/images.png"
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "27-10-2026",
    time: "13:00",
    location: "B Blok Amfi 1",
    capacity: 50,
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet.",
    image: "images/images.png"
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "03-11-2026",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    capacity: 30,
    description: "HTML ve CSS ile ilk kişisel sayfanı yap.",
    image: "images/images.png"
  },
  {
    id: "event-5",
    title: "Yapay Zeka ve Gelecek",
    category: "Seminer",
    date: "12-11-2026",
    time: "11:00",
    location: "A Blok Konferans Salonu",
    capacity: 120,
    description: "Büyük dil modelleri ve üretken yapay zekanın iş dünyasına etkileri.",
    image: "images/images.png"
  },
  {
    id: "event-6",
    title: "Girişimcilik 101",
    category: "Söyleşi",
    date: "24-11-2026",
    time: "14:30",
    location: "Teknokent Seminer Salonu",
    capacity: 40,
    description: "Üniversite yıllarında start-up kurma ve ilk yatırımı bulma adımları.",
    image: "images/images.png"
  }
];

// GG-AA-YYYY formatını "12 Ekim 2026" Türkçe tarih formatına çevirir
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// XSS açıklarını önleyen HTML temizleme fonksiyonu
export function escapeHTML(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// GG-AA-YYYY formatını input[type=date] için YYYY-MM-DD formatına çevirir
export function dateToISO(dateStr) {
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("-");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}