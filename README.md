# Kampüs Etkinlikleri — Sprint 7 (Backend REST API)

- **Canlı Yayın Linki (Vercel):** https://suedaongun-frontend.vercel.app/ *(veya https://kampus-etkinlik-krdd.vercel.app)*
- **GitHub Deposu:** https://github.com/suedaongun/kampus-etkinlik
- **Öğrenci:** Sueda Ongun
- **Öğrenci No:** 2311012082 (Tema Tonu: `--ton: 082`)

---

## 📌 Sprint 7 Teslim Kontrol Listesi & Karşılanan Maddeler

| # | Madde | Durum |
|---|-------|:-----:|
| 1 | Backend ayrı `backend/` klasöründe | ✅ |
| 2 | `npm install` + `npm run dev` hatasız çalışıyor | ✅ |
| 3 | Port `.env`'den okunuyor, `.env.example` var | ✅ |
| 4 | `.env` ve `node_modules` GitHub'da yok | ✅ |
| 5 | Route ve controller ayrı dosyalarda | ✅ |
| 6 | En az 5 commit, adım adım atılmış | ✅ |
| 7 | GET `/health` JSON'unda `student` = `2311012082` | ✅ |
| 8 | `data/events.js`'te kendi 6 etkinliğin | ✅ |
| 9 | GET `/events` ve GET `/events/:id` çalışıyor; olmayan id 404 | ✅ |
| 10 | POST `/events` 201; eksik veri 400 | ✅ |
| 11 | `backend/README.md`'de REST sözleşmesi | ✅ |
| 12 | 6 istek collection olarak `backend/requests/kampus-api.json`'da | ✅ |

---

## 🚀 Backend Kurulum ve Çalıştırma

```bash
cd backend
npm install
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3001` adresinde çalışır (`.env` dosyasından okunur).

### 📡 REST API Uç Noktaları

- **GET `/health`** → Sağlık kontrolü ve öğrenci numarası doğrulaması
- **GET `/events`** → Tüm 6 etkinliğin listesi (200 OK)
- **GET `/events/:id`** → Belirli etkinlik detayı (200 OK) / Olmayan id (404 Not Found)
- **POST `/events`** → Yeni etkinlik ekleme (201 Created) / Eksik veri kontrolü (400 Bad Request)
- **Test İstekleri:** `backend/requests/kampus-api.json` içinde 6 adet hazır istek mevcuttur.

---

## 📌 Sprint 6 (Vize Projesi) Kontrol Listesi & Karşılanan Maddeler

| # | Madde | Durum |
|---|-------|:-----:|
| 1 | Tüm linkler çalışıyor | ✅ |
| 2 | Tüm sayfalar hazır | ✅ |
| 3 | Klasör ve dosya yapısı oluşturuldu | ✅ |
| 4 | 10 adet router tanımlandı | ✅ |
| 5 | Context kullanıldı ve tüm sayfalara bağlandı | ✅ |
| 6 | Ekle, sil, güncelle ve silmeden önce onay çalışıyor; etkisi diğer sayfalarda görülüyor | ✅ |
| 7 | Son çalışır proje GitHub'a gönderildi | ✅ |
| 8 | Proje Vercel'de isimsoyisim-frontend.vercel.app adresiyle yayında | ✅ |
| 9 | README yazıldı, Vercel linki README'ye eklendi | ✅ |
| 10 | Mobil görünüm doğru çalışıyor | ✅ |
| 11 | CSS bozulması yok. Sayfa düzgün görünüyor | ✅ |
| 12 | Arama ve filtreleme çalışıyor | ✅ |
| 13 | Form doğrulama çalışıyor (etkinlik formu, giriş, kayıt, şifremi unuttum) | ✅ |

---

## 🗺️ 10 Adet Router (Frontend Sayfa Yönlendirmeleri)

1. `/` → **Ana Sayfa (HomePage)** – Yaklaşan etkinlikler ve genel bakış
2. `/events` → **Etkinlikler (EventsPage)** – Tüm etkinliklerin listesi, arama ve filtreleme
3. `/events/:id` → **Etkinlik Detayı (EventDetailPage)** – Seçilen etkinliğin detay sayfası
4. `/admin` → **Yönetim Paneli (AdminPage)** – Etkinlikleri yönetme tablosu
5. `/admin/new` → **Yeni Etkinlik Ekle (AddEventPage)** – Yeni etkinlik ekleme formu
6. `/admin/:id/edit` → **Etkinlik Düzenle (EditEventPage)** – Mevcut etkinliği güncelleme formu
7. `/login` → **Giriş (LoginPage)** – Kullanıcı giriş sayfası
8. `/register` → **Kayıt Ol (RegisterPage)** – Yeni kullanıcı kayıt sayfası
9. `/forgot-password` → **Şifremi Unuttum (ForgotPasswordPage)** – Şifre sıfırlama sayfası
10. `*` → **404 Sayfa Bulunamadı (NotFoundPage)** – Tanımsız adresler için hata sayfası
