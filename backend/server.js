require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const healthRoute = require("./routes/healthRoute");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/health", healthRoute);
app.use("/events", eventRoutes);

// 404 — Tanımsız route
app.use((req, res) => {
  res.status(404).json({ error: "Route bulunamadı" });
});

// Sunucuyu başlat ve MongoDB'ye bağlan
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});

connectDB();
