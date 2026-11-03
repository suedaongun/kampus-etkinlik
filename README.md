# Kampüs Etkinlikleri — Vize Projesi (Sprint 6)

- **Canlı Yayın Linki (Vercel):** https://suedaongun-frontend.vercel.app/ *(veya https://kampus-etkinlik-krdd.vercel.app)*
- **GitHub Deposu:** https://github.com/suedaongun/kampus-etkinlik
- **Öğrenci:** Sueda Ongun
- **Öğrenci No:** 2311012082 (Tema Tonu: `--ton: 082`)

## 📌 Vize Projesi Kontrol Listesi & Karşılanan Maddeler

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

## 🗺️ 10 Adet Router (Sayfa Yönlendirmeleri)

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
