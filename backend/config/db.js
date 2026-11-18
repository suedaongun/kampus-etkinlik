const mongoose = require("mongoose");
const dns = require("dns");

try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {}

const directFallback = "mongodb://suedaweb:Taekwondo7.@ac-knil0wd-shard-00-00.1zcnsob.mongodb.net:27017,ac-knil0wd-shard-00-01.1zcnsob.mongodb.net:27017,ac-knil0wd-shard-00-02.1zcnsob.mongodb.net:27017/kampus?ssl=true&replicaSet=atlas-gwwqgx-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || directFallback, {
      serverSelectionTimeoutMS: 15000
    });
    console.log(`MongoDB bağlantısı başarılı: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    if (err.message && err.message.includes("querySrv")) {
      try {
        const conn = await mongoose.connect(directFallback, { serverSelectionTimeoutMS: 15000 });
        console.log(`MongoDB bağlantısı başarılı: ${conn.connection.host}`);
        return conn;
      } catch (e2) {
        console.error("MongoDB bağlantı hatası:", e2.message);
      }
    } else {
      console.error("MongoDB bağlantı hatası:", err.message);
    }
  }
};

module.exports = connectDB;
