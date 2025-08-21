import React from "react";
import { NavLink } from "react-router-dom";

export default function TopNav(){
  return (
    <header className="topbar">
      <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div className="brand">AuditDNA</div>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/programs">Programs</NavLink>
          <NavLink to="/loan-match">Loan Match</NavLink>
          <NavLink to="/compliance">Compliance</NavLink>
          <NavLink to="/elite">Elite</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </div>
    </header>
  );
}