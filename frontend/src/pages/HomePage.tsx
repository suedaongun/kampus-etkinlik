import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { EventCard } from "../components/events/EventCard";

export const HomePage = () => {
  const { events } = useEvents();
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="page-container">
      <section className="hero">
        <h2>Kampüsteki Tüm Etkinlikler Tek Yerde!</h2>
        <p>Seminerler, atölyeler ve söyleşilerden anında haberdar olun, yerinizi ayırtın.</p>
      </section>

      <section className="section">
        <div className="section-header">
          <h3>Yaklaşan Etkinlikler</h3>
          <Link to="/etkinlikler" className="link-all">
            Tümünü Gör →
          </Link>
        </div>
        <div className="event-grid">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
};