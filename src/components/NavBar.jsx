import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DNALogo from "./DNALogo";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, isFuturistic, isDark } = useTheme();
  const isAuthed = !!localStorage.getItem("auth_token");

  const navLinkClass = ({ isActive }) => {
    const baseClasses = "px-4 py-2 rounded font-semibold transition-all duration-300 transform hover:scale-105";
    
    if (isFuturistic) {
      return isActive
        ? `${baseClasses} bg-gradient-to-r from-cyan-500/30 to-green-500/30 text-cyan-200 shadow-[0_0_15px_rgba(0,212,255,0.6)] border border-cyan-400/50`
        : `${baseClasses} text-cyan-200/80 hover:bg-cyan-500/20 hover:text-cyan-200 hover:shadow-[0_0_10px_rgba(0,212,255,0.3)]`;
    } else if (isDark) {
      return isActive
        ? `${baseClasses} bg-gray-700 text-white shadow-lg`
        : `${baseClasses} text-gray-300 hover:bg-gray-800/60 hover:text-white`;
    } else {
      return isActive
        ? `${baseClasses} bg-blue-700 text-white shadow-lg`
        : `${baseClasses} text-slate-100 hover:bg-blue-800/60 hover:text-white`;
    }
  };

  const mainNavItems = [
    { to: "/", label: "Dashboard", end: true },
    { to: "/services", label: "Services" },
    { to: "/uploads", label: "Uploads" },
    { to: "/audit-engines", label: "AI Engines" },
    { to: "/mexico-loans", label: "Mexico RE/Loans" },
    { to: "/admin", label: "Admin" },
  ];

  const secondaryNavItems = [
    { to: "/modules", label: "Modules" },
    { to: "/tickers", label: "Tickers" },
    { to: "/usda-search", label: "USDA" },
    { to: "/chat", label: "Chat" },
  ];

  return (
    <header className={`
      sticky top-0 z-50 border-b shadow-sm transition-all duration-300
      ${isFuturistic 
        ? 'bg-black/90 backdrop-blur-lg border-cyan-500/30 shadow-[0_0_20px_rgba(0,212,255,0.3)]' 
        : isDark
          ? 'bg-gray-900/95 backdrop-blur-lg border-gray-700/50' 
          : 'bg-white/95 backdrop-blur-lg border-slate-200/50'
      }
    `}>
      <div className={`
        transition-all duration-300
        ${isFuturistic 
          ? 'bg-gradient-to-r from-cyan-900/20 via-black/50 to-green-900/20' 
          : isDark
            ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800'
            : 'bg-gradient-to-r from-blue-600 via-blue-700 to-green-600'
        }
      `}>
        <div className="container py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <NavLink to="/dashboard" className={`
              flex items-center gap-3 font-bold text-xl transition-all duration-300 group
              ${isFuturistic ? 'text-cyan-300 hover:text-cyan-200' : 'text-white hover:text-blue-100'}
            `}>
              <div className={`
                transition-all duration-300 group-hover:scale-110
                ${isFuturistic ? 'filter drop-shadow-[0_0_10px_rgba(0,212,255,0.8)]' : ''}
              `}>
                <DNALogo size="md" />
              </div>
              <div>
                <div className={`
                  font-bold text-lg leading-none transition-all duration-300
                  ${isFuturistic 
                    ? 'text-transparent bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text' 
                    : 'text-white'
                  }
                `}>
                  AuditDNA
                </div>
                <div className={`
                  text-xs font-normal transition-all duration-300
                  ${isFuturistic ? 'text-cyan-200/80' : 'text-blue-100'}
                `}>
                  AI Audit & Compliance Platform
                </div>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
              <nav className="flex items-center gap-1">
                {mainNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={navLinkClass}
                  >
                    {item.label}
                  </NavLink>
                ))}
                {isAuthed ? (
                  <button
                    onClick={() => {
                      localStorage.removeItem("auth_token");
                      location.href = "/login";
                    }}
                    className="nav-link-inactive"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                )}
              </nav>
              
              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`
                lg:hidden p-2 rounded-lg transition-all duration-300
                ${isFuturistic 
                  ? 'text-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_10px_rgba(0,212,255,0.5)]' 
                  : 'text-white hover:bg-white/20'
                }
              `}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Secondary Navigation (Desktop) */}
          <div className={`
            hidden lg:flex items-center gap-1 mt-2 pt-2 border-t transition-all duration-300
            ${isFuturistic ? 'border-cyan-500/30' : 'border-white/20'}
          `}>
            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? `px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                        isFuturistic 
                          ? 'bg-cyan-500/30 text-cyan-200 shadow-[0_0_10px_rgba(0,212,255,0.5)]' 
                          : 'bg-white/20 text-white'
                      }`
                    : `px-2 py-1 rounded text-xs transition-all duration-300 ${
                        isFuturistic 
                          ? 'text-cyan-200/80 hover:bg-cyan-500/20 hover:text-cyan-200' 
                          : 'text-white/80 hover:bg-white/10'
                      }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`
          lg:hidden border-b shadow-lg transition-all duration-300
          ${isFuturistic 
            ? 'bg-black/95 backdrop-blur-lg border-cyan-500/30' 
            : isDark
              ? 'bg-gray-900/95 backdrop-blur-lg border-gray-700'
              : 'bg-white border-slate-200'
          }
        `}>
          <div className="container py-4">
            <nav className="space-y-2">
              <div className={`
                font-semibold text-sm mb-3 transition-colors duration-300
                ${isFuturistic ? 'text-cyan-300' : isDark ? 'text-gray-300' : 'text-slate-600'}
              `}>
                Main Navigation
              </div>
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => {
                    const baseClasses = "block px-3 py-2 rounded-lg font-medium transition-all duration-300";
                    if (isFuturistic) {
                      return isActive
                        ? `${baseClasses} bg-gradient-to-r from-cyan-500/20 to-green-500/20 text-cyan-200 border border-cyan-400/30`
                        : `${baseClasses} text-cyan-200/80 hover:bg-cyan-500/20 hover:text-cyan-200`;
                    } else if (isDark) {
                      return isActive
                        ? `${baseClasses} bg-gray-700 text-white`
                        : `${baseClasses} text-gray-300 hover:bg-gray-800`;
                    } else {
                      return isActive
                        ? `${baseClasses} bg-blue-50 text-blue-700`
                        : `${baseClasses} text-slate-700 hover:bg-slate-50`;
                    }
                  }}
                >
                  {item.label}
                </NavLink>
              ))}

              <div className={`
                border-t my-3 transition-colors duration-300
                ${isFuturistic ? 'border-cyan-500/30' : isDark ? 'border-gray-700' : 'border-slate-200'}
              `}></div>
              
              <div className={`
                font-semibold text-sm mb-2 transition-colors duration-300
                ${isFuturistic ? 'text-cyan-300' : isDark ? 'text-gray-300' : 'text-slate-600'}
              `}>
                Tools & Features
              </div>
              {secondaryNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => {
                    const baseClasses = "block px-3 py-2 rounded-lg font-medium transition-all duration-300";
                    if (isFuturistic) {
                      return isActive
                        ? `${baseClasses} bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-200 border border-green-400/30`
                        : `${baseClasses} text-green-200/80 hover:bg-green-500/20 hover:text-green-200`;
                    } else if (isDark) {
                      return isActive
                        ? `${baseClasses} bg-green-700 text-white`
                        : `${baseClasses} text-gray-400 hover:bg-gray-800`;
                    } else {
                      return isActive
                        ? `${baseClasses} bg-green-50 text-green-700`
                        : `${baseClasses} text-slate-600 hover:bg-slate-50`;
                    }
                  }}
                >
                  {item.label}
                </NavLink>
              ))}

              <div className={`
                border-t my-3 transition-colors duration-300
                ${isFuturistic ? 'border-cyan-500/30' : isDark ? 'border-gray-700' : 'border-slate-200'}
              `}></div>
              
              {/* Mobile Theme Toggle */}
              <div className="px-3 py-2">
                <ThemeToggle className="w-full justify-center" />
              </div>
              
              {isAuthed ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("auth_token");
                    location.href = "/login";
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    block w-full text-left px-3 py-2 rounded-lg transition-all duration-300
                    ${isFuturistic 
                      ? 'text-red-400 hover:bg-red-500/20 hover:text-red-300' 
                      : isDark
                        ? 'text-red-400 hover:bg-red-900/20'
                        : 'text-red-600 hover:bg-red-50'
                    }
                  `}
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-3 py-2 rounded-lg font-medium transition-all duration-300
                    ${isFuturistic 
                      ? 'text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300' 
                      : isDark
                        ? 'text-blue-400 hover:bg-blue-900/20'
                        : 'text-blue-600 hover:bg-blue-50'
                    }
                  `}
                >
                  Login
                </NavLink>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}