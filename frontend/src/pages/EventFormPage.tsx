import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { ContractModal } from "../components/ContractModal";
import type { Category, EventFormData } from "../types/campus-event";

interface EventFormPageProps {
  mode: "create" | "update";
}

export const EventFormPage: React.FC<EventFormPageProps> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addEvent, updateEvent, getEventById } = useEvents();

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    category: "Seminer",
    capacity: 50,
    date: "",
    time: "",
    location: "",
    description: "",
    image: "/afis.svg"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (mode === "update" && id) {
      const existing = getEventById(id);
      if (existing) {
        const { id: _, ...data } = existing;
        setFormData(data);
      }
    }
  }, [mode, id, getEventById]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = "Başlık alanı zorunludur.";
    if (!formData.date) errs.date = "Tarih zorunludur.";
    if (!formData.time) errs.time = "Saat zorunludur.";
    if (!formData.location.trim()) errs.location = "Konum zorunludur.";
    if (formData.capacity <= 0) errs.capacity = "Kontenjan 0'dan büyük olmalıdır.";
    if (!formData.description.trim()) errs.description = "Açıklama zorunludur.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === "create") {
      setIsModalOpen(true);
    } else if (id) {
      updateEvent(id, formData);
      navigate(`/etkinlik/${id}`);
    }
  };

  const handleModalAccept = () => {
    setIsModalOpen(false);
    addEvent(formData);
    navigate("/etkinlikler");
  };

  return (
    <div className="page-container form-page">
      <h2>{mode === "create" ? "Yeni Etkinlik Ekle" : "Etkinliği Güncelle"}</h2>

      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label>Etkinlik Başlığı</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
            >
              <option value="Seminer">Seminer</option>
              <option value="Atölye">Atölye</option>
              <option value="Söyleşi">Söyleşi</option>
              <option value="Yarışma">Yarışma</option>
            </select>
          </div>

          <div className="form-group">
            <label>Kontenjan</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
            />
            {errors.capacity && <span className="error-text">{errors.capacity}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tarih</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label>Saat</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
            {errors.time && <span className="error-text">{errors.time}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Konum / Salon</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          {errors.location && <span className="error-text">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label>Açıklama</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <button type="submit" className="btn-submit">
          {mode === "create" ? "Devam Et (Sözleşme Onayı)" : "Güncellemeyi Kaydet"}
        </button>
      </form>

      <ContractModal
        isOpen={isModalOpen}
        onAccept={handleModalAccept}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};