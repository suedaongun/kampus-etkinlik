import mongoose from "mongoose";
import Event from "../models/event-model.js";
import { todayStart } from "../utils/date.js";

const KORUNAN_ALANLAR = ["_id", "createdAt", "updatedAt", "__v"];

function notFound(res) {
  return res.status(404).json({ error: { message: "Event not found" } });
}

// GET /events (Adım 6)
export async function getEvents(req, res, next) {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) {
      // ( * ? gibi işaretler aramayı bozmasın
      const guvenli = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.title = { $regex: guvenli, $options: "i" };
    }
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// GET /events/upcoming (Adım 7)
export async function getUpcomingEvents(req, res, next) {
  try {
    const events = await Event
      .find({ date: { $gte: todayStart() } })
      .sort({ date: 1, time: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// GET /events/:id
export async function getEventById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findById(req.params.id);
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) {
    next(err);
  }
}

// POST /events
export async function createEvent(req, res, next) {
  try {
    const body = req.body ?? {};
    const { title, category, capacity, date, time, location, description, image } = body;

    // Zorunlu alan kontrolü
    if (!title || !category || !date || !time || !location || !description) {
      return res.status(400).json({ error: { message: "Zorunlu alanlar eksik" } });
    }

    const event = await Event.create({
      title,
      category,
      capacity: capacity || 0,
      date,
      time,
      location,
      description,
      image
    });

    res.status(201).json(event);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}

// PATCH /events/:id (Adım 3)
export async function updateEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const body = req.body ?? {};
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ error: { message: "Body is empty" } });
    }
    const korunan = Object.keys(body).filter((k) => KORUNAN_ALANLAR.includes(k));
    if (korunan.length > 0) {
      return res.status(400).json({ error: { message: `${korunan.join(", ")} cannot be changed` } });
    }
    const event = await Event.findByIdAndUpdate(req.params.id, body, {
      returnDocument: "after", // güncellenmiş kaydı döndür
      runValidators: true // schema kuralları burada da çalışsın
    });
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}

// DELETE /events/:id (Adım 5)
export async function deleteEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return notFound(res); // ikinci silme de buraya
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
