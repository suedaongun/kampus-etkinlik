import { useState, FormEvent } from "react";
import type { CampusEvent, Category } from "../../types/campus-event";

interface EventFormProps {
  initialValues?: Partial<CampusEvent>;
  onSubmit: (formData: Omit<CampusEvent, "id">) => void;
  buttonText: string;
}

export const EventForm = ({ initialValues, onSubmit, buttonText }: EventFormProps) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [category, setCategory] = useState<Category>(initialValues?.category || "Seminer");
  const [capacity, setCapacity] = useState(initialValues?.capacity || 50);
  const [date, setDate] = useState(initialValues?.date || "");
  const [time, setTime] = useState(initialValues?.time || "");
  const [location, setLocation] = useState(initialValues?.location || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [image, setImage] = useState(initialValues?.image || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time || !location) {
      alert("Lütfen zorunlu alanları doldurun.");
      return;
    }
    onSubmit({
      title,
      category,
      capacity: Number(capacity),
      date,
      time,
      location,
      description,
      image
    });
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="form-group">
        <label>Etkinlik Başlığı *</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Kategori</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </div>

        <div className="form-group">
          <label>Kontenjan</label>
          <input type="number" min="1" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Tarih *</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Saat *</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
      </div>

      <div className="form-group">
        <label>Konum *</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Görsel URL (İsteğe Bağlı)</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
      </div>

      <div className="form-group">
        <label>Açıklama</label>
        <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <button type="submit" className="btn-submit">
        {buttonText}
      </button>
    </form>
  );
};