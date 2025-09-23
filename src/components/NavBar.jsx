import React from "react";
import { Link, useLocation } from "react-router-dom";

// SAFE import: if AuthContext isn't wired yet, we won't crash.
import * as Auth from "../../context/AuthContext";
const useAuth =
  Auth && Auth.useAuth
    ? Auth.useAuth
    : () => ({ profile: null, logout: () => {} });

// If you still use AppModeContext, keep it; otherwise we’ll fall back safely.
import * as Mode from "../../context/AppModeContext";
const useAppMode =
  Mode && Mode.useAppMode
    ? Mode.useAppMode
    : () => ({ mode: "demo", setMode: () => {} });

const NavItem = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-xl text-sm ${
        active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"
      }`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const { mode, setMode } = useAppMode();
  const { profile, logout } = useAuth();

  return (
    <div className="sticky top-0 z-40">
      <div className="backdrop-blur bg-neutral-950/70 border-b border-neutral-800">
        <nav className="container py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600" />
            <div className="font-bold text-lg tracking-tight">AuditDNA</div>
          </div>

          <div className="flex-1" />

          <div className="hidden md:flex items-center gap-1">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/marketplace">AgriTrade</NavItem>
            <NavItem to="/factoring">Factoring</NavItem>
            <NavItem to="/equipment">Equipment</NavItem>
            <NavItem to="/mortgage">Mortgage</NavItem>
            <NavItem to="/lender-match">Lender Match</NavItem>
            <NavItem to="/usda-pricing">USDA Pricing</NavItem>
            <NavItem to="/admin">Admin</NavItem>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Mode</span>
            <button
              onClick={() => setMode(mode === "demo" ? "live" : "demo")}
              className={`btn ${mode === "live" ? "bg-green-600/70 border-green-400/40" : "bg-slate-900/80"}`}
            >
              {String(mode || "demo").toUpperCase()}
            </button>

            {profile ? (
              <>
                <span className="text-xs text-neutral-300">
                  {profile.name || profile.email}
                </span>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
