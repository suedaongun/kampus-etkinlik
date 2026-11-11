const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// GET /events — Tüm etkinlikleri getir
router.get("/", eventController.getAllEvents);

// GET /events/:id — Belirli bir etkinliği getir
router.get("/:id", eventController.getEventById);

// POST /events — Yeni etkinlik ekle
router.post("/", eventController.createEvent);

module.exports = router;
