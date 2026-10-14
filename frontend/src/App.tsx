import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  searchEvents,
  filterByCategory,
  findEventById,
  formatDate
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
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
    else if (page === "detail" && selectedEvent)
      titleText = `Kampüs Etkinlikleri — ${selectedEvent.title}`;
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

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
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
        <button className="kart-link" onClick={() => go("detail", event.id)}>
          Detayları gör
        </button>
      </article>
    );
  }

  return (
    <>
      <header className="site-header">
        <h1 className="site-baslik">
          {page === "detail" && selectedEvent
            ? selectedEvent.title
            : page === "update"
            ? "Etkinlik Güncelle"
            : page === "add"
            ? "Etkinlik Ekle"
            : page === "events"
            ? "Tüm Etkinlikler"
            : "Kampüs Etkinlikleri"}
        </h1>
        <p className="site-alt-aciklama">
          Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.
        </p>

        <nav className="ana-menu">
          <button
            className={page === "home" ? "aktif" : ""}
            aria-current={page === "home" ? "page" : undefined}
            onClick={() => go("home")}
          >
            Ana Sayfa
          </button>
          <button
            className={page === "events" ? "aktif" : ""}
            aria-current={page === "events" ? "page" : undefined}
            onClick={() => go("events")}
          >
            Etkinlikler
          </button>
          <button
            className={page === "add" ? "aktif" : ""}
            aria-current={page === "add" ? "page" : undefined}
            onClick={() => go("add")}
          >
            Ekle
          </button>
        </nav>
      </header>

      <main className="ana-icerik">
        {page === "home" && (
          <>
            <h2 className="sayfa-basligi">Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">
              {upcomingEvents.map(renderCard)}
            </section>
            <div>
              <button className="btn-yesil" onClick={() => go("events")}>
                Tüm etkinlikleri gör →
              </button>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <div className="filtre-kutusu">
              <div className="filtre-grubu">
                <label htmlFor="search">Etkinlik ara</label>
                <input
                  id="search"
                  type="search"
                  placeholder="Örn. atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="filtre-grubu">
                <label htmlFor="catSelect">Kategori</label>
                <select
                  id="catSelect"
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p style={{ fontWeight: "bold", color: "var(--renk-ana)", marginBottom: "1rem" }}>
              {filteredEvents.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi">
              {filteredEvents.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && (
          <>
            {!selectedEvent ? (
              <div>
                <div className="hata-kutusu">
                  "{selectedId || ""}" numaralı bir etkinlik bulunamadı. Listeden bir etkinlik seçin.
                </div>
                <button className="btn-yesil" onClick={() => go("events")}>
                  ← Listeye dön
                </button>
              </div>
            ) : (
              <div>
                <div className="detay-kapsayici">
                  <div className="detay-afis">
                    <div className="afis-kutu">
                      <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                        {selectedEvent.title}
                      </h3>
                      <div style={{ color: "#fb923c", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "0.8rem" }}>
                        2026
                      </div>
                      <div style={{ fontSize: "0.9rem", opacity: 0.85 }}>
                        {formatDate(selectedEvent.date)} · {selectedEvent.location}
                      </div>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.4rem", fontStyle: "italic" }}>
                      {selectedEvent.title} afişi
                    </p>
                  </div>

                  <div className="detay-kunye">
                    <h3 style={{ marginBottom: "1rem", color: "var(--renk-ana)" }}>
                      Etkinlik Künyesi
                    </h3>
                    <dl className="kunye-listesi">
                      <dt style={{ fontWeight: "bold" }}>Tarih</dt>
                      <dd>
                        {formatDate(selectedEvent.date)}, {selectedEvent.time}
                      </dd>

                      <dt style={{ fontWeight: "bold" }}>Yer</dt>
                      <dd>{selectedEvent.location}</dd>

                      <dt style={{ fontWeight: "bold" }}>Kategori</dt>
                      <dd>{selectedEvent.category}</dd>

                      <dt style={{ fontWeight: "bold" }}>Kontenjan</dt>
                      <dd>
                        {selectedEvent.capacity
                          ? `${selectedEvent.capacity} kişi`
                          : "Belirtilmedi"}
                      </dd>
                    </dl>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #ddd", paddingTop: "1.2rem", marginBottom: "1.5rem" }}>
                  <h3 style={{ marginBottom: "0.5rem", color: "var(--renk-ana)" }}>Açıklama</h3>
                  <p>{selectedEvent.description}</p>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <button className="btn-yesil" onClick={() => go("events")}>
                    ← Listeye dön
                  </button>
                  <button
                    className="btn-yesil"
                    onClick={() => go("update", selectedEvent.id)}
                  >
                    Bu etkinliği güncelle
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {(page === "add" || page === "update") && (
          <div>
            <p style={{ fontSize: "0.95rem", color: "#555", marginBottom: "1.2rem" }}>
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>

            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grubu">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Örn. Kariyer Günleri 2026"
                  maxLength={80}
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.title : ""
                  }
                />
              </div>

              <div className="form-grubu">
                <label htmlFor="category">Kategori</label>
                <select
                  id="category"
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.category : ""
                  }
                >
                  <option value="">Seçiniz</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-grubu">
                <label htmlFor="date">Tarih</label>
                <input id="date" type="date" />
              </div>

              <div className="form-grubu">
                <label htmlFor="time">Saat</label>
                <input id="time" type="time" />
              </div>

              <div className="form-grubu">
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  type="text"
                  placeholder="Örn. A Blok Konferans Salonu"
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.location : ""
                  }
                />
              </div>

              <div className="form-grubu">
                <label htmlFor="capacity">Kontenjan</label>
                <input
                  id="capacity"
                  type="number"
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.capacity : ""
                  }
                />
              </div>

              <div className="form-grubu">
                <label htmlFor="description">Açıklama</label>
                <textarea
                  id="description"
                  rows={5}
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.description : ""
                  }
                ></textarea>
              </div>

              <button type="submit" className="btn-yesil" style={{ width: "fit-content" }}>
                {page === "update" ? "Güncelle" : "Kaydet"}
              </button>
            </form>
          </div>
        )}
      </main>

      <footer>
        Ad Soyad · 2311012082 · 2026
      </footer>
    </>
  );
}

export default App;