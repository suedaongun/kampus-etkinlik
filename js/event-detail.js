// js/event-detail.js
import { events, formatDate, escapeHTML } from "./data.js";

const container = document.querySelector("#detay") || document.querySelector("#detay-alani");
const heading = document.querySelector("#detay-baslik") || document.querySelector(".site-baslik");
const id = new URLSearchParams(location.search).get("id");
const event = events.find((item) => item.id === id);

if (!event) {
  if (heading) heading.textContent = "Etkinlik bulunamadı";
  document.title = "Etkinlik bulunamadı | Kampüs Etkinlikleri";

  if (container) {
    container.innerHTML = `
      <div class="message message-error hata-kutusu" role="alert" style="border: 2px solid #c62828; background: #ffebee; color: #c62828; padding: 1.2rem; border-radius: 8px; margin-bottom: 1.5rem;">
        <p>"${escapeHTML(id || "")}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
      </div>
      <a class="button btn-link" href="etkinlikler.html" style="display:inline-block; background:var(--renk-ana, #2e7d32); color:#fff; padding:0.6rem 1.2rem; text-decoration:none; border-radius:6px; font-weight:bold;">← Listeye dön</a>`;
  }
} else {
  if (heading) heading.textContent = event.title;
  document.title = `${event.title} | Kampüs Etkinlikleri`;

  if (container) {
    container.innerHTML = `
      <div class="detay-kapsayici" style="display:flex; flex-wrap:wrap; gap:1.5rem; margin-bottom:1.5rem;">
        <!-- Sol Afiş -->
        <div class="detay-afis" style="flex:1; min-width:280px;">
          <div style="background:#1e293b; color:#fff; border:2px solid #ea580c; border-radius:8px; padding:2rem 1rem; text-align:center;">
            <h3 style="font-size:1.4rem; margin-bottom:0.5rem;">${escapeHTML(event.title)}</h3>
            <div style="color:#fb923c; font-size:1.2rem; font-weight:bold; margin-bottom:0.8rem;">2026</div>
            <div style="font-size:0.9rem; opacity:0.85;">${escapeHTML(formatDate(event.date))} · ${escapeHTML(event.location)}</div>
          </div>
          <p style="font-size:0.85rem; color:#666; margin-top:0.4rem; font-style:italic;">${escapeHTML(event.title)} afişi</p>
        </div>

        <!-- Sağ Künye -->
        <div class="detay-kunye" style="flex:1; min-width:280px;">
          <div style="background:#fff; border:1px solid #ddd; border-radius:8px; padding:1.2rem;">
            <h3 style="margin-bottom:1rem; color:var(--renk-ana, #2e7d32);">Etkinlik Künyesi</h3>
            <dl class="kunye-listesi" style="display:grid; grid-template-columns:100px 1fr; row-gap:0.75rem;">
              <dt style="font-weight:bold;">Tarih</dt>
              <dd>${escapeHTML(formatDate(event.date))}, ${escapeHTML(event.time)}</dd>

              <dt style="font-weight:bold;">Yer</dt>
              <dd>${escapeHTML(event.location)}</dd>

              <dt style="font-weight:bold;">Kategori</dt>
              <dd>${escapeHTML(event.category)}</dd>

              <dt style="font-weight:bold;">Kontenjan</dt>
              <dd>${escapeHTML(event.capacity ? event.capacity + " kişi" : "Belirtilmedi")}</dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="detay-aciklama" style="border-top:1px solid #ddd; padding-top:1.2rem; margin-bottom:1.5rem;">
        <h3 style="margin-bottom:0.5rem;">Açıklama</h3>
        <p>${escapeHTML(event.description)}</p>
      </div>

      <div style="display:flex; gap:1rem; flex-wrap:wrap;">
        <a class="button btn-link" href="etkinlikler.html" style="display:inline-block; background:var(--renk-ana, #2e7d32); color:#fff; padding:0.6rem 1.2rem; text-decoration:none; border-radius:6px; font-weight:bold;">
          ← Listeye dön
        </a>
        <a class="button btn-link" href="etkinlik-guncelle.html?id=${encodeURIComponent(event.id)}" style="display:inline-block; background:var(--renk-ana, #2e7d32); color:#fff; padding:0.6rem 1.2rem; text-decoration:none; border-radius:6px; font-weight:bold;">
          Bu etkinliği güncelle
        </a>
      </div>
    `;
  }
}