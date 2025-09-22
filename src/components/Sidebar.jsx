import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const toolGroups = [
  {
    title: "Core Services",
    links: [
      { to: "/services", label: "Services & Pricing", icon: "⚡" },
      { to: "/audit-engines", label: "AI Audit Engines", icon: "🤖" },
      { to: "/compliance/comprehensive", label: "Compliance Dashboard", icon: "📋" },
    ]
  },
  {
    title: "Financial Services", 
    links: [
      { to: "/mortgage/comprehensive-search", label: "Mortgage Search", icon: "🏠" },
      { to: "/marketplace/factoring", label: "Ag Factoring", icon: "💰" },
      { to: "/mexico-loans", label: "Mexico RE/Loans", icon: "🌎" },
    ]
  },
  {
    title: "Analytics & Data",
    links: [
      { to: "/pricing/usda-dashboard", label: "USDA Analytics", icon: "🌾" },
      { to: "/tickers", label: "Market Data", icon: "📊" },
      { to: "/environmental/eco-tech", label: "Eco & Water Tech", icon: "🌱" },
    ]
  },
  {
    title: "Admin & Tools",
    links: [
      { to: "/uploads", label: "File Uploads", icon: "📁" },
      { to: "/admin/comprehensive", label: "Admin Panel", icon: "⚙️" },
      { to: "/agreements", label: "Agreements", icon: "📋" },
    ]
  },
  {
    title: "Business Tools",
    links: [
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
