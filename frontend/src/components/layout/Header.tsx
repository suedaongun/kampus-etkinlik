import { NavLink, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  // O anki URL'ye (pathname) göre üstte görünecek başlığı belirliyoruz
  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/") return "🎓 Kampüs Etkinlikleri - Ana Sayfa";
    if (path.startsWith("/etkinlikler")) return "📅 Etkinlik Listesi";
    if (path.startsWith("/ekle")) return "➕ Yeni Etkinlik Ekle";
    if (path.includes("robotik")) return "🤖 Robotik Etkinlikleri";

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