import React, { useState } from "react";
import { fetchCommoditySeries } from "./usdaApi";

export default function UsdaPanel() {
  const [commodity, setCommodity] = useState("PAPAYA");
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(26);
  const [years, setYears] = useState(5);
  const [busy, setBusy] = useState(false);
  const [rows, setRows] = useState([]);

  async function run() {
    setBusy(true);
    try {
      const series = await fetchCommoditySeries({
        commodity,
        wFrom: Number(from),
        wTo: Number(to),
        yearsBack: Number(years),
      });
      // flatten into a table friendly format
      const flat = [];
      for (const s of series) {
        for (const r of s.rows) flat.push({ year: s.year, week: r.week, price: r.price });
      }
      setRows(flat.sort((a,b)=> (a.year-b.year)||(a.week-b.week)));
    } catch (e) {
      console.error(e);
      setRows([]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="usda" className="container" style={{paddingTop:24}}>
      <h2 style={{marginBottom:12}}>USDA QuickStats</h2>
      <div className="card" style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))", gap:12}}>
        <label>Commodity
          <input className="input" value={commodity} onChange={e=>setCommodity(e.target.value)} />
        </label>
        <label>Week From
          <input className="input" type="number" min="1" max="52" value={from} onChange={e=>setFrom(e.target.value)} />
        </label>
        <label>Week To
          <input className="input" type="number" min="1" max="52" value={to} onChange={e=>setTo(e.target.value)} />
        </label>
        <label>Years Back
          <input className="input" type="number" min="1" max="10" value={years} onChange={e=>setYears(e.target.value)} />
        </label>
        <div style={{display:"flex", alignItems:"end"}}>
          <button className="btn" onClick={run} disabled={busy}>{busy ? "Loadingâ€¦" : "Fetch"}</button>
        </div>
      </div>

      <div style={{marginTop:12}} className="card">
        <div style={{fontSize:12, opacity:.7, marginBottom:8}}>Rows: {rows.length}</div>
        <div style={{ overflow: "auto" }}>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead>
              <tr>
                <th style={{textAlign:"left", padding:"6px 8px", borderBottom:"1px solid #eee"}}>Year</th>
                <th style={{textAlign:"left", padding:"6px 8px", borderBottom:"1px solid #eee"}}>Week</th>
                <th style={{textAlign:"left", padding:"6px 8px", borderBottom:"1px solid #eee"}}>Price</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i)=>(
                <tr key={i}>
                  <td style={{padding:"6px 8px", borderBottom:"1px solid #f3f4f6"}}>{r.year}</td>
                  <td style={{padding:"6px 8px", borderBottom:"1px solid #f3f4f6"}}>{r.week}</td>
                  <td style={{padding:"6px 8px", borderBottom:"1px solid #f3f4f6"}}>{r.price}</td>
                </tr>
              ))}
              {rows.length===0 && (
                <tr><td colSpan={3} style={{padding:"8px 8px"}}>No data yet. Click <em>Fetch</em>.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
