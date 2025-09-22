import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const toolGroups = [
  {
    title: "Core Services",
    links: [
      { to: "/services", label: "Services & Pricing", icon: "⚡" },
      { to: "/audit-engines", label: "AI Audit Engines", icon: "🤖" },
    ]
  },
  {
    title: "Specialized Tools", 
    links: [
      { to: "/mexico-loans", label: "Mexico RE/Loans", icon: "🏠" },
      { to: "/usda-search", label: "USDA Search", icon: "🌾" },
      { to: "/factoring", label: "Factoring Search", icon: "💰" },
    ]
  },
  {
    title: "Data & Admin",
    links: [
      { to: "/uploads", label: "File Uploads", icon: "📁" },
      { to: "/tickers", label: "Market Data", icon: "📊" },
      { to: "/admin", label: "Admin Panel", icon: "⚙️" },
    ]
  },
  {
    title: "Business Tools",
    links: [
      { to: "/agreements", label: "Agreements", icon: "📋" },
      { to: "/marketing", label: "Marketing", icon: "📢" },
      { to: "/pitchdeck", label: "Pitch Deck", icon: "🎯" },
    ]
  }
];

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-gray-50 to-white border-r border-gray-200/60 py-6 px-4">
      <div className="space-y-6">
        {toolGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
              {group.title}
            </h3>
            <nav className="space-y-1">
              {group.links.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `nav-link w-full justify-start ${isActive ? "nav-link-active" : "nav-link-inactive"}`
                  }
                >
                  <span className="text-base">{icon}</span>
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}