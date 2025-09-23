import React, { useState } from "react";
export default function TradeFinanceForm({ onSearch }){
  const [f,setF]=useState({
    legalName:"", duns:"", country:"", revenue:"", arAging:"",
    facility:["Factoring"], amount:"", currency:"USD", debtor:"", terms:"Net 30",
    recurrence:"One-off", season:"", collateral:"", insurance:"", inventory:"", region:"", commitment:"30 days"
  });
  const set = k => e => setF(s=>({...s,[k]: e.target.type==="checkbox"? e.target.checked : e.target.value}));
  const submit = e => { e.preventDefault(); onSearch?.(f); };
  return (
    <form onSubmit={submit} className="card">
      <div className="card-title">Business</div>
      <input className="filter" placeholder="Legal name" value={f.legalName} onChange={set("legalName")}/>
      <input className="filter" placeholder="DUNS" value={f.duns} onChange={set("duns")}/>
      <input className="filter" placeholder="Country" value={f.country} onChange={set("country")}/>
      <input className="filter" placeholder="Annual revenue" value={f.revenue} onChange={set("revenue")}/>
      <input className="filter" placeholder="AR aging summary" value={f.arAging} onChange={set("arAging")}/>

      <div className="card-title" style={{marginTop:10}}>Facility Desired</div>
      <select className="filter" value={f.facility} onChange={set("facility")}>
        <option>Factoring</option><option>PO Financing</option><option>Both</option>
      </select>

      <div className="card-title" style={{marginTop:10}}>Invoice / PO</div>
      <input className="filter" placeholder="Amount" value={f.amount} onChange={set("amount")}/>
      <input className="filter" placeholder="Currency" value={f.currency} onChange={set("currency")}/>
      <input className="filter" placeholder="Debtor / Buyer" value={f.debtor} onChange={set("debtor")}/>
      <input className="filter" placeholder="Expected Terms (Net 30/45/60/90)" value={f.terms} onChange={set("terms")}/>
      <input className="filter" placeholder="Recurrence" value={f.recurrence} onChange={set("recurrence")}/>
      <input className="filter" placeholder="Season (if seasonal)" value={f.season} onChange={set("season")}/>

      <div className="card-title" style={{marginTop:10}}>Collateral & Regions</div>
      <input className="filter" placeholder="Collateral" value={f.collateral} onChange={set("collateral")}/>
      <input className="filter" placeholder="Inventory/Crop" value={f.inventory} onChange={set("inventory")}/>
      <input className="filter" placeholder="Insurance" value={f.insurance} onChange={set("insurance")}/>
      <input className="filter" placeholder="Region (MX/CA/SA)" value={f.region} onChange={set("region")}/>
      <select className="filter" value={f.commitment} onChange={set("commitment")}><option>30 days</option><option>60 days</option><option>90 days</option><option>120 days</option><option>Seasonal</option></select>

      <button className="btn" type="submit">Search Finance Partners</button>
    </form>
  );
}