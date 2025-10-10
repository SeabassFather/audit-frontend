import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/services", label: "Services" },
    { path: "/mexico", label: "Mexico" },
    { path: "/compliance", label: "Compliance" },
    { path: "/eco", label: "Eco" },
    { path: "/admin", label: "Admin" }
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-xl font-bold text-white">AuditDNA</div>
        <div className="flex gap-6">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `text-sm px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-200 hover:bg-slate-700 hover:text-yellow-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
