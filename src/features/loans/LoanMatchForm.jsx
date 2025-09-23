import React, { useState } from "react";

export default function LoanMatchForm() {
  const [form, setForm] = useState({
    loanAmount: "", propertyValue: "", dti: "", ltv: "", credit: "720-759"
  });
  const set = key => e => setForm(f => ({...f, [key]: e.target.value}));
  const ltv = calcLTV(form.propertyValue, form.loanAmount);

  async function onSubmit(e){
    e.preventDefault();
    // If you flip to live HTTP mode, this will hit /api via setupProxy.js
    const mode = process.env.REACT_APP_DATA_MODE || "bundle";
    let results = [];
    if (mode === "http") {
      const params = new URLSearchParams({
        amount: form.loanAmount, dti: form.dti, ltv: ltv, credit: form.credit
      });
      const res = await fetch(`/api/loan/match?${params}`);
      results = await res.json();
    } else {
      // simple local mock
      results = [
        { lender: "First National", score: 92, estRate: 6.5, terms: "5-10 yrs" },
        { lender: "Metro Capital",  score: 84, estRate: 7.1, terms: "3-7 yrs" }
      ];
    }
    alert("Matched lenders:\\n" + results.map(r=>`${r.lender} (${r.score})`).join("\\n"));
  }

  return (
    <form onSubmit={onSubmit} style={{maxWidth:900, margin:"24px auto", padding:"0 12px"}}>
      <h1>Loan Match</h1>

      <div className="card-title" style={{marginTop:10}}>Financial</div>
      <label className="filter-label">Credit Score</label>
      <select className="filter" value={form.credit} onChange={set("credit")}
        style={{display:"block", padding:"8px 10px", background:"#111", color:"#eee", border:"1px solid #333", borderRadius:8}}>
        <option>760+</option>
        <option>720-759</option>
        <option>680-719</option>
        <option>640-679</option>
        <option>580-639</option>
        <option>&lt;580</option> {/* <-- FIX: escape "<" so Babel doesn't see a JSX tag */}
      </select>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:12}}>
        <input className="filter" placeholder="DTI %" value={form.dti} onChange={set("dti")}
          style={input} />
        <input className="filter" placeholder="LTV %" value={form.ltv} onChange={set("ltv")}
          style={input} />
        <input className="filter" placeholder="Property Value $" value={form.propertyValue} onChange={set("propertyValue")}
          style={input} />
        <input className="filter" placeholder="Loan Amount $" value={form.loanAmount} onChange={set("loanAmount")}
          style={input} />
      </div>

      <div style={{marginTop:10, fontSize:12, opacity:.8}}>Computed LTV: <b>{ltv}%</b></div>

      <button type="submit" style={{marginTop:16, padding:"10px 14px", borderRadius:10, border:"1px solid #2a2a2a", background:"#1a1a1a", color:"#eee"}}>
        Match Lenders
      </button>
    </form>
  );
}

function calcLTV(propVal, loanAmt) {
  const v = Number(propVal || 0);
  const l = Number(loanAmt || 0);
  if (v <= 0) return 0;
  return Math.round((l / v) * 1000) / 10;
}

const input = {padding:"10px 12px", background:"#111", color:"#eee", border:"1px solid #333", borderRadius:8};