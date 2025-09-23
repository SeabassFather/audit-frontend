import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

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
      { to: "/docs", label: "Documentation", icon: "📚" },
      { to: "/legal-audit", label: "Legal & Audit Docs", icon: "⚖️" },
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
  const { theme, isFuturistic, isDark } = useTheme();
  
  return (
    <aside className={`
      w-64 min-h-screen py-6 px-4 border-r transition-all duration-300
      ${isFuturistic 
        ? 'bg-gradient-to-b from-slate-900/90 to-slate-800/90 backdrop-blur-lg border-cyan-500/20' 
        : isDark
          ? 'bg-gradient-to-b from-gray-900 to-gray-800 border-gray-700'
          : 'bg-gradient-to-b from-gray-50 to-white border-gray-200/60'
      }
    `}>
      <div className="space-y-6">
        {toolGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            <h3 className={`
              text-xs font-semibold uppercase tracking-wider px-3 transition-colors duration-300
              ${isFuturistic 
                ? 'text-cyan-300/80' 
                : isDark 
                  ? 'text-gray-400' 
                  : 'text-gray-500'
              }
            `}>
              {group.title}
            </h3>
            <nav className="space-y-1">
              {group.links.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => {
                    const baseClasses = "flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-300 group hover:scale-105";
                    
                    if (isFuturistic) {
                      return isActive
                        ? `${baseClasses} bg-gradient-to-r from-cyan-500/30 to-green-500/30 text-cyan-200 shadow-[0_0_15px_rgba(0,212,255,0.4)] border border-cyan-400/50`
                        : `${baseClasses} text-cyan-200/70 hover:bg-cyan-500/20 hover:text-cyan-200 hover:shadow-[0_0_10px_rgba(0,212,255,0.2)]`;
                    } else if (isDark) {
                      return isActive
                        ? `${baseClasses} bg-gray-700 text-white shadow-lg`
                        : `${baseClasses} text-gray-300 hover:bg-gray-700/60 hover:text-white`;
                    } else {
                      return isActive
                        ? `${baseClasses} bg-blue-50 text-blue-700 shadow-sm`
                        : `${baseClasses} text-gray-700 hover:bg-gray-100 hover:text-gray-900`;
                    }
                  }}
                >
                  <span className={`
                    text-base transition-all duration-300 group-hover:scale-110
                    ${isFuturistic ? 'filter drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]' : ''}
                  `}>
                    {icon}
                  </span>
                  <span className="transition-all duration-300">{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}