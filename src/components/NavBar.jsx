import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/services", label: "Services" },
    { to: "/uploads", label: "Uploads" },
    { to: "/agreements", label: "Agreements" },
    { to: "/marketing", label: "Marketing" },
    { to: "/pitchdeck", label: "Pitch Deck" },
    { to: "/tickers", label: "Tickers" },
    { to: "/admin", label: "Admin" },
  ];
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/90 border-b border-brand-silver">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-green text-white font-extrabold grid place-items-center shadow">AD</div>
          <div>
            <div className="text-lg font-bold text-gray-900">AuditDNA</div>
            <div className="text-xs text-gray-600">AI Audit & Compliance Platform</div>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                "px-3 py-1.5 rounded-lg text-sm font-medium transition " +
                (isActive
                  ? "bg-gradient-to-r from-brand-green to-brand-yellow text-gray-900"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-brand-blue hover:to-brand-green")
              }
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
