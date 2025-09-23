import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthed = !!localStorage.getItem("auth_token");

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "nav-link-active"
      : "nav-link-inactive";

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
    { to: "/comprehensive-modules", label: "Comprehensive" },
    { to: "/engines", label: "Engines" },
    { to: "/checklist", label: "Checklist" },
    { to: "/tickers", label: "Tickers" },
    { to: "/usda-search", label: "USDA" },
    { to: "/chat", label: "Chat" },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200/50 shadow-sm nav">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <NavLink to="/dashboard" className="flex items-center gap-3 text-ocean-700 font-bold text-xl">
              <div className="inline-grid place-items-center w-10 h-10 rounded-xl2 bg-gradient-to-br from-ocean-500 to-ocean-600 text-white shadow-soft">
                AD
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">AuditDNA</div>
                <div className="text-xs text-blue-100 font-normal">AI Audit & Compliance Platform</div>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Secondary Navigation (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 mt-2 pt-2 border-t border-white/20">
            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "px-2 py-1 rounded text-xs bg-white/20 text-white font-medium"
                    : "px-2 py-1 rounded text-xs text-white/80 hover:bg-white/10 transition-colors"
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
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-lg">
          <div className="container py-4">
            <nav className="space-y-2">
              <div className="font-semibold text-slate-600 text-sm mb-3">Main Navigation</div>
              {mainNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium"
                      : "block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="divider my-3"></div>
              <div className="font-semibold text-slate-600 text-sm mb-2">Tools & Features</div>
              {secondaryNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 rounded-lg bg-green-50 text-green-700 font-medium"
                      : "block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="divider my-3"></div>
              {isAuthed ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("auth_token");
                    location.href = "/login";
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors font-medium"
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