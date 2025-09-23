import React from "react";
export default function Services() {
  const items = [
    {
      t: "Mortgage Compliance",
      d: "TRID, RESPA, ECOA  pipeline QC, post-close, data audits, vendor oversight.",
      a: "Request Scope",
    },
    {
      t: "PAC A & Ag Compliance",
      d: "PACA verification, supplier vetting, traceability and lot audits.",
      a: "Verify Now",
    },
    {
      t: "Financial Controls",
      d: "SOX-lite for startups, policy authoring, segregation of duties, approvals.",
      a: "Book Review",
    },
    {
      t: "Data & Model Risk",
      d: "Model governance, drift monitoring, audit trails, red-team testing.",
      a: "Get Assessment",
    },
  ];
  return (
    <div className="page">
      <h2>Audit & Compliance Services</h2>
      <div className="cards">
        {items.map((x, i) => (
          <div key={i} className="card product glass">
            <h3>{x.t}</h3>
            <div className="mut">{x.d}</div>
            <div className="cardActions">
              <a className="btn">{x.a}</a>
              <a className="btn ghost">Contact</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
