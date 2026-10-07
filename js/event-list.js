// js/event-list.js
import { events, formatDate, escapeHTML } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

// Kart şablonu (Hem senin CSS sınıflarını hem arkadaşının sınıflarını destekler)
function createCard(event) {
  return `
    <article class="event-card etkinlik-karti">
      <h2>${escapeHTML(event.title)}</h2>
      <span class="event-category kart-etiket">${escapeHTML(event.category)}</span>
      <p class="kart-bilgi">Tarih: ${escapeHTML(formatDate(event.date))}, ${escapeHTML(event.time)}</p>
      <p class="kart-bilgi">Yer: ${escapeHTML(event.location)}</p>
      <p class="kart-bilgi">Kontenjan: ${escapeHTML(event.capacity ? event.capacity + " kişi" : "Belirtilmedi")}</p>
      <p class="event-description kart-bilgi">${escapeHTML(event.description)}</p>
      <a class="event-link kart-link" href="etkinlik-detay.html?id=${encodeURIComponent(event.id)}">Detayları gör</a>
    </article>`;
}

function render(items) {
  if (!list) return;

  if (items.length === 0) {
    list.innerHTML = `<p class="sonuc-yok" style="grid-column: 1 / -1; padding: 1rem; font-weight: bold;">Aramanıza uygun etkinlik bulunamadı.</p>`;
  } else {
    list.innerHTML = items.map(createCard).join("");
  }

  const sonucText = document.querySelector("#sonuc");
  if (sonucText) {
    sonucText.textContent = `${items.length} etkinlik listeleniyor.`;
  }
}

if (list) {
  // 1. Durum: index.html (data-limit="2" varsa yaklaşan 2 etkinliği sıralayıp göster)
  if (list.dataset.limit) {
    const limit = Number(list.dataset.limit);
    const sorted = [...events]
      .sort((a, b) => {
        const [gA, aA, yA] = a.date.split("-");
        const [gB, aB, yB] = b.date.split("-");
        return `${yA}-${aA}-${gA}`.localeCompare(`${yB}-${aB}-${gB}`);
      })
      .slice(0, limit);

    render(sorted);
  } 
  // 2. Durum: etkinlikler.html (Arama + Kategori Filtresi)
  else {
    const searchInput = document.querySelector("#arama");
    const categorySelect = document.querySelector("#kategori-filtre");

    // Kategorileri dinamik olarak select'e doldur
    if (categorySelect) {
      const categories = [...new Set(events.map(e => e.category))];
      categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        categorySelect.appendChild(opt);
      });
    }

    function applyFilter() {
      const query = searchInput ? searchInput.value.trim().toLocaleLowerCase("tr-TR") : "";
      const selectedCat = categorySelect ? categorySelect.value : "";

      const filtered = events.filter(e => {
        const matchText = e.title.toLocaleLowerCase("tr-TR").includes(query) ||
                          e.description.toLocaleLowerCase("tr-TR").includes(query);
        const matchCategory = selectedCat === "" || e.category === selectedCat;
        return matchText && matchCategory;
      });

      render(filtered);
    }

    if (searchInput) searchInput.addEventListener("input", applyFilter);
    if (categorySelect) categorySelect.addEventListener("change", applyFilter);

    // Başlangıçta 6 etkinliği listele
    render(events);
  }
}