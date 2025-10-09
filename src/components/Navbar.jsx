import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

const NavItem = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50" 
          : "text-blue-700 hover:bg-blue-100"
      }`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <div className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-blue-200/50 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/50">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            AuditDNA
          </div>
        </Link>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/audit-catalog">Services</NavItem>
          <NavItem to="/ag-market">AgriTrade</NavItem>
          <NavItem to="/mortgages">Mortgage</NavItem>
          <NavItem to="/search-engines">Search Engines</NavItem>
          <NavItem to="/upload">Upload</NavItem>
        </div>
      </nav>
    </div>
  );
}
