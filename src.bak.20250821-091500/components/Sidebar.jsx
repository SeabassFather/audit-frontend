import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: " Home" },
  { path: "/programs", label: " Programs" },
  { path: "/loanmatch", label: " Loan Match" },
  { path: "/compliance", label: " Compliance" },
  { path: "/elite", label: " Elite" },
  { path: "/settings", label: " Settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div
      style={{
        width: "220px",
        background: "#222",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <h2 style={{ color: "#0ff" }}> AuditDNA</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {navItems.map((item) => (
          <li key={item.path} style={{ margin: "15px 0" }}>
            <Link
              to={item.path}
              style={{
                color: location.pathname === item.path ? "#0ff" : "#fff",
                textDecoration: "none",
                fontWeight: location.pathname === item.path ? "bold" : "normal",
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
