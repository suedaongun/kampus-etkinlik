# Kampüs Etkinlikleri — Sprint 6 ve Vize Teslimi

**Öğrenci:** Sueda Ongun  
**Öğrenci No:** 2311012082  

## 🌐 Canlı Vercel Adresi
- **Canlı Yayın:** [https://kampus-etkinlik-krdd.vercel.app/](https://kampus-etkinlik-krdd.vercel.app/)
- **Alternatif:** [https://suedaongun-frontend.vercel.app/](https://suedaongun-frontend.vercel.app/)

---

## 🛠️ Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için:

```bash
# frontend klasörüne geçiş yapın
cd frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Üretim derlemesi (Build) oluşturun
npm run build
```

---

## 🗺️ Route Haritası (10 Sayfa)

| Adres | Sayfa Bileşeni | Açıklama |
|---|---|---|
| `/` | `HomePage` | Yaklaşan 2 etkinlik ve tüm etkinliklere geçiş |
| `/events` | `EventsPage` | Arama ve kategori filtreli tüm etkinlikler |
| `/events/:id` | `EventDetailPage` | Seçilen etkinliğin detayları, afişi ve künyesi |
| `/admin` | `AdminPage` | Yönetim paneli tablosu, silme ve düzenleme bağlantıları |
| `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu |
| `/admin/:id/edit` | `EditEventPage` | Mevcut etkinliği güncelleme formu |
| `/login` | `LoginPage` | Giriş sayfası ve form doğrulaması |
| `/register` | `RegisterPage` | Kayıt olma sayfası ve form doğrulaması |
| `/forgot-password` | `ForgotPasswordPage` | Şifre sıfırlama sayfası ve form doğrulaması |
| `*` | `NotFoundPage` | Tanımsız adresler ve bulunamayan etkinlikler |

---

## 📁 Mimari ve Özellikler
- **React Router v7:** `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useParams`, `useNavigate`, `useLocation`, `matchPath`.
- **React Context:** `EventsContext` ve `useEvents` hook'u ile global state yönetimi (Ekle, Güncelle, Sil).
- **Form Doğrulama:** `validateEvent` saf fonksiyonu, dinamik hata mesajları ve `aria-invalid` erişilebilirlik desteği.
- **Duyarlı Tasarım (Responsive):** Masaüstünde ızgara/tablo, mobil cihazlarda kart düzeni ve dokunma dostu kontroller (`44px` dokunma hedefi).
