# Kampüs Etkinlikleri — Backend REST API (Sprint 9 — Tam CRUD & Sorgular)

**Öğrenci:** Sueda Ongun  
**Öğrenci No:** 2311012082  

## Kurulum ve Çalıştırma

```bash
cd backend
npm install
npm run seed    # MongoDB Atlas'a 6 etkinliği yükler (2'si geçmiş tarihli)
npm run dev     # Geliştirme sunucusunu başlatır (node --watch src/server.js)
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde başlar (`.env` dosyasından okunur).

---

## REST API Sözleşmesi

| Method | Endpoint | Başarılı | Hata | Açıklama |
|---|---|:---:|:---:|---|
| **GET** | `/health` | `200` | — | Sağlık kontrolü ve öğrenci no (`2311012082`) |
| **GET** | `/events` | `200` | — | Tüm etkinlikler (veya `?search=&category=` filtreli) |
| **GET** | `/events/upcoming` | `200` | — | Yaklaşan etkinlikler (bugün ve sonrası, tarihe göre artan sıralı) |
| **GET** | `/events/:id` | `200` | `404` | Tek etkinlik detayı (olmayan ya da geçersiz id 404) |
| **POST** | `/events` | `201` | `400` | Yeni etkinlik ekleme (eksik veri veya hatalı tarih formatı 400) |
| **PATCH** | `/events/:id` | `200` | `400, 404` | Belirli alanları güncelleme (boş body, geçersiz alan veya _id 400, olmayan id 404) |
| **DELETE** | `/events/:id` | `204` | `404` | Etkinlik silme (gövde yok, ikinci silme 404) |

### Standart Hata Formatı
Tüm hata yanıtları standart formatta döner:
```json
{
  "error": {
    "message": "Hata açıklaması"
  }
}
```

### Tarih Formatı
Tarihler API'de her yerde `"GG-AA-YYYY"` (örn. `"15-10-2026"`) biçimindedir. Veritabanında gerçek `Date` nesnesi olarak saklanır.

---

## Test & Doğrulama (Newman & Collection Runner)

```bash
npm test
# veya
newman run https://webdersi.vercel.app/test.json
```

- **Hedef:** 18 istek, 45 test, 0 hata ✅
- **Sonuçlar:** `backend/requests/run-results.json` dosyasına aktarılmıştır.

---

## Klasör Yapısı

```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── event-controller.js
│   ├── data/
│   │   └── seed-events.js
│   ├── models/
│   │   └── event-model.js
│   ├── routes/
│   │   ├── event-routes.js
│   │   └── health-route.js
│   ├── utils/
│   │   └── date.js
│   ├── app.js
│   ├── seed.js
│   └── server.js
├── requests/
│   ├── kampus-api.json
│   └── run-results.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
