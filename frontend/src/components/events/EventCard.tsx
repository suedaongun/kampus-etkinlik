import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";

interface EventCardProps {
  event: CampusEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="event-card">
      {event.image && <img src={event.image} alt={event.title} className="event-card-image" style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px" }} />}
      <span className="category-badge">{event.category}</span>
      <h3>{event.title}</h3>
      <p><strong>Tarih:</strong> {event.date} - {event.time}</p>
      <p><strong>Konum:</strong> {event.location}</p>
      <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      <Link to={`/etkinlik/${event.id}`} className="btn-detail" style={{ marginTop: "auto" }}>
        Detayları Gör
      </Link>
    </div>
  );
};