import React, { useEffect, useMemo, useState } from "react";
import { getMortgage30Y, getFredSeries } from "../services/fred";

function Line({points,color="#7aa2ff",w=960,h=260,p=40}){
  if(!points?.length) return null;
  const min = Math.min(...points.map(p=>p.y)), max = Math.max(...points.map(p=>p.y));
  const sx = i => p + i*(w-p*2)/(points.length-1);
  const sy = v => h-p-((v-min)/(max-min||1))*(h-p*2);
  const d = points.map((pt,i)=>`${i?"L":"M"} ${sx(i)} ${sy(pt.y)}`).join(" ");
  return <svg viewBox={`0 0 ${w} ${h}`} className="bigChart"><path d={d} stroke={color} strokeWidth="3" fill="none"/></svg>;
}

export default function Mortgage(){
  const [seriesId,setSeriesId]=useState("MORTGAGE30US");
  const [obs,setObs]=useState([]);
  const [loading,setLoading]=useState(false);
  async function load(id){
    setLoading(true);
    try{
      const j = id==="MORTGAGE30US" ? await getMortgage30Y() : await getFredSeries(id);
      const list = (j?.observations||[]).filter(o=>o.value!=="." && o.value!=null).slice(-120).map((o,i)=>({x:o.date,y:+o.value}));
      setObs(list);
    }finally{ setLoading(false); }
  }
  useEffect(()=>{ load(seriesId); },[]);
  const last = obs.at(-1)?.y ?? null;

  return (<div className="page">
    <h2>Mortgage  FRED</h2>
    <div className="searchBar glass">
      <div className="searchRow">
        <input value={seriesId} onChange={e=>setSeriesId(e.target.value)} placeholder="FRED series (e.g., MORTGAGE30US, DGS10, CPIAUCSL)" />
        <div className="searchActions"><button onClick={()=>load(seriesId)} disabled={loading}>{loading?"Loading":"Load"}</button></div>
      </div>
    </div>
    <div className="card glass"><div className="mut">Latest</div><div style={{fontSize:28,fontWeight:900}}>{last!=null?`${last}`:""}</div></div>
    <Line points={obs}/>
    <p className="mut">Pulled via <code>/api/fred/series/{seriesId}</code>. Put your <code>FRED_KEY</code> in <code>.env</code> for full access.</p>
  </div>);
}