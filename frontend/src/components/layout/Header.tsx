import { NavLink, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/") return "🎓 Kampüs Etkinlikleri";
    if (path.startsWith("/etkinlikler")) return "📅 Etkinlik Listesi";
    if (path.startsWith("/ekle")) return "➕ Etkinlik Ekle";

    return "🎓 Kampüs Etkinlikleri";
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo">
          {getPageTitle()}
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