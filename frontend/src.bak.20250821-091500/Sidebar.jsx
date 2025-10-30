import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaListAlt,
  FaSearchDollar,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

export default function Sidebar() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load saved user preference
  useEffect(() => {
    const saved = localStorage.getItem("soundEnabled");
    if (saved !== null) setSoundEnabled(saved === "true");
  }, []);

  const hoverSound = new Audio("/sounds/hover.mp3");
  const clickSound = new Audio("/sounds/click.mp3");
  hoverSound.volume = 0.25;
  clickSound.volume = 0.3;

  const playHover = () => {
    if (soundEnabled) {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(() => {});
    }
  };

  const playClick = () => {
    if (soundEnabled) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  return (
    <nav className="sidebar">
      <h2 className="logo"> AuditDNA</h2>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            <FaHome className="icon" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/programs"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            <FaListAlt className="icon" /> Programs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/loanmatch"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            <FaSearchDollar className="icon" /> Loan Match
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/compliance"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            <FaShieldAlt className="icon" /> Compliance
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/elite"
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            <FaStar className="icon" /> Elite
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
