import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo">
          🎓 Kampüs Etkinlikleri
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Ana Sayfa
          </NavLink>
          <NavLink to="/etkinlikler" className={({ isActive }) => (isActive ? "active" : "")}>
            Etkinlikler
          </NavLink>
          <NavLink to="/ekle" className={({ isActive }) => (isActive ? "active" : "")}>
            Etkinlik Ekle
          </NavLink>
        </nav>
      </div>
    </header>
  );
};