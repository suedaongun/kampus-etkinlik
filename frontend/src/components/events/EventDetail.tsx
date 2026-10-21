import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { useEvents } from "../../context/EventContext";

interface EventDetailProps {
  event: CampusEvent;
}

export const EventDetail = ({ event }: EventDetailProps) => {
  const navigate = useNavigate();
  const { deleteEvent } = useEvents();

  // Tahtadaki şart: Sekme (tab) başlığında etkinliğin adının görünmesi
  useEffect(() => {
    document.title = `${event.title} | Kampüs Etkinlikleri`;
    return () => {
      document.title = "Kampüs Etkinlikleri";
    };
  }, [event]);

  const handleDelete = () => {
    if (window.confirm("Bu etkinliği silmek istediğinize emin misiniz?")) {
      deleteEvent(event.id);
      navigate("/etkinlikler");
    }
  };

  return (
    <div className="detail-card" style={{ background: "#fff", padding: "2rem", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
      {event.image && <img src={event.image} alt={event.title} style={{ width: "100%", maxHeight: "350px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }} />}
      <span className="category-badge">{event.category}</span>
      <h1 style={{ marginTop: "0.5rem" }}>{event.title}</h1>

      <div className="detail-info" style={{ margin: "1rem 0", lineHeight: "1.8" }}>
        <p><strong>Tarih:</strong> {event.date}</p>
        <p><strong>Saat:</strong> {event.time}</p>
        <p><strong>Konum:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      </div>

      <p className="detail-description">{event.description}</p>

      <div className="detail-actions" style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <button onClick={() => navigate(`/guncelle/${event.id}`)} className="btn-edit">
          Düzenle
        </button>
        <button onClick={handleDelete} className="btn-delete">
          Sil
        </button>
        <Link to="/etkinlikler" className="btn-back" style={{ marginLeft: "auto" }}>
          ← Listeye Dön
        </Link>
      </div>
    </div>
  );
};