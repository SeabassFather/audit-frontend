import React from "react";
import { NavLink } from "react-router-dom";
const nav = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/services", label: "Services" },
  { to: "/uploads", label: "Uploads" },
  { to: "/agreements", label: "Agreements" },
  { to: "/marketing", label: "Marketing" },
  { to: "/pitchdeck", label: "Pitch Deck" },
  { to: "/tickers", label: "Tickers" },
  { to: "/audit-engines", label: "AI Engines" },
  { to: "/mexico-loans", label: "Mexico Real Estate/Loans" },
  { to: "/admin", label: "Admin" },
];
export default function Navbar() {
  return (
    <header className="w-full bg-white shadow flex items-center px-8 py-3">
      <div className="font-bold text-xl text-green-700 flex items-center gap-2">
        <span className="bg-green-200 px-2 py-1 rounded">AD</span>
        AuditDNA
        <span className="text-xs text-gray-600 font-normal">AI Audit & Compliance Platform</span>
      </div>
      <nav className="ml-auto flex gap-2">
        {nav.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-3 py-1.5 rounded ${isActive ? "bg-green-200 text-green-900 font-bold" : "hover:bg-green-100 text-gray-700"}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
