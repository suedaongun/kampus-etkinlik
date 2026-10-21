import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EventProvider } from "./context/EventContext";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { EventsPage } from "./pages/EventsPage";
import { EventDetailPage } from "./pages/EventDetailPage";
import { EventFormPage } from "./pages/EventFormPage";
import "./App.css";

export default function App() {
  return (
    <EventProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/etkinlikler" element={<EventsPage />} />
              <Route path="/etkinlik/:id" element={<EventDetailPage />} />
              <Route path="/ekle" element={<EventFormPage mode="create" />} />
              <Route path="/guncelle/:id" element={<EventFormPage mode="update" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </EventProvider>
  );
}