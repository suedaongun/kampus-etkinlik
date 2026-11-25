import mongoose from "mongoose";

const directFallback = "mongodb://suedaweb:Taekwondo7.@ac-knil0wd-shard-00-00.1zcnsob.mongodb.net:27017,ac-knil0wd-shard-00-01.1zcnsob.mongodb.net:27017,ac-knil0wd-shard-00-02.1zcnsob.mongodb.net:27017/kampus?ssl=true&replicaSet=atlas-gwwqgx-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || directFallback;
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB bağlandı (Atlas): ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.log("SRV bağlantısı deneniyor/doğrudan bağlantıya geçiliyor...");
    try {
      const conn = await mongoose.connect(directFallback, {
        serverSelectionTimeoutMS: 10000
      });
      console.log(`MongoDB bağlandı (Atlas): ${conn.connection.host}`);
      return conn;
    } catch (e2) {
      console.error("MongoDB bağlantı hatası:", e2.message);
      throw e2;
    }
  }
};

export default connectDB;
