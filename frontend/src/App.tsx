import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventFormPage from "./pages/EventFormPage";
import { CampusEvent } from "./types/campus-event";
import { initialEvents } from "./data/events";

function App() {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  const handleAddEvent = (newEvent: Omit<CampusEvent, "id">) => {
    const createdEvent: CampusEvent = {
      ...newEvent,
      id: Date.now().toString(),
    };
    setEvents((prevEvents) => [createdEvent, ...prevEvents]);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage events={events} />} />
            <Route path="/events" element={<EventsPage events={events} />} />
            <Route
              path="/events/:id"
              element={<EventDetailPage events={events} />}
            />
            <Route
              path="/add-event"
              element={<EventFormPage onAddEvent={handleAddEvent} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;