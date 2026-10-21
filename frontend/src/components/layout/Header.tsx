import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Navigation from "./Navigation";

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      document.title = "Kampüs Etkinlikleri - Ana Sayfa";
    } else if (path.startsWith("/events")) {
      document.title = "Etkinlikler - Kampüs Etkinlikleri";
    } else if (path.startsWith("/add-event")) {
      document.title = "Etkinlik Ekle - Kampüs Etkinlikleri";
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
        <Navigation />
      </div>
    </header>
  );
};

export default Header;