﻿import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const nav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/services", label: "Services" },
  { to: "/audit-engines", label: "AI Engines" },
  { to: "/mexico-loans", label: "Mexico RE/Loans" },
  { to: "/uploads", label: "Uploads" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <NavLink to="/dashboard" className="flex items-center gap-3 text-ocean-700 font-bold text-xl">
            <div className="inline-grid place-items-center w-10 h-10 rounded-xl2 bg-gradient-to-br from-ocean-500 to-ocean-600 text-white shadow-soft">
              AD
            </div>
            <div>
              <div>AuditDNA</div>
              <div className="text-xs text-gray-500 font-normal hidden sm:block">AI Audit & Compliance Platform</div>
            </div>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-1">
              {nav.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `nav-link w-full justify-start ${isActive ? "nav-link-active" : "nav-link-inactive"}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
