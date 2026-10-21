import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <div>
        <span className="kart-etiket">{event.category}</span>
        <h2>{event.title}</h2>
        <p className="kart-bilgi">
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p className="kart-bilgi">Yer: {event.location}</p>
        <p className="kart-bilgi">
          Kontenjan: {event.capacity ? `${event.capacity} kişi` : "Belirtilmedi"}
        </p>
        <p className="kart-bilgi" style={{ marginTop: "0.4rem" }}>
          {event.description}
        </p>
      </div>
      <button className="kart-link" onClick={() => onShowDetail(event.id)}>
        Detayları gör
      </button>
    </article>
  );
}

export default EventCard;
