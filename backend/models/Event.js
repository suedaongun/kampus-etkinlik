const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Etkinlik başlığı zorunludur"],
      trim: true,
      minlength: [3, "Başlık en az 3 karakter olmalıdır"]
    },
    category: {
      type: String,
      required: [true, "Kategori zorunludur"],
      trim: true,
      enum: {
        values: ["Seminer", "Atölye", "Söyleşi", "Yarışma", "Konser", "Spor", "Diğer"],
        message: "{VALUE} geçerli bir kategori değil"
      }
    },
    capacity: {
      type: Number,
      default: 0,
      min: [0, "Kapasite negatif olamaz"],
      max: [10000, "Kapasite 10000'i aşamaz"]
    },
    date: {
      type: String,
      required: [true, "Tarih zorunludur"],
      trim: true
    },
    time: {
      type: String,
      required: [true, "Saat zorunludur"],
      trim: true
    },
    location: {
      type: String,
      required: [true, "Konum zorunludur"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Açıklama zorunludur"],
      trim: true,
      maxlength: [500, "Açıklama en fazla 500 karakter olabilir"]
    },
    image: {
      type: String,
      trim: true,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);
