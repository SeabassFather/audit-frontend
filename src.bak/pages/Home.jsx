import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div className="page">
      <h1> Welcome to AuditDNA</h1>
      <p>Your unified platform for Programs, Loan Matching, Compliance, and Elite services.</p>
      <div style={{marginTop:16, display:"flex", gap:12, flexWrap:"wrap"}}>
        <Link className="btn" to="/programs">Programs</Link>
        <Link className="btn" to="/loan-match">Loan Match</Link>
        <Link className="btn" to="/compliance">Compliance</Link>
        <Link className="btn" to="/elite">Elite</Link>
      </div>
    </div>
  );
}