import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});

connectDB().catch((err) => {
  console.error("İlk bağlantıda hata oluştu, arka planda yeniden denenecek:", err.message);
});
