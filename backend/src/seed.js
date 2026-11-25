import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Event from "./models/event-model.js";
import { seedEvents } from "./data/seed-events.js";

const seed = async () => {
  try {
    await connectDB();

    console.log("Mevcut etkinlikler siliniyor...");
    await Event.deleteMany({});
    console.log("Mevcut etkinlikler silindi.");

    const created = await Event.insertMany(seedEvents);
    console.log(`${created.length} etkinlik eklendi.`);

    const count = await Event.countDocuments();
    console.log(`Veritabanındaki toplam kayıt: ${count}`);

    await mongoose.disconnect();
    console.log("Bağlantı kapatıldı.");
    process.exit(0);
  } catch (err) {
    console.error("Seed hatası:", err.message);
    process.exit(1);
  }
};

seed();
