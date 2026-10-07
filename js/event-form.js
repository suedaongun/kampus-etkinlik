// js/event-form.js
import { events, dateToISO, escapeHTML } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const message = document.querySelector("#form-mesaj");
const formIntro = document.querySelector(".form-intro");
const mode = form ? form.dataset.mode : null;
const params = new URLSearchParams(location.search);
const id = params.get("id");
let editingEvent = null;

// ADIM 11: Güncelleme modu kontrolü
if (mode === "guncelle" && form) {
  editingEvent = events.find((item) => item.id === id);

  if (!editingEvent) {
    if (formIntro) formIntro.hidden = true;
    form.outerHTML = `
      <div class="message message-error hata-kutusu" role="alert" style="border: 2px solid #c62828; background: #ffebee; color: #c62828; padding: 1.2rem; border-radius: 8px; margin-bottom: 1.2rem;">
        <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
      </div>
      <a class="button btn-link" href="etkinlikler.html" style="display:inline-block; background:var(--renk-ana, #2e7d32); color:#fff; padding:0.6rem 1.2rem; text-decoration:none; border-radius:6px; font-weight:bold;">Etkinliklere git</a>`;
  } else {
    // Form elemanlarını bulunan etkinlikle doldur
    if (form.elements.ad) form.elements.ad.value = editingEvent.title;
    if (form.elements.kategori) form.elements.kategori.value = editingEvent.category;
    if (form.elements.tarih) form.elements.tarih.value = dateToISO(editingEvent.date);
    if (form.elements.saat) form.elements.saat.value = editingEvent.time;
    if (form.elements.yer) form.elements.yer.value = editingEvent.location;
    if (form.elements.kontenjan) form.elements.kontenjan.value = editingEvent.capacity || "";
    if (form.elements.aciklama) form.elements.aciklama.value = editingEvent.description;
  }
}

// ADIM 9 & 10: Form Doğrulama (Submit)
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      id: mode === "guncelle" && id ? id : "event-" + (events.length + 1),
      title: (fd.get("ad") || "").trim(),
      category: fd.get("kategori") || "",
      date: fd.get("tarih") || "",
      time: fd.get("saat") || "",
      location: (fd.get("yer") || "").trim(),
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
      description: (fd.get("aciklama") || "").trim()
    };

    const errors = {};
    if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Bir kategori seçin.";
    if (!data.date) errors.tarih = "Tarih seçin.";
    if (!data.time) errors.saat = "Saat seçin.";
    if (!data.location) errors.yer = "Yer bilgisini yazın.";
    if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1–1000 arasında olmalı.";
    }

    // Alanların hata durumunu göster / gizle
    ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"].forEach(field => {
      const inputEl = form.elements[field];
      const errSpan = document.querySelector(`#${field}-hata`);
      if (!inputEl) return;

      if (errors[field]) {
        inputEl.setAttribute("aria-invalid", "true");
        if (errSpan) {
          errSpan.textContent = errors[field];
          errSpan.style.display = "block";
        }
      } else {
        inputEl.removeAttribute("aria-invalid");
        if (errSpan) {
          errSpan.textContent = "";
          errSpan.style.display = "none";
        }
      }
    });

    if (Object.keys(errors).length > 0) return;

    // Hata yoksa: Yeşil kutuda JSON çıktısı
    if (message) {
      const titleText = mode === "guncelle"
        ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
        : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

      message.innerHTML = `
        <div class="message message-success" style="background-color: #e8f5e9; color: #2e7d32; border: 2px solid #2e7d32; border-radius: 8px; padding: 1.2rem; margin-top: 1.5rem;">
          <strong>${titleText}</strong>
          <pre style="background: #ffffff; padding: 1rem; border-radius: 6px; margin-top: 0.8rem; overflow-x: auto; font-family: monospace; font-size: 0.9rem; color: #1f2937; border: 1px solid #86efac;">${escapeHTML(JSON.stringify(data, null, 2))}</pre>
        </div>`;
    }
  });
}