import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navStyle = ({ isActive }) =>
    isActive
      ? "px-4 py-2 rounded bg-blue-200 text-blue-900 font-semibold"
      : "px-4 py-2 rounded text-gray-700 hover:bg-gray-100";
  return (
    <header className="border-b bg-white/90 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold text-blue-900">AuditDNA</div>
        <nav className="flex gap-2">
          <NavLink to="/" end className={navStyle}>Home</NavLink>
          <NavLink to="/mortgages" className={navStyle}>Mortgages</NavLink>
          <NavLink to="/ag-market" className={navStyle}>Ag Market</NavLink>
          <NavLink to="/trade-finance" className={navStyle}>Trade Finance</NavLink>
          <NavLink to="/tickers" className={navStyle}>Tickers</NavLink>
          <NavLink to="/auditdna" className={navStyle}>AuditDNA</NavLink>
          <NavLink to="/compliance" className={navStyle}>Compliance</NavLink>
          {isLoggedIn
            ? <button onClick={logout} className="ml-4 text-red-600 font-bold">Logout</button>
            : <NavLink to="/login" className={navStyle}>Login</NavLink>
          }
        </nav>
      </div>
    </header>
  );
}