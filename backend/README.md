# Kampüs Etkinlikleri — Backend REST API

**Öğrenci:** Sueda Ongun
**Öğrenci No:** 2311012082

## Kurulum

```bash
cd backend
npm install
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3001` adresinde başlar.
Port numarası `.env` dosyasından okunur. Örnek için `.env.example` dosyasına bakınız.

---

## REST API Sözleşmesi

### 1. GET /health

Sağlık kontrolü. Sunucunun çalıştığını ve öğrenci bilgisini döner.

**İstek:**
```
GET /health
```

**Yanıt: 200 OK**
```json
{
  "status": "ok",
  "student": "2311012082",
  "project": "Kampüs Etkinlikleri",
  "timestamp": "2026-11-11T07:00:00.000Z"
}
```

---

### 2. GET /events

Tüm etkinlikleri listeler.

**İstek:**
```
GET /events
```

**Yanıt: 200 OK**
```json
[
  {
    "id": "event-1",
    "title": "Kariyer Günleri 2026",
    "category": "Seminer",
    "capacity": 100,
    "date": "2026-10-12",
    "time": "14:00",
    "location": "A Blok Konferans Salonu",
    "description": "Mezunlarla kariyer söyleşileri ve şirket standları."
  }
]
```

---

### 3. GET /events/:id

Belirli bir etkinliği getirir. Olmayan id için 404 döner.

**İstek:**
```
GET /events/event-1
```

**Yanıt: 200 OK**
```json
{
  "id": "event-1",
  "title": "Kariyer Günleri 2026",
  "category": "Seminer",
  "capacity": 100,
  "date": "2026-10-12",
  "time": "14:00",
  "location": "A Blok Konferans Salonu",
  "description": "Mezunlarla kariyer söyleşileri ve şirket standları."
}
```

**Yanıt: 404 Not Found** (olmayan id)
```json
{
  "error": "Etkinlik bulunamadı"
}
```

---

### 4. POST /events

Yeni etkinlik ekler. Başarılıysa 201, eksik veri varsa 400 döner.

**İstek:**
```
POST /events
Content-Type: application/json

{
  "title": "Yeni Etkinlik",
  "category": "Seminer",
  "capacity": 50,
  "date": "2026-12-01",
  "time": "10:00",
  "location": "C Blok Salon 3",
  "description": "Yeni bir etkinlik açıklaması."
}
```

**Yanıt: 201 Created**
```json
{
  "id": "event-7",
  "title": "Yeni Etkinlik",
  "category": "Seminer",
  "capacity": 50,
  "date": "2026-12-01",
  "time": "10:00",
  "location": "C Blok Salon 3",
  "description": "Yeni bir etkinlik açıklaması."
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
├── controllers/
│   └── eventController.js
├── data/
│   └── events.js
├── routes/
│   ├── eventRoutes.js
│   └── healthRoute.js
├── requests/
│   └── kampus-api.json
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

