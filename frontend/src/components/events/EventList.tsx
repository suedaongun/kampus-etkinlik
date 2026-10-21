import type { CampusEvent } from "../../types/campus-event";
import { EventCard } from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
}

export const EventList = ({ events }: EventListProps) => {
  if (events.length === 0) {
    return <p>Aradığınız kriterlere uygun etkinlik bulunamadı.</p>;
  }

  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};