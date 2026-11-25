import express from "express";
import cors from "cors";
import healthRoute from "./routes/health-route.js";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoute);
app.use("/events", eventRoutes);

// Tanımsız route 404
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Hata yakalama
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: { message: err.message || "Sunucu hatası" } });
});

export default app;
