import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <div>
      <div className="detay-kapsayici">
        <div className="detay-afis">
          <div className="afis-kutu">
            <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
              {event.title}
            </h2>
            <p style={{ opacity: 0.8, fontSize: "0.95rem" }}>
              {formatDate(event.date)} · {event.location}
            </p>
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.85rem",
              color: "#666",
              marginTop: "0.5rem",
              fontStyle: "italic",
            }}
          >
            {event.title} afişi
          </p>
        </div>

        <div className="detay-kunye">
          <h3 style={{ marginBottom: "1rem", color: "var(--renk-ana)" }}>
            Etkinlik Künyesi
          </h3>
          <dl className="kunye-listesi">
            <dt style={{ fontWeight: "bold" }}>Tarih</dt>
            <dd>
              {formatDate(event.date)}, {event.time}
            </dd>

            <dt style={{ fontWeight: "bold" }}>Yer</dt>
            <dd>{event.location}</dd>

            <dt style={{ fontWeight: "bold" }}>Kategori</dt>
            <dd>{event.category}</dd>

            <dt style={{ fontWeight: "bold" }}>Kontenjan</dt>
            <dd>
              {event.capacity ? `${event.capacity} kişi` : "Belirtilmedi"}
            </dd>
          </dl>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: "1.2rem",
          marginBottom: "1.5rem",
        }}
      >
        <h3 style={{ marginBottom: "0.5rem", color: "var(--renk-ana)" }}>
          Açıklama
        </h3>
        <p>{event.description}</p>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button className="btn-yesil" onClick={onBack}>
          ← Listeye dön
        </button>
        <button
          className="btn-yesil"
          onClick={() => onEdit(event.id)}
        >
          Bu etkinliği güncelle
        </button>
      </div>
    </div>
  );
}

export default EventDetail;
