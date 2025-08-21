import React, { useEffect, useMemo, useRef, useState } from "react";

// pull dataset injected by mockApi
const SERIES = window.__ADNA_SERIES__ || {};
const COLORS = ["#7aa2ff","#63e6be","#ff9db0","#ffd166","#9d7bff","#5ad2e6","#b7e07c","#ff6f91","#a0776b","#ff7d4f","#d7e66f","#90caf9","#ffd08a","#d7b7f4"];

function MiniChart({rows}) {
  const w=900,h=320,p=56, weeks=26;
  const list=rows.map(r=>({name:r,vals:SERIES[r]})).filter(x=>Array.isArray(x.vals));
  const flat=list.flatMap(x=>x.vals); const max=flat.length?Math.max(...flat):1; const min=flat.length?Math.min(...flat):0;
  const sx=(i)=>p + (i*(w-p*2)/(weeks-1)); const sy=(v)=>h-p-((v-min)/(max-min||1))*(h-p*2);
  return (<svg viewBox={`0 0 ${w} ${h}`} className="bigChart glass">
    <g stroke="#243045">{Array.from({length:6},(_,i)=><line key={i} x1={p} x2={w-p} y1={p+i*((h-p*2)/5)} y2={p+i*((h-p*2)/5)}/> )}</g>
    {list.map((s,idx)=>{
      const d=s.vals.map((v,i)=>`${i?"L":"M"} ${sx(i)} ${sy(v)}`).join(" ");
      return <g key={s.name}><path d={d} stroke={COLORS[idx%COLORS.length]} strokeWidth="3" fill="none"/></g>;
    })}
    <text x={w/2} y="28" textAnchor="middle" className="chartTitle">Price Comparison (W1W26)</text>
  </svg>);
}

function PACAChecker(){
  const [lic,setLic]=useState(""); const [res,setRes]=useState(null); const [loading,setLoading]=useState(false);
  async function run(){
    setLoading(true); setRes(null);
    try{ const r = await fetch(`/api/paca?license=${encodeURIComponent(lic)}`); const j = await r.json(); setRes(j);}catch{ setRes({status:"Error"});} finally{ setLoading(false); }
  }
  return (<div className="card glass">
    <h3>PACA License Verification</h3>
    <div className="inline">
      <input placeholder="License #" value={lic} onChange={e=>setLic(e.target.value)} />
      <button onClick={run} disabled={!lic || loading}>{loading?"Checking":"Verify"}</button>
    </div>
    {res && <div className="mut" style={{marginTop:8}}>
      <b>Status:</b> {res.status} {res.firm?<> <b>Firm:</b> {res.firm}  <b>Issued:</b> {res.issued}  <b>Expires:</b> {res.expires}</>:null}
    </div>}
  </div>);
}

export default function AgSearchCompare(){
  const [q,setQ]=useState(""); const [opts,setOpts]=useState(Object.keys(SERIES).sort());
  const [picked,setPicked]=useState(["Tomatoes","Avocado","Strawberries"]);
  const [hits,setHits]=useState(opts);
  useEffect(()=>{(async()=>{const r=await fetch(`/api/market/search?q=${encodeURIComponent(q)}`); const j=await r.json(); setHits(j.hits||[]);})();},[q]);
  const add=(n)=>!picked.includes(n)&&setPicked(p=>[...p,n]); const rm=(n)=>setPicked(p=>p.filter(x=>x!==n)); const clr=()=>setPicked([]);
  const table = useMemo(()=>picked.map(n=>({name:n,last:SERIES[n]?.at(-1)??null,avg:(SERIES[n]?.reduce((a,b)=>a+b,0)/(SERIES[n]?.length||1))??null})),[picked]);

  return (<div className="panel">
    <div className="panelHead"><h2>Ag Search  Price Comparison</h2></div>
    <div className="searchBar glass">
      <div className="searchRow">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search commodities (e.g., apples, lettuce, beef)"/>
        <div className="searchActions"><button onClick={()=>setPicked(hits.slice(0,6))}>Top Results</button><button className="ghost" onClick={clr}>Clear</button></div>
      </div>
      <div className="results">{hits.map(n=><button key={n} onClick={()=>add(n)} className={picked.includes(n)?"on":""}>{n}</button>)}</div>
    </div>

    <MiniChart rows={picked}/>
    <div className="tableWrap"><table className="tbl">
      <thead><tr><th>Commodity</th><th>Latest</th><th>Avg (W1W26)</th><th></th></tr></thead>
      <tbody>{table.map(r=><tr key={r.name}><td>{r.name}</td><td>${r.last?.toFixed(2)}</td><td>${r.avg?.toFixed(2)}</td><td><button className="link" onClick={()=>rm(r.name)}>Remove</button></td></tr>)}</tbody>
    </table></div>

    <div className="grid2">
      <PACAChecker/>
      <div className="card glass">
        <h3>Seller Upload (spec sheet)</h3>
        <div className="grid2 s">
          <input placeholder="Commodity (e.g., Tomatoes)"/>
          <input placeholder="Origin (e.g., MX, CA, USA)"/>
          <input placeholder="Pack / Grade"/>
          <input placeholder="Price (USD / unit)"/>
          <input placeholder="Min Order Qty"/>
          <input placeholder="Contact Email"/>
        </div>
        <div className="inline"><input type="file"/><button>Upload</button></div>
        <p className="mut">Uploads route to your backend once wired; stored as listing attachments (PDF/CSV/images).</p>
      </div>
    </div>
  </div>);
}