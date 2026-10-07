// js/event-detail.js
import { events } from "./data.js";
import { formatTarih } from "./event-list.js";

const id = new URLSearchParams(location.search).get("id");
const event = events.find(e => e.id === id);
const container = document.querySelector("#detay-alani");

if (!event) {
  // Geçersiz veya eksik id kontrolü (Adım 8)
  document.title = "Etkinlik bulunamadı";
  const baslikEl = document.querySelector("#sayfa-baslik");
  if (baslikEl) baslikEl.textContent = "Etkinlik bulunamadı";

  if (container) {
    container.innerHTML = `
      <div class="hata-kutusu" style="border: 2px solid var(--renk-hata, #c62828); background-color: var(--renk-hata-zemin, #ffebee); color: var(--renk-hata, #c62828); padding: 1.2rem; border-radius: 8px; margin-bottom: 1.2rem;">
        "${id || ''}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.
      </div>
      <a href="etkinlikler.html" class="btn-link" style="display:inline-block; padding: 0.6rem 1.2rem; background: var(--renk-ana); color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">← Listeye dön</a>
    `;
  }
} else {
  // Geçerli id durumu
  document.title = event.title;
  const baslikEl = document.querySelector("#sayfa-baslik");
  if (baslikEl) baslikEl.textContent = event.title;

  if (container) {
    container.innerHTML = `
      <div class="detay-konteyner">
        <div class="detay-govde">
          <div class="detay-afis">
            <div class="afis-kutu" style="background:#1e293b; color:#f8fafc; border:2px solid #ea580c; border-radius:6px; padding:2rem 1.5rem; text-align:center;">
              <h3 style="font-size:1.5rem; margin-bottom:0.5rem;">${event.title}</h3>
              <div style="color:#fb923c; font-size:1.2rem; font-weight:bold; margin-bottom:0.8rem;">2026</div>
              <div style="font-size:0.9rem; opacity:0.85;">${formatTarih(event.date)} · ${event.location}</div>
            </div>
            <p style="font-size:0.85rem; color:#666; margin-top:0.4rem; font-style:italic;">${event.title} afişi</p>
          </div>

          <div class="detay-kunye">
            <div class="kunye-karti" style="background:var(--renk-zemin); border-radius:6px; padding:1.2rem; border:1px solid #ddd;">
              <h3 style="font-size:1.1rem; color:var(--renk-ana); margin-bottom:1rem;">Etkinlik Künyesi</h3>
              <dl class="kunye-listesi" style="display:grid; grid-template-columns:100px 1fr; row-gap:0.75rem;">
                <dt style="font-weight:bold; color:var(--renk-ana);">Tarih</dt>
                <dd>${formatTarih(event.date)}, ${event.time}</dd>

                <dt style="font-weight:bold; color:var(--renk-ana);">Yer</dt>
                <dd>${event.location}</dd>

                <dt style="font-weight:bold; color:var(--renk-ana);">Kategori</dt>
                <dd>${event.category}</dd>

                <dt style="font-weight:bold; color:var(--renk-ana);">Kontenjan</dt>
                <dd>${event.capacity ? event.capacity + " kişi" : "Sınırsız"}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="detay-aciklama" style="border-top:1px solid #ddd; padding-top:1.2rem; margin:1.5rem 0;">
          <h3 style="font-size:1.2rem; margin-bottom:0.5rem; color:var(--renk-ana);">Açıklama</h3>
          <p>${event.description}</p>
        </div>

        <div style="display:flex; gap:1rem; flex-wrap:wrap;">
          <a href="etkinlikler.html" class="btn-link" style="display:inline-block; padding: 0.6rem 1.2rem; background: var(--renk-ana); color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">← Listeye dön</a>
          <a href="etkinlik-guncelle.html?id=${event.id}" class="btn-link" style="display:inline-block; padding: 0.6rem 1.2rem; background: var(--renk-ana); color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Bu etkinliği güncelle</a>
        </div>
      </div>
    `;
  }
}