import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="nav-links">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
        Ana Sayfa
      </NavLink>
      <NavLink to="/events" className={({ isActive }) => (isActive ? "active" : "")}>
        Etkinlikler
      </NavLink>
      <NavLink to="/add-event" className={({ isActive }) => (isActive ? "active" : "")}>
        Etkinlik Ekle
      </NavLink>
    </nav>
  );
};

export default Navigation;