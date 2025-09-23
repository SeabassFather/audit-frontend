import React from "react";
import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#253858",
          marginBottom: 24,
        }}
      >
        Welcome to AuditDNA
      </h1>
      <p style={{ fontSize: "1.15rem", color: "#3a4767", marginBottom: 32 }}>
        The beast platform for lending, audit, compliance, ag marketplace,
        finance, and more.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        <Link to="/services" className="btn-main">
          Services
        </Link>
        <Link to="/mortgage" className="btn-main">
          Mortgage Search
        </Link>
        <Link to="/trade-finance" className="btn-main">
          Trade Finance
        </Link>
        <Link to="/ag-market" className="btn-main">
          Ag Marketplace
        </Link>
        <Link to="/tickers" className="btn-main">
          Market Tickers
        </Link>
        <Link to="/agreements" className="btn-main">
          Agreements
        </Link>
        <Link to="/dashboard" className="btn-main">
          Dashboard
        </Link>
        <Link to="/compliance" className="btn-main">
          Compliance
        </Link>
      </div>
    </div>
  );
}
