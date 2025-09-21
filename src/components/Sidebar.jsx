import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/services", label: "Services", icon: "🛠️" },
  { to: "/uploads", label: "Uploads", icon: "📁" },
  { to: "/agreements", label: "Agreements", icon: "📋" },
  { to: "/marketing", label: "Marketing", icon: "📈" },
  { to: "/pitchdeck", label: "Pitch Deck", icon: "📑" },
  { to: "/tickers", label: "Tickers", icon: "💹" },
  { to: "/engines", label: "AI Engines", icon: "🤖" },
  { to: "/clients", label: "Clients", icon: "👥" },
  { to: "/partners", label: "Partners", icon: "🤝" },
  { to: "/mexico", label: "Mexico/US", icon: "🌎" },
  { to: "/admin", label: "Admin", icon: "⚙️" }
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-white/70 backdrop-blur min-h-screen border-r border-gray-200 py-6 px-3">
      <div className="mb-6 px-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Navigation
        </h3>
      </div>
      
      <nav className="flex flex-col gap-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 " +
              (isActive
                ? "bg-gradient-to-r from-brand-blue to-brand-green text-white shadow-soft"
                : "text-gray-700 hover:bg-gradient-to-r hover:from-brand-green/10 hover:to-brand-blue/10 hover:text-gray-900")
            }
          >
            <span className="text-base">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="mt-8 px-3">
        <div className="bg-gradient-to-br from-brand-green/10 to-brand-blue/10 rounded-lg p-4 border border-brand-silver/50">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Stats</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Clients</span>
              <span className="font-medium">2,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Live Audits</span>
              <span className="font-medium">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">System Health</span>
              <span className="font-medium text-green-600">99.9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Status */}
      <div className="mt-4 px-3">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h4 className="text-sm font-semibold text-gray-900">AI Engines</h4>
          </div>
          <div className="text-xs text-gray-600">
            <div>OCR Engine: Online</div>
            <div>Facial Recognition: Online</div>
            <div>Document Analysis: Online</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
