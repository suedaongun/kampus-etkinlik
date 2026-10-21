import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      document.title = "Kampüs Etkinlikleri";
    } else if (path.startsWith("/etkinlikler")) {
      document.title = "Etkinlikler | Kampüs Etkinlikleri";
    } else if (path.startsWith("/ekle")) {
      document.title = "Etkinlik Ekle | Kampüs Etkinlikleri";
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [location]);

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