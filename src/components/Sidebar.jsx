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
  { to: "/admin", label: "Admin" }
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-56 bg-brand-silver/60 min-h-screen border-r border-brand-silver py-6 px-3">
      <nav className="flex flex-col gap-2">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              "block px-3 py-2 rounded-md font-medium text-sm " +
              (isActive
                ? "bg-gradient-to-r from-brand-blue to-brand-green text-gray-900"
                : "text-gray-700 hover:bg-gradient-to-r hover:from-brand-green hover:to-brand-yellow")
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
