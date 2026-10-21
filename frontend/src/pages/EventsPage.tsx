import { useState } from "react";
import { useEvents } from "../context/EventContext";
import { EventCard } from "../components/events/EventCard";
import type { Category } from "../types/campus-event";

export const EventsPage = () => {
  const { events } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tümü" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories: ("Tümü" | Category)[] = ["Tümü", "Seminer", "Atölye", "Söyleşi", "Yarışma"];

  return (
    <div className="page-container">
      <h2>Tüm Kampüs Etkinlikleri</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Etkinlik ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="event-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p className="no-result">Aradığınız kriterlere uygun etkinlik bulunamadı.</p>
        )}
      </div>
    </div>
  );
};