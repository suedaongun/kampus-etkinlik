// js/event-list.js
import { events } from "./data.js";

// GG-AA-YYYY -> "12 Ekim 2026" Türkçe tarih formatı
export function formatTarih(tarihStr) {
  const [gun, ay, yil] = tarihStr.split("-").map(Number);
  const dateObj = new Date(yil, ay - 1, gun);
  return dateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Kart şablonunu üretir (Sprint 2 HTML & CSS sınıflarıyla tam uyumlu)
export function createCard(event) {
  return `
    <article class="etkinlik-karti">
      <div>
        <span class="kart-etiket">${event.category}</span>
        <h3 style="margin-top:0.4rem;">${event.title}</h3>
        <p class="kart-bilgi">Tarih: ${formatTarih(event.date)}, ${event.time}</p>
        <p class="kart-bilgi">Yer: ${event.location}</p>
        <p class="kart-bilgi">Kontenjan: ${event.capacity ? event.capacity + " kişi" : "Belirtilmedi"}</p>
        <p class="kart-bilgi" style="margin-top:0.4rem;">${event.description}</p>
      </div>
      <a href="etkinlik-detay.html?id=${event.id}" class="kart-link">Detayları gör</a>
    </article>
  `;
}

const list = document.querySelector("#etkinlik-listesi");

if (list) {
  // ADIM 5: Ana sayfa kontrolü (data-limit="2" varsa)
  if (list.dataset.limit) {
    const limit = Number(list.dataset.limit);
    // Sıralamayı GG-AA-YYYY tarihine göre YYYY-MM-DD mantığıyla yapıyoruz (orijinal dizi bozulmadan)
    const yaklasan = [...events]
      .sort((a, b) => {
        const [gA, aA, yA] = a.date.split("-");
        const [gB, aB, yB] = b.date.split("-");
        return `${yA}-${aA}-${gA}`.localeCompare(`${yB}-${aB}-${gB}`);
      })
      .slice(0, limit);

    list.innerHTML = yaklasan.map(createCard).join("");
  } else {
    // ADIM 6 & 7: Etkinlikler Sayfası (Arama ve Dinamik Kategori Filtresi)
    const aramaInput = document.querySelector("#arama");
    const kategoriSelect = document.querySelector("#kategori-filtre");
    const sonucSatiri = document.querySelector("#sonuc");

    function render(dizi) {
      if (dizi.length === 0) {
        list.innerHTML = `<p style="grid-column: 1 / -1; padding: 1rem; color: var(--renk-ana); font-weight: bold;">Aramanıza uygun etkinlik bulunamadı.</p>`;
      } else {
        list.innerHTML = dizi.map(createCard).join("");
      }
      if (sonucSatiri) {
        sonucSatiri.textContent = `${dizi.length} etkinlik listeleniyor.`;
      }
    }

    // Kategorileri veriden new Set() ile dinamik üretip select'e ekliyoruz
    if (kategoriSelect) {
      const kategoriler = [...new Set(events.map(e => e.category))];
      kategoriler.forEach(kat => {
        const opt = document.createElement("option");
        opt.value = kat;
        opt.textContent = kat;
        kategoriSelect.appendChild(opt);
      });
    }

    // Arama ve kategori filtreleme
    function filtrele() {
      const aranan = aramaInput ? aramaInput.value.trim().toLocaleLowerCase("tr-TR") : "";
      const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

      const sonuc = events.filter(e => {
        const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
                            e.description.toLocaleLowerCase("tr-TR").includes(aranan);
        const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
        return metinUyuyor && kategoriUyuyor;
      });

      render(sonuc);
    }

    if (aramaInput) aramaInput.addEventListener("input", filtrele);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);

    // İlk açılışta 6 kartı listele
    render(events);
  }
}