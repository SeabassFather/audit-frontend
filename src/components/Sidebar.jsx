import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/services", label: "Fee Schedule & Services" },
  { to: "/agreements", label: "Agreements & Forms" },
  { to: "/policies", label: "Policies" },
  { to: "/uploads", label: "Uploads" },
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
      
      {/* Helper section */}
      <div className="mt-8 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 text-sm mb-2">Quick Access</h4>
        <div className="space-y-1 text-xs">
          <div className="text-blue-700">📋 Forms & Agreements</div>
          <div className="text-blue-700">💰 Transparent Pricing</div>
          <div className="text-blue-700">🔐 Security Policies</div>
          <div className="text-blue-700">⚡ 275+ Services</div>
        </div>
      </div>
    </aside>
  );
}
