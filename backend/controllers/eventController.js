const events = require("../data/events");

let eventList = [...events];
let nextId = eventList.length + 1;

// GET /events — Tüm etkinlikleri getir
exports.getAllEvents = (req, res) => {
  res.json(eventList);
};

// GET /events/:id — Belirli bir etkinliği getir (olmayan id → 404)
exports.getEventById = (req, res) => {
  const event = eventList.find((e) => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: "Etkinlik bulunamadı" });
  }

  res.json(event);
};

// POST /events — Yeni etkinlik ekle (eksik veri → 400, başarılı → 201)
exports.createEvent = (req, res) => {
  const { title, category, capacity, date, time, location, description } = req.body;

  // Zorunlu alan kontrolü
  if (!title || !category || !date || !time || !location || !description) {
    return res.status(400).json({
      error: "Eksik veri",
      requiredFields: ["title", "category", "date", "time", "location", "description"]
    });
  }

  const newEvent = {
    id: `event-${nextId++}`,
    title,
    category,
    capacity: capacity || 0,
    date,
    time,
    location,
    description
  };

  eventList.push(newEvent);
  res.status(201).json(newEvent);
};
