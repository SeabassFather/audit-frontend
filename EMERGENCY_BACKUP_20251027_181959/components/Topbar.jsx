import React from "react";
import { useLocation } from "react-router-dom";
export default function Topbar() {
  const loc = useLocation();
  return (
    <header className="topbar">
      <div className="left">
        <span className="title">Control Panel</span>
        <span className="crumb">{loc.pathname}</span>
      </div>
      <div className="right">
        <span className="pill">FIRE THEME</span>
      </div>
    </header>
  );
}
