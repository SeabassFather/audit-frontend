import React from "react";
import { NavLink } from "react-router-dom";

const mainLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/services", label: "Services" },
  { to: "/uploads", label: "Uploads" },
  { to: "/agreements", label: "Agreements" },
  { to: "/marketing", label: "Marketing" },
  { to: "/pitchdeck", label: "Pitch Deck" },
  { to: "/tickers", label: "Tickers" },
  { to: "/audit-engines", label: "AI Engines" },
  { to: "/admin", label: "Admin" },
];

const searchEngines = [
  { to: "/search", label: "🔍 All Search Engines" },
  { to: "/search/usda", label: "USDA Pricing" },
  { to: "/search/mexico-loans", label: "Mexico Real Estate" },
  { to: "/search/factoring", label: "Factoring & Capital" },
  { to: "/search/mortgage", label: "US Mortgage Search" },
  { to: "/search/trade-finance", label: "Trade Finance" },
  { to: "/search/ag-marketplace", label: "Ag Marketplace" },
];

const hardNavLinks = [
  { to: "/mexico-loans", label: "🇲🇽 Mexico RE/Loans" },
  { to: "/mortgage", label: "🏠 Mortgage Tools" },
  { to: "/usda", label: "🌾 USDA Direct" },
];
export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-green-200 via-yellow-100 to-cyan-100 py-4 px-2">
      <nav className="flex flex-col gap-4">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2 px-3">Main</h3>
          <div className="flex flex-col gap-1">
            {mainLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-lg font-semibold hover:bg-green-100 text-sm ${isActive ? "bg-green-300 text-green-900" : "text-gray-700"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Search Engines */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2 px-3">Search Engines</h3>
          <div className="flex flex-col gap-1">
            {searchEngines.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-lg font-medium hover:bg-emerald-100 text-sm ${isActive ? "bg-emerald-300 text-emerald-900" : "text-gray-700"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* AUDITDNA HARD NAV */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2 px-3">Quick Access</h3>
          <div className="flex flex-col gap-1">
            {hardNavLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-lg font-bold hover:bg-yellow-100 text-sm ${isActive ? "bg-yellow-300 text-yellow-900" : "text-gray-800"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
