import React, { useEffect, useMemo, useState } from "react";
import CommodityPicker from "../components/CommodityPicker";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const WEEKS = Array.from({length:26}, (_,i)=>`W${i+1}`);

export default function MarketSearch(){
  const [selected, setSelected] = useState(["Tomatoes","Avocados","Strawberries","Pineapples","Papayas","Roma Tomatoes"]);
  const [country, setCountry] = useState("MX");
  const [state, setState] = useState("");
  const [season, setSeason] = useState("All");
  const [pack, setPack] = useState("");
  const [incoterm, setIncoterm] = useState("FOB");
  const [volume, setVolume] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function run(){
    setErr(""); setLoading(true);
    try {
      const list = (selected||[])
        .map(x => x.toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,""))
        .map(x => x.replace(/^roma_tomatoes$/,"roma"));
      const qs = encodeURIComponent(list.join(","));
      const r = await fetch(`/api/market/avg?commodities=${qs}`);
      const j = await r.json();
      setData(j && j.data ? j.data : {});
    } catch(e) { setErr(String(e)); }
    finally { setLoading(false); }
  }

  useEffect(()=>{ run(); /* initial */ },[]);

  const chart = useMemo(()=>{
    if (!data) return null;
    const palette = ["#1e90ff","#22c55e","#f43f5e","#f59e0b","#8b5cf6","#0ea5e9","#ef4444","#84cc16","#e11d48","#10b981"];
    const ds = Object.entries(data).map(([k,arr],i)=>({
      label: k.replace(/_/g," ").replace(/\b\w/g,m=>m.toUpperCase()),
      data: Array.isArray(arr) ? arr : [],
      borderColor: palette[i % palette.length],
      backgroundColor: palette[i % palette.length] + "55",
      tension: 0.25,
      pointRadius: 2
    }));
    return { labels: WEEKS, datasets: ds };
  },[data]);

  return (
    <div style={{padding:"20px"}}>
      <h1 style={{fontSize:28, marginBottom:12}}>USDA Commodity Search & Pricing</h1>
      <p style={{color:"#6b7280", marginBottom:16}}>Select commodities, set terms, and pull 26-week weekly averages. Flip to live AMS later without changing the UI.</p>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16}}>
        <div>
          <label style={{display:"block", marginBottom:8, fontWeight:600}}>Commodity Selector</label>
          <CommodityPicker value={selected} onChange={setSelected}/>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(2,minmax(0,1fr))", gap:12, alignContent:"start"}}>
          <div>
            <label>Country</label>
            <input value={country} onChange={e=>setCountry(e.target.value)} placeholder="MX/US/PE/BR…" style={{width:"100%", padding:"10px 12px", border:"1px solid #d1d5db", borderRadius:8}}/>
          </div>
          <div>
            <label>State/Region</label>
            <input value={state} onChange={e=>setState(e.target.value)} placeholder="BCN/SIN/JAL/CA/TX…" style={{width:"100%", padding:"10px 12px", border:"1px solid #d1d5db", borderRadius:8}}/>
          </div>
          <div>
            <label>Season</label>
            <select value={season} onChange={e=>setSeason(e.target.value)} style={{width:"100%", padding:"10px 12px", border:"1px solid #d1d5db", borderRadius:8}}>
              <option>All</option><option>Winter</option><option>Spring</option><option>Summer</option><option>Fall</option>
            </select>
          </div>
          <div>
            <label>Packaging</label>
            <input value={pack} onChange={e=>setPack(e.target.value)} placeholder="25 lb, 1L clamshell, 48ct…" style={{width:"100%", padding:"10px 12px", border:"1px solid #d1d5db", borderRadius:8}}/>
          </div>
          <div>
            <label>Incoterm</label>
            <select value={incoterm} onChange={e=>setIncoterm(e.target.value)} style={{width:"100%", padding:"10px 12px", border:"1px solid #d1d5db", borderRadius:8}}>
              <option>FOB</option><option>CIF</option><option>CFR</option><option>EXW</option>
            </select>
          </div>
          <div>
            <label>Volume (loads/units)</label>
            <input value={volume} onChange={e=>setVolume(e.target.value)} placeholder="e.g., 4 loads/week" style={{width:"100%", padding:"10px 12px", border:"1px solid #d1d5db", borderRadius:8}}/>
          </div>
          <div style={{gridColumn:"span 2"}}>
            <button onClick={run} style={{padding:"12px 14px", borderRadius:10, background:"#1e90ff", color:"#fff", border:"none"}}>Get Snapshot</button>
          </div>
          <div style={{gridColumn:"span 2", fontSize:12, color:"#6b7280"}}>Tip: when we flip LIVE_USDA=1, this chart reads AMS automatically.</div>
        </div>
      </div>

      {err && <div style={{color:"#ef4444", marginBottom:10}}>{err}</div>}
      {loading && <div>Loading…</div>}
      {chart && <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:12, padding:12}}>
        <Line data={chart} options={{responsive:true, plugins:{legend:{position:"bottom"}}, scales:{y:{title:{display:true,text:"USD"}}}}} />
      </div>}
    </div>
  );
}
