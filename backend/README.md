# Kampüs Etkinlikleri — Backend REST API (Sprint 8 — MongoDB)

**Öğrenci:** Sueda Ongun
**Öğrenci No:** 2311012082

## Kurulum

```bash
cd backend
npm install
npm run seed    # MongoDB'ye 6 etkinlik yükler
npm run dev     # Geliştirme sunucusunu başlatır
```

Sunucu varsayılan olarak `http://localhost:3001` adresinde başlar.
Port ve MongoDB URI `.env` dosyasından okunur. Örnek için `.env.example` dosyasına bakınız.

---

## Veritabanı

- **MongoDB Atlas (Cloud)** kullanılmaktadır.
- Bağlantı adresi `.env` dosyasındaki `MONGODB_URI` değişkeninden okunur.
- Bağlantı modülü `config/db.js` içinde ayrı bir dosyadadır.

---

## Mongoose Schema Özellikleri

`models/Event.js` dosyasında tanımlanan şema:

- **required:** `title`, `category`, `date`, `time`, `location`, `description` alanları zorunlu
- **trim:** Tüm String alanlarda `trim: true` ile başta/sondaki boşluklar temizlenir
- **timestamps:** `createdAt` ve `updatedAt` alanları otomatik eklenir
- **Kısıtlar:**
  - `title` → `minlength: 3`
  - `category` → `enum: ["Seminer", "Atölye", "Söyleşi", "Yarışma", "Konser", "Spor", "Diğer"]`
  - `capacity` → `min: 0`, `max: 10000`
  - `description` → `maxlength: 500`

---

## Seed Script

```bash
npm run seed
```

- MongoDB'deki tüm etkinlikleri siler ve 6 yeni etkinlik ekler.
- **İki kez çalıştırılsa bile her zaman 6 kayıt olur** (önce `deleteMany`, sonra `insertMany`).

---

## REST API Sözleşmesi

### 1. GET /health

Sağlık kontrolü. Sunucunun çalıştığını ve öğrenci bilgisini döner.

**Yanıt: 200 OK**
```json
{
  "status": "ok",
  "student": "2311012082",
  "project": "Kampüs Etkinlikleri",
  "timestamp": "2026-11-18T07:00:00.000Z"
}
```

### 2. GET /events

Tüm etkinlikleri MongoDB'den listeler.

**Yanıt: 200 OK**
```json
[
  {
    "_id": "6740...",
    "title": "Kariyer Günleri 2026",
    "category": "Seminer",
    "capacity": 100,
    "date": "2026-10-12",
    "time": "14:00",
    "location": "A Blok Konferans Salonu",
    "description": "Mezunlarla kariyer söyleşileri ve şirket standları.",
    "createdAt": "2026-11-18T...",
    "updatedAt": "2026-11-18T..."
  }
]
```

### 3. GET /events/:id

Belirli bir etkinliği MongoDB'den getirir. Olmayan veya geçersiz id için 404 döner.

**Yanıt: 200 OK** (geçerli id)
```json
{
  "_id": "6740...",
  "title": "Kariyer Günleri 2026",
  ...
}
```

**Yanıt: 404 Not Found** (olmayan veya geçersiz id)
```json
{
  "error": "Etkinlik bulunamadı"
}
```

### 4. POST /events

Yeni etkinlik ekler. Veriler MongoDB'ye kalıcı olarak kaydedilir.

**Yanıt: 201 Created** (başarılı)
```json
{
  "_id": "6740...",
  "title": "Yeni Etkinlik",
  "category": "Seminer",
  "capacity": 50,
  "date": "2026-12-01",
  "time": "10:00",
  "location": "C Blok Salon 3",
  "description": "Yeni bir etkinlik açıklaması.",
  "createdAt": "2026-11-18T...",
  "updatedAt": "2026-11-18T..."
}
```

**Yanıt: 400 Bad Request** (eksik veri)
```json
{
  "error": "Eksik veri",
  "requiredFields": ["title", "category", "date", "time", "location", "description"]
}
```

---

## Klasör Yapısı

```
backend/
├── config/
│   └── db.js                  ← MongoDB bağlantı modülü
├── controllers/
│   └── eventController.js     ← CRUD işlemleri (Mongoose)
├── data/
│   └── events.js              ← Seed verileri (eski sprint uyumluluğu)
├── models/
│   └── Event.js               ← Mongoose şeması
├── routes/
│   ├── eventRoutes.js
│   └── healthRoute.js
├── requests/
│   └── kampus-api.json        ← 6 istek Postman collection
├── .env                       ← MONGODB_URI (git'e gitmez)
├── .env.example               ← Örnek .env
├── .gitignore
├── package.json
├── README.md
├── seed.js                    ← npm run seed
└── server.js
```
