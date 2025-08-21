import React, { useEffect, useMemo, useRef, useState } from "react";
import { getCommodityWeeklyAvg, listCommodities } from "../services/usda";

const COLORS = ["#7aa2ff","#63e6be","#ff9db0","#ffd166","#9d7bff","#5ad2e6","#b7e07c","#ff6f91","#a0776b","#ff7d4f","#d7e66f","#90caf9","#ffd08a","#d7b7f4","#6be5ff","#d98cff"];

function Chart({series}) {
  const w=1180,h=420,p=56, weeks=26;
  const flat = series.flatMap(s=>s.values||[]);
  const max = flat.length?Math.max(...flat):1, min = flat.length?Math.min(...flat):0;
  const sx=(i)=>p + (i*(w-p*2)/(weeks-1)); const sy=(v)=>h-p-((v-min)/(max-min||1))*(h-p*2);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="bigChart">
      <g stroke="#243045">{Array.from({length:6},(_,i)=><line key={i} x1={p} x2={w-p} y1={p+i*((h-p*2)/5)} y2={p+i*((h-p*2)/5)}/> )}</g>
      {series.map((s,idx)=>(
        <g key={s.name}>
          <path d={s.values.map((v,i)=>`${i?"L":"M"} ${sx(i)} ${sy(v)}`).join(" ")}
                stroke={COLORS[idx%COLORS.length]} strokeWidth="3" fill="none"/>
          <text x={w-10} y={sy(s.values.at(-1))} textAnchor="end" fill={COLORS[idx%COLORS.length]} fontSize="12">{s.name}</text>
        </g>
      ))}
      <text x={w/2} y="28" textAnchor="middle" className="chartTitle">USDA Weekly Pricing  W1W26</text>
      <text x="24" y={h/2} transform={`rotate(-90 24 ${h/2})`} className="axisLabel" textAnchor="middle">USD / unit (weekly)</text>
      <text x={w/2} y={h-10} textAnchor="middle" className="axisLabel">Weeks</text>
    </svg>
  );
}

export default function USDACompare(){
  const [all,setAll] = useState([]);
  const [q,setQ] = useState("");
  const [picked,setPicked] = useState(["Tomatoes","Avocado","Strawberries","Pineapple","Papaya","Roma Tomato"]);
  const [data,setData] = useState([]);      // [{name, values:[]}]
  const [loading,setLoading] = useState(false);
  const [err,setErr] = useState("");

  useEffect(()=>{  // load list once
    let ok=true;
    (async()=>{
      try { const list = await listCommodities(); if(ok) setAll(list); }
      catch { setAll(["Tomatoes","Avocado","Strawberries","Pineapple","Papaya","Roma Tomato","Apples","Lettuce","Blueberries","Corn","Beef"]); }
    })();
    return ()=>{ok=false};
  },[]);

  async function refreshSeries(items=picked){
    setLoading(true); setErr("");
    try{
      const rows = await Promise.all(items.map(async n=>{
        try { const r = await getCommodityWeeklyAvg(n); return {name:n, values:r?.series?.[0]?.values||r?.values||[]}; }
        catch { return {name:n, values:[]}; }
      }));
      setData(rows);
    }catch(e){ setErr("Could not load USDA data."); }
    finally{ setLoading(false); }
  }

  useEffect(()=>{ refreshSeries(); },[]);

  const hits = useMemo(()=> all.filter(n=>n.toLowerCase().includes(q.toLowerCase())).slice(0,30),[q,all]);

  function add(n){ if(!picked.includes(n)){ const next=[...picked,n]; setPicked(next); refreshSeries(next); } }
  function rm(n){ const next=picked.filter(x=>x!==n); setPicked(next); refreshSeries(next); }
  function top(){ const next = hits.slice(0,6); setPicked(next); refreshSeries(next); }
  function clear(){ setPicked([]); setData([]); }

  return (
    <section className="panel">
      <div className="panelHead"><h2>Elite Multi-Commodity Pricing (USDA)</h2></div>

      <div className="searchBar">
        <div className="searchRow">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search commodities (e.g., tomatoes, avocado, apples)"/>
          <div className="searchActions"><button onClick={top}>Top Results</button><button className="ghost" onClick={clear}>Clear</button></div>
        </div>
        <div className="results">
          {hits.map(n=><button key={n} onClick={()=>add(n)} className={picked.includes(n)?"on":""}>{n}</button>)}
        </div>
      </div>

      {err && <div className="mut" style={{color:"#ff7f88",margin:"6px 2px"}}>{err}</div>}
      <Chart series={data}/>
      <p className="mut">Tip: Click chips to add/remove commodities. Uses <code>/api/usda/market/avg?commodity=NAME</code>. Falls back to demo if the live feed is unavailable.</p>

      {picked.length>0 && (
        <div className="tableWrap">
          <table className="tbl">
            <thead><tr><th>Commodity</th><th>Latest</th><th>Avg</th><th>Actions</th></tr></thead>
            <tbody>
              {data.map(s=>{
                const avg = s.values.length ? s.values.reduce((a,b)=>a+b,0)/s.values.length : 0;
                const last = s.values.at(-1)||0;
                return <tr key={s.name}><td>{s.name}</td><td>${last.toFixed(2)}</td><td>${avg.toFixed(2)}</td><td><button className="link" onClick={()=>rm(s.name)}>Remove</button></td></tr>;
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}