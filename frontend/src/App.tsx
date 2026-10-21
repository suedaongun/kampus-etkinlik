import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

  useEffect(() => {
    let titleText = "Kampüs Etkinlikleri";
    if (page === "home") titleText = "Kampüs Etkinlikleri — Ana Sayfa";
    else if (page === "events") titleText = "Kampüs Etkinlikleri — Tüm Etkinlikler";
    else if (page === "detail" && selectedEvent) titleText = `Kampüs Etkinlikleri — ${selectedEvent.title}`;
    else if (page === "add") titleText = "Kampüs Etkinlikleri — Etkinlik Ekle";
    else if (page === "update") titleText = "Kampüs Etkinlikleri — Etkinlik Güncelle";
    document.title = titleText;
  }, [page, selectedEvent]);

  const upcomingEvents = [...events]
    .sort((a, b) => {
      const [gA, aA, yA] = a.date.split("-");
      const [gB, aB, yB] = b.date.split("-");
      return `${yA}-${aA}-${gA}`.localeCompare(`${yB}-${aB}-${gB}`);
    })
    .slice(0, 2);

  const filteredEvents = filterByCategory(searchEvents(events, searchText), selectedCategory);
  const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

  const headerTitle =
    page === "detail" && selectedEvent ? selectedEvent.title
    : page === "update" ? "Etkinlik Güncelle"
    : page === "add" ? "Etkinlik Ekle"
    : page === "events" ? "Tüm Etkinlikler"
    : "Kampüs Etkinlikleri";

  const headerText =
    page === "home" ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
    : page === "events" ? "Ekim ayında kampüste düzenlenen etkinlikler."
    : undefined;

  return (
    <>
      <header className="site-header">
        <Header title={headerTitle} text={headerText} />
        <Navigation current={page} onNavigate={go} />
      </header>

      <main className="ana-icerik">
        {page === "home" && (
          <>
            <h2 className="sayfa-basligi">Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcomingEvents} onShowDetail={(id) => go("detail", id)} />
            <div>
              <button className="btn-yesil" onClick={() => go("events")}>
                Tüm etkinlikleri gör →
              </button>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={selectedCategory}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setSelectedCategory}
            />
            <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "1rem" }}>
              {filteredEvents.length} etkinlik listeleniyor.
            </p>
            <EventList
              events={filteredEvents}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && selectedEvent && (
          <EventDetail event={selectedEvent} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {(page === "add" || page === "update") && (
          <EventForm
            onSubmit={() => window.scrollTo(0, 0)}
            event={page === "update" ? selectedEvent : undefined}
            categories={categories}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
