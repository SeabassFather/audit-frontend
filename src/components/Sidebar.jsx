import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "📊", description: "Overview & Analytics" },
  { to: "/services", label: "Services", icon: "⚙️", description: "Service Management" },
  { to: "/uploads", label: "Uploads", icon: "📤", description: "Document Upload" },
  { to: "/agreements", label: "Agreements", icon: "📋", description: "Contract Management" },
  { to: "/marketing", label: "Marketing", icon: "📢", description: "Marketing Tools" },
  { to: "/pitchdeck", label: "Pitch Deck", icon: "🎯", description: "Presentation Tools" },
  { to: "/tickers", label: "Tickers", icon: "📈", description: "Market Data" },
  { to: "/audit-engines", label: "AI Engines", icon: "🤖", description: "AI Analytics" },
  { to: "/mexico-loans", label: "Mexico Real Estate", icon: "🏘️", description: "Real Estate Loans" },
  { to: "/admin", label: "Admin", icon: "👥", description: "Administration" },
  { to: "/clients", label: "Clients", icon: "👤", description: "Client Management" },
  { to: "/partners", label: "Partners", icon: "🤝", description: "Partner Network" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 ease-in-out min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 border-r border-gray-200 shadow-lg flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {!isCollapsed && (
            <span className="text-sm font-semibold text-gray-700">Navigation</span>
          )}
          <span className="text-gray-500 text-lg">
            {isCollapsed ? '→' : '←'}
          </span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map(({ to, label, icon, description }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center p-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-white hover:shadow-md"
              }`
            }
            title={isCollapsed ? `${label} - ${description}` : undefined}
          >
            <span className="text-xl flex-shrink-0">{icon}</span>
            {!isCollapsed && (
              <div className="ml-3 flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{label}</div>
                <div className="text-xs opacity-75 truncate">{description}</div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className={`${isCollapsed ? 'text-center' : 'flex items-center space-x-3'} text-xs text-gray-500`}>
          {isCollapsed ? (
            <span>📊</span>
          ) : (
            <>
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AD</span>
              </div>
              <div>
                <div className="font-semibold text-gray-700">AuditDNA</div>
                <div>AI Compliance Platform</div>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
