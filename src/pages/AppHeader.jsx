import React from "react";
import { NavLink, Link } from "react-router-dom";
const linkStyle = ({ isActive }) =>
  "px-3 py-2 rounded-xl border text-sm font-medium mx-1 " +
  (isActive ? "bg-blue-100 text-blue-900" : "hover:bg-blue-50 text-blue-700");

export default function AppHeader() {
  return (
    <header style={{ background: "#fff", borderBottom: "1px solid #e4e7ec", padding: "0.5rem 0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
        <Link to="/" style={{ fontWeight: "bold", fontSize: 22, color: "#253858", marginRight: 24 }}>AuditDNA</Link>
        <nav style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <NavLink to="/" style={linkStyle}>Home</NavLink>
          <NavLink to="/services" style={linkStyle}>Services</NavLink>
          <NavLink to="/mortgage" style={linkStyle}>Mortgage</NavLink>
          <NavLink to="/trade-finance" style={linkStyle}>Trade Finance</NavLink>
          <NavLink to="/ag-market" style={linkStyle}>Ag Marketplace</NavLink>
          <NavLink to="/tickers" style={linkStyle}>Tickers</NavLink>
          <NavLink to="/agreements" style={linkStyle}>Agreements</NavLink>
          <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
          <NavLink to="/compliance" style={linkStyle}>Compliance</NavLink>
        </nav>
      </div>
    </header>
  );
}