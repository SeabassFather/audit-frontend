import React, { useMemo, useState } from "react";

const LENDERS = [
  { name: "ABC Bank",    scenarios: ["purchase","refi","cashout"], minScore: 620, maxLTV: 80, heloc: true,  state: "CA" },
  { name: "Delta Home",  scenarios: ["purchase","refi"],           minScore: 640, maxLTV: 85, heloc: false, state: "CA" },
  { name: "Everest Mtg", scenarios: ["refi","cashout"],            minScore: 600, maxLTV: 75, heloc: true,  state: "AZ" },
  { name: "Futura Fed",  scenarios: ["purchase","heloc"],          minScore: 660, maxLTV: 90, heloc: true,  state: "NV" },
  { name: "Golden Cap",  scenarios: ["purchase","refi","heloc"],   minScore: 700, maxLTV: 95, heloc: true,  state: "CA" }
];

function matches(l, f){
  const sOk = !f.scenario || l.scenarios.includes(f.scenario);
  const scoreOk = !f.score || (Number(f.score) <= l.minScore ? false : true); // borrower score must be > lender min
  const ltvOk = !f.ltv || (Number(f.ltv) <= l.maxLTV);
  const stateOk = !f.state || l.state.toLowerCase().includes(f.state.toLowerCase());
  const helocOk = f.heloc === "" || (f.heloc === "yes" ? l.heloc : !l.heloc);
  return sOk && scoreOk && ltvOk && stateOk && helocOk;
}

export default function LenderMatch(){
  const [filters, setFilters] = useState({ scenario:"", score:"", ltv:"", state:"", heloc:"" });

  const data = useMemo(() => LENDERS.filter(l => matches(l, filters)), [filters]);

  const setF = (k, v) => setFilters(prev => ({ ...prev, [k]: v }));

  return (
    <div className="p-4">
      <h2 className="h2">Lender Match</h2>
      <div className="filters">
        <select value={filters.scenario} onChange={e=>setF("scenario", e.target.value)}>
          <option value="">Scenario</option>
          <option value="purchase">Purchase</option>
          <option value="refi">Refinance</option>
          <option value="cashout">Cash-Out</option>
          <option value="heloc">HELOC</option>
        </select>
        <input placeholder="Borrower Score (e.g. 680)" value={filters.score} onChange={e=>setF("score", e.target.value)} />
        <input placeholder="Max LTV (e.g. 80)" value={filters.ltv} onChange={e=>setF("ltv", e.target.value)} />
        <input placeholder="State (e.g. CA)" value={filters.state} onChange={e=>setF("state", e.target.value)} />
        <select value={filters.heloc} onChange={e=>setF("heloc", e.target.value)}>
          <option value="">HELOC?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Lender</th><th>Scenarios</th><th>Min Score</th><th>Max LTV</th><th>HELOC</th><th>State</th>
          </tr>
        </thead>
        <tbody>
          {data.map((l, i)=>(
            <tr key={i}>
              <td>{l.name}</td>
              <td>{l.scenarios.join(", ")}</td>
              <td>{l.minScore}</td>
              <td>{l.maxLTV}%</td>
              <td>{l.heloc ? "Yes" : "No"}</td>
              <td>{l.state}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr><td colSpan="6" style={{textAlign:"center"}}>No matches</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}