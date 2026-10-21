import type { CampusEvent, Category } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
  event?: CampusEvent;
  categories?: Category[];
}

const defaultCategories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function EventForm({
  onSubmit,
  event,
  categories = defaultCategories,
}: EventFormProps) {
  return (
    <>
      <p style={{ fontSize: "0.95rem", color: "#555", marginBottom: "1.2rem" }}>
        Bu sprintte form sadece görünüm; kayıt yapılmaz.
      </p>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="form-grubu">
          <label htmlFor="title">Etkinlik Adı</label>
          <input
            id="title"
            type="text"
            placeholder="Örn. Kariyer Günleri 2026"
            maxLength={80}
            defaultValue={event ? event.title : ""}
          />
        </div>

        <div className="form-grubu">
          <label htmlFor="category">Kategori</label>
          <select id="category" defaultValue={event ? event.category : ""}>
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
            defaultValue={event ? event.location : ""}
          />
        </div>

        <div className="form-grubu">
          <label htmlFor="capacity">Kontenjan</label>
          <input
            id="capacity"
            type="number"
            defaultValue={event ? event.capacity : ""}
          />
        </div>

        <div className="form-grubu">
          <label htmlFor="description">Açıklama</label>
          <textarea
            id="description"
            rows={5}
            defaultValue={event ? event.description : ""}
          ></textarea>
        </div>

        <button type="submit" className="btn-yesil" style={{ width: "fit-content" }}>
          {event ? "Güncelle" : "Kaydet"}
        </button>
      </form>
    </>
  );
}

export default EventForm;
