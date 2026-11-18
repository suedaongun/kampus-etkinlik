const mongoose = require("mongoose");
const Event = require("../models/Event");

// GET /events — Tüm etkinlikleri getir (MongoDB'den)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası", details: err.message });
  }
};

// GET /events/:id — Belirli bir etkinliği getir (olmayan ve geçersiz id → 404)
exports.getEventById = async (req, res) => {
  try {
    // Geçersiz ObjectId kontrolü
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ error: "Etkinlik bulunamadı" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Etkinlik bulunamadı" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası", details: err.message });
  }
};

// POST /events — Yeni etkinlik ekle (eksik veri → 400, başarılı → 201)
exports.createEvent = async (req, res) => {
  try {
    const { title, category, capacity, date, time, location, description } = req.body;

    // Zorunlu alan kontrolü
    if (!title || !category || !date || !time || !location || !description) {
      return res.status(400).json({
        error: "Eksik veri",
        requiredFields: ["title", "category", "date", "time", "location", "description"]
      });
    }

    const newEvent = await Event.create({
      title,
      category,
      capacity: capacity || 0,
      date,
      time,
      location,
      description
    });

    res.status(201).json(newEvent);
  } catch (err) {
    // Mongoose validation hatası
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: "Doğrulama hatası", details: err.message });
    }
    res.status(500).json({ error: "Sunucu hatası", details: err.message });
  }
};
