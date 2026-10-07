// js/event-form.js
import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const id = new URLSearchParams(location.search).get("id");
const guncelleContainer = document.querySelector("#guncelle-kapsayici");

// ADIM 11: Güncelleme Sayfası Kontrolü (data-mode="guncelle")
if (form && form.dataset.mode === "guncelle") {
  const etkinlik = events.find(e => e.id === id);

  if (!etkinlik) {
    // id'siz veya hatalı id ile doğrudan açılırsa: formu gizle, uyarı göster
    if (guncelleContainer) {
      guncelleContainer.innerHTML = `
        <div class="hata-kutusu" style="border: 2px solid var(--renk-hata, #c62828); background-color: var(--renk-hata-zemin, #ffebee); color: var(--renk-hata, #c62828); padding: 1.2rem; border-radius: 8px; margin-bottom: 1.2rem;">
          Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
        </div>
        <a href="etkinlikler.html" class="btn-link" style="display:inline-block; padding: 0.6rem 1.2rem; background: var(--renk-ana); color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Etkinliklere git</a>
      `;
    }
  } else {
    // Bulunan etkinliğin verileriyle formu doldur
    if (form.elements.ad) form.elements.ad.value = etkinlik.title;
    if (form.elements.kategori) form.elements.kategori.value = etkinlik.category;
    
    // GG-AA-YYYY -> YYYY-MM-DD input[type="date"] formatı
    if (form.elements.tarih && etkinlik.date) {
      const [gun, ay, yil] = etkinlik.date.split("-");
      form.elements.tarih.value = `${yil}-${ay.padStart(2, "0")}-${gun.padStart(2, "0")}`;
    }
    
    if (form.elements.saat) form.elements.saat.value = etkinlik.time;
    if (form.elements.yer) form.elements.yer.value = etkinlik.location;
    if (form.elements.kontenjan) form.elements.kontenjan.value = etkinlik.capacity || "";
    if (form.elements.aciklama) form.elements.aciklama.value = etkinlik.description;
  }
}

// ADIM 9 & 10: Form Doğrulama (Validation)
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      id: form.dataset.mode === "guncelle" && id ? id : "event-" + (events.length + 1),
      title: (fd.get("ad") || "").trim(),
      category: fd.get("kategori") || "",
      date: fd.get("tarih") || "",
      time: fd.get("saat") || "",
      location: (fd.get("yer") || "").trim(),
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
      description: (fd.get("aciklama") || "").trim()
    };

    const errors = {};

    // Slayttaki doğrulama kuralları:
    if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Bir kategori seçin.";
    if (!data.date) errors.tarih = "Tarih seçin.";
    if (!data.time) errors.saat = "Saat seçin.";
    if (!data.location) errors.yer = "Yer bilgisini yazın.";
    if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1–1000 arasında olmalı.";
    }

    // Alanların hata durumunu güncelle (kırmızı kenar + hata metni)
    ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"].forEach(alanAdi => {
      const inputEl = form.elements[alanAdi];
      const hataSpan = document.querySelector(`#${alanAdi}-hata`);
      if (!inputEl) return;

      if (errors[alanAdi]) {
        inputEl.setAttribute("aria-invalid", "true");
        if (hataSpan) {
          hataSpan.textContent = errors[alanAdi];
          hataSpan.style.display = "block";
        }
      } else {
        inputEl.removeAttribute("aria-invalid");
        if (hataSpan) {
          hataSpan.textContent = "";
          hataSpan.style.display = "none";
        }
      }
    });

    // Hata varsa işlemi durdur
    if (Object.keys(errors).length > 0) return;

    // Hata yoksa: Yeşil kutuda JSON nesnesini göster
    const mesajKutusu = document.querySelector("#form-mesaj");
    if (mesajKutusu) {
      const baslikMetni = form.dataset.mode === "guncelle"
        ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
        : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

      mesajKutusu.innerHTML = `
        <div style="background-color: var(--renk-basari-zemin, #e8f5e9); color: var(--renk-basari, #2e7d32); border: 2px solid var(--renk-basari, #2e7d32); border-radius: 8px; padding: 1.2rem; margin-top: 1.5rem;">
          <strong>${baslikMetni}</strong>
          <pre style="background: #ffffff; padding: 1rem; border-radius: 6px; margin-top: 0.8rem; overflow-x: auto; font-family: monospace; font-size: 0.9rem; color: #1f2937; border: 1px solid #86efac;">${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
  });
}