# Kampüs Etkinlikleri — Sprint 9 (Tam CRUD, PATCH, DELETE ve Sorgular)

- **Canlı Yayın Linki (Vercel):** https://suedaongun-frontend.vercel.app/ *(veya https://kampus-etkinlik-krdd.vercel.app)*
- **GitHub Deposu:** https://github.com/suedaongun/kampus-etkinlik
- **Öğrenci:** Sueda Ongun
- **Öğrenci No:** 2311012082 (Tema Tonu: `--ton: 082`)

---

## 📌 Sprint 9 Sözleşmesi & Karşılanan Endpoint'ler

| Method | Endpoint | Başarılı | Hata | Durum |
|---|---|:---:|:---:|:---:|
| **GET** | `/health` | `200` | — | ✅ çalışıyor |
| **GET** | `/events ?search= & ?category=` | `200` | — | ✅ çalışıyor |
| **GET** | `/events/upcoming` | `200` · tarihe göre sıralı | — | ✅ çalışıyor |
| **GET** | `/events/:id` | `200` | `404` | ✅ çalışıyor |
| **POST** | `/events` | `201` | `400` | ✅ çalışıyor |
| **PATCH** | `/events/:id` | `200` · güncel kayıt | `400, 404` | ✅ çalışıyor |
| **DELETE** | `/events/:id` | `204` · gövde yok | `404` | ✅ çalışıyor |

- **Hata Formatı:** `{ "error": { "message": "…" } }`
- **Geçersiz ya da olmayan id:** Her yerde `404 Not Found`
- **Tarih Formatı:** Her yerde `"GG-AA-YYYY"` (örn. `"15-10-2026"`)
- **Test Sonucu:** `newman run https://webdersi.vercel.app/test.json` ➔ **18 istek, 45 test, 0 hata** ✅

---

## 🚀 Backend Kurulum ve Çalıştırma

```bash
cd backend
npm install
npm run seed    # MongoDB Atlas'a etkinlikleri yükler (2'si geçmiş tarihli)
npm run dev     # Geliştirme sunucusunu başlatır (node --watch src/server.js)
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde başlar (`.env` dosyasından okunur).

---

## 📌 Sprint 8 Kontrol Listesi

| # | Madde | Durum |
|---|-------|:-----:|
| 1 | `npm install` + `npm run dev` çalışıyor | ✅ |
| 2 | Bağlantı ayrı modülde (`config/db.js`), URI `.env`'den okunuyor, `.env.example`'da `MONGODB_URI` var | ✅ |
| 3 | Schema'da `required`, `trim`, `timestamps` ve kısıtlar var | ✅ |
| 4 | `npm run seed` 6 kayıt ekliyor; iki kez çalışınca da 6 kayıt kalıyor | ✅ |
| 5 | GET `/events` ve GET `/events/:id` MongoDB'den okuyor; olmayan ve geçersiz id 404 dönüyor | ✅ |
| 6 | POST 201 dönüyor; eksik veri 400 dönüyor ve sunucu çökmüyor | ✅ |
| 7 | Sunucu yeniden başlayınca POST ile eklenen kayıt duruyor | ✅ |

---

## 📌 Sprint 6 (Vize Projesi) Kontrol Listesi & Router Haritası

| # | Madde | Durum |
|---|-------|:-----:|
| 1 | Tüm linkler çalışıyor | ✅ |
| 2 | Tüm sayfalar hazır | ✅ |
| 3 | Klasör ve dosya yapısı oluşturuldu | ✅ |
| 4 | 10 adet router tanımlandı | ✅ |
| 5 | Context kullanıldı ve tüm sayfalara bağlandı | ✅ |
| 6 | Ekle, sil, güncelle ve silmeden önce onay çalışıyor | ✅ |
| 7 | Son çalışır proje GitHub'a gönderildi | ✅ |
| 8 | Proje Vercel'de isimsoyisim-frontend.vercel.app adresiyle yayında | ✅ |
| 9 | README yazıldı, Vercel linki README'ye eklendi | ✅ |
| 10 | Mobil görünüm doğru çalışıyor | ✅ |
| 11 | CSS bozulması yok. Sayfa düzgün görünüyor | ✅ |
| 12 | Arama ve filtreleme çalışıyor | ✅ |
| 13 | Form doğrulama çalışıyor | ✅ |
