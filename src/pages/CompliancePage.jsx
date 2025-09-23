import React from "react";
export default function CompliancePage() {
  return (
    <div style={{ padding: "3rem 1rem", maxWidth: 800, margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#253858", marginBottom: 24 }}>Compliance Center</h1>
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: "2rem" }}>
        <ul>
          <li>Regulatory Rules</li>
          <li>Compliance Checklists</li>
          <li>Reporting Portal</li>
          <li>Recent Filings</li>
          <li>Risk Alerts</li>
        </ul>
        <p style={{ marginTop: 24 }}>
          <button className="btn-main" type="button">Run Compliance Check</button>
        </p>
      </div>
    </div>
  );
}