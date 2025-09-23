import React from "react";
export default function AgreementsPage() {
  return (
    <div style={{ padding: "3rem 1rem", maxWidth: 800, margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#253858", marginBottom: 24 }}>Required Agreements</h1>
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: "2rem" }}>
        <ul>
          <li>Grower KYB Consent (D&B check)</li>
          <li>Buyer Verification Consent</li>
          <li>PO Financing T&Cs</li>
          <li>Factoring Agreement</li>
          <li>UCC Consent</li>
          <li>Data Privacy + CFPB/GLBA/CCPA Notices</li>
          <li>Import/Logistics Consent (LA warehouse)</li>
        </ul>
        <p style={{ marginTop: 24 }}>PDF Viewer: <a href="/docs/Agreements/sample.pdf" target="_blank" rel="noopener noreferrer">View Sample Agreement</a></p>
      </div>
    </div>
  );
}