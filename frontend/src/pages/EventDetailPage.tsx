import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { EventDetail } from "../components/events/EventDetail";

export const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById } = useEvents();

  const event = id ? getEventById(id) : undefined;

  // Tarayıcı sekme (tab) başlığını anında günceller
  useEffect(() => {
    if (event) {
      document.title = `${event.title} | Kampüs Etkinlikleri`;
    } else {
      document.title = "Etkinlik Bulunamadı | Kampüs Etkinlikleri";
    }

    return () => {
      document.title = "Kampüs Etkinlikleri";
    };
  }, [event]);

  if (!event) {
    return (
      <div className="page-container">
        <h2>Etkinlik Bulunamadı</h2>
        <Link to="/etkinlikler">Etkinlikler listesine dön</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <EventDetail event={event} />
    </div>
  );
};