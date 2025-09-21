import React from "react";
import { NavLink } from "react-router-dom";
const links = [
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
export default function Sidebar() {
  return (
    <aside className="w-52 min-h-screen bg-gradient-to-b from-green-200 via-yellow-100 to-cyan-100 py-4 px-2">
      <nav className="flex flex-col gap-2">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block py-2 px-3 rounded-lg font-semibold hover:bg-green-100 ${isActive ? "bg-green-300 text-green-900" : "text-gray-700"}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
