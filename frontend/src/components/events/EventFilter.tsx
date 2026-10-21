import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: Category | "Hepsi";
  onCategoryChange: (category: Category | "Hepsi") => void;
}

const categories: (Category | "Hepsi")[] = ["Hepsi", "Seminer", "Atölye", "Söyleşi", "Yarışma"];

export const EventFilter = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: EventFilterProps) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Etkinlik veya konum ara..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};