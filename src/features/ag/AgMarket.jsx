import React, { useMemo, useState } from "react";

const MOCK = [
  { commodity: "Corn",   date: "2025-07-01", price: 4.52 },
  { commodity: "Corn",   date: "2025-07-15", price: 4.65 },
  { commodity: "Wheat",  date: "2025-07-01", price: 6.12 },
  { commodity: "Wheat",  date: "2025-07-15", price: 6.05 },
  { commodity: "Soybeans", date: "2025-07-01", price: 12.30 },
  { commodity: "Soybeans", date: "2025-07-15", price: 12.48 }
];

export default function AgMarket() {
  const [term, setTerm] = useState("");
  const list = useMemo(() => {
    const q = term.toLowerCase();
    return q ? MOCK.filter(r => r.commodity.toLowerCase().includes(q)) : MOCK;
  }, [term]);

  const groups = useMemo(() => {
    const m = new Map();
    for (const r of list) {
      if (!m.has(r.commodity)) m.set(r.commodity, []);
      m.get(r.commodity).push(r);
    }
    // sort within commodity by date
    for (const arr of m.values()) { arr.sort((a,b)=>a.date.localeCompare(b.date)); }
    return [...m.entries()];
  }, [list]);

  return (
    <div style={{maxWidth:900, margin:"24px auto", padding:"0 12px"}}>
      <h1>USDA Commodity Lens</h1>
      <input
        value={term}
        onChange={(e)=>setTerm(e.target.value)}
        placeholder="Search commodity (e.g., Corn, Wheat, Soybeans)"
        style={{width:"100%", padding:"10px 12px", borderRadius:8, border:"1px solid #333", background:"#111", color:"#eee"}}
      />
      {groups.map(([name, rows]) => (
        <div key={name} style={{marginTop:16, background:"#121212", border:"1px solid #2a2a2a", borderRadius:10}}>
          <div style={{padding:"10px 14px", fontWeight:700}}>{name}</div>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead><tr><th style={th}>Date</th><th style={th}>Price</th></tr></thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i}>
                  <td style={td}>{r.date}</td>
                  <td style={td}>${r.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* simple inline sparkline */}
          <svg viewBox="0 0 300 60" style={{width:"100%", height:60, display:"block"}}>
            {(() => {
              const xs = rows.map((_,i)=> (i/(rows.length-1||1))*300);
              const ys = rows.map(r => 60 - ((r.price - rows[0].price + 0.2) * 40)); // tiny scale
              const d = xs.map((x,i)=> `${i?"L":"M"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
              return <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />;
            })()}
          </svg>
        </div>
      ))}
    </div>
  );
}
const th = { textAlign:"left", padding:"8px 10px", borderBottom:"1px solid #222" };
const td = { padding:"8px 10px", borderBottom:"1px solid #1a1a1a" };