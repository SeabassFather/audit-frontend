import React, { useMemo, useState } from "react";

export default function LenderSearch(){
  const [q,setQ]=useState("");
  const [state,setState]=useState("");
  const [product,setProduct]=useState("");

  // No placeholders. Data must come from your backend later.
  const source = [];
  const rows = useMemo(()=>source.filter(()=>true), [q,state,product]);

  return (
    <div className="card">
      <h3>Mortgage / Lender Match</h3>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",margin:"8px 0 16px"}}>
        <input className="btn" placeholder="Search lender..." value={q} onChange={e=>setQ(e.target.value)} style={{width:220}}/>
        <input className="btn" placeholder="State (e.g., CA)" value={state} onChange={e=>setState(e.target.value.toUpperCase())} style={{width:160}}/>
        <input className="btn" placeholder="Product (HELOC, SBA, DSCR...)" value={product} onChange={e=>setProduct(e.target.value)} style={{width:260}}/>
      </div>
      <table className="table">
        <thead><tr><th>Lender</th><th>States</th><th>Products</th><th>Min FICO</th><th>Max LTV</th></tr></thead>
        <tbody>
          {rows.map((x,i)=>(
            <tr key={i}>
              <td>{x.name}</td>
              <td>{(x.states||[]).join(",")}</td>
              <td>{(x.products||[]).join(",")}</td>
              <td>{x.minFico}</td>
              <td>{x.maxLTV}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}