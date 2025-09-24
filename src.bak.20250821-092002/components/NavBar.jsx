import React from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) => "link" + (isActive ? " active" : "");

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-inner container">
        <div className="brand">AuditDNA</div>
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/programs" className={linkClass}>
          Programs
        </NavLink>
        <NavLink to="/loan-match" className={linkClass}>
          Loan Match
        </NavLink>
        <NavLink to="/compliance" className={linkClass}>
          Compliance
        </NavLink>
        <NavLink to="/elite" className={linkClass}>
          Elite
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          Settings
        </NavLink>
        <div className="spacer" />
        <button className="btn">Get Help</button>
      </div>
    </nav>
  );
}
