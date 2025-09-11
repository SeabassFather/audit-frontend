// src/features/usda/USDAPricing.jsx
import React, { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { searchReports, fetchReportSeries } from "./mmnClient";
import { fetchNassPriceOverlay } from "./nassClient";

const COMMODITIES = [
  { id:"Papaya", label:"Papaya" },
  { id:"Oranges", label:"Oranges (Navel)" },
  { id:"Oranges Valencia", label:"Oranges (Valencia)" },
  { id:"Avocado", label:"Avocado (Hass)" },
  { id:"Tomato Roma", label:"Tomato (Roma)" },
];

function generateSeries(seed=100, vol=12){
  const rng=(i)=>(Math.sin(i*12.9898)*43758.5453)%1;
  return Array.from({length:52},(_,i)=>Math.max(0,+(seed + (rng(i)-0.5)*vol + (i%13)-6).toFixed(2)));
}
function synthesizeCommodity(id){
  const base={Papaya:22,Oranges:28,"Oranges Valencia":26,Avocado:38,"Tomato Roma":14}[id]||20;
  const y=new Date().getFullYear(); const years=[y-4,y-3,y-2,y-1,y];
  const series=years.map((yy,idx)=>({year:yy,data:generateSeries(base+idx*1.2)}));
  const rows=Array.from({length:52},(_,i)=>{ const r={week:i+1}; series.forEach(({year,data})=>r[year]=data[i]); return r; });
  return {years,rows};
}
function withFiveYearAverage(rows, years){
  return rows.map(r=>{ const vals=years.map(y=>Number(r[y])).filter(Number.isFinite); const avg=vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null; return {...r,Avg5y:avg!=null?+avg.toFixed(2):null}; });
}
function firstHalfStats(rows, years){
  const first=rows.filter(r=>r.week<=26).flatMap(r=>years.map(y=>r[y]).filter(Number.isFinite));
  if(!first.length) return {avg:null,min:null,max:null};
  const avg=first.reduce((a,b)=>a+b,0)/first.length; return {avg:+avg.toFixed(2),min:+Math.min(...first).toFixed(2),max:+Math.max(...first).toFixed(2)};
}
function toCSV(rows, years){ const header=["week",...years,"Avg5y"].join(","); const lines=rows.map(r=>[r.week,...years.map(y=>r[y]??""),r.Avg5y??""].join(",")); return [header,...lines].join("
"); }

export default function USDAPricing(){
  const [commodity,setCommodity]=useState(COMMODITIES[0].id);
  const [rows,setRows]=useState(null);
  const [years,setYears]=useState([]);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");

  useEffect(()=>{
    let cancelled=false;
    (async()=>{
      setLoading(true); setErr("");
      try{
        const now=new Date(); const since=new Date(now); since.setFullYear(since.getFullYear()-5); const until=new Date(now);
        const reports=await searchReports({commodity}); const chosen=reports[0]; if(!chosen) throw new Error("No relevant MMN reports for "+commodity);
        const json=await fetchReportSeries({reportId:chosen.slug_id||chosen.report_id||chosen.id, commodity, since, until});
        const entries=(json.results||json.report||json||[]).flatMap(page=>{ const sections=page?.sections||page?.body||[]; return sections.flatMap(sec=>sec?.table||sec?.results||[]); });
        if(!entries?.length) throw new Error("MMN report returned no tabular price entries.");
        const points=[];
        for(const e of entries){
          const ds=e.report_date||e.trans_date||e.date||e.published_date;
          const vNum=(x)=>{ if(x==null) return null; const n=Number(String(x).replace(/[^0-9.\-]/g,"")); return isFinite(n)?n:null; };
          const mid=(a,b)=>{ const arr=[a,b].filter(Number.isFinite); if(!arr.length) return null; return arr.length==1?arr[0]:(arr[0]+arr[1])/2; };
          const v=vNum(e.avg_price)??vNum(e.price)??vNum(e.fob)??mid(vNum(e.low),vNum(e.high))??null;
          if(!ds||v==null||!isFinite(v)) continue;
          const dt=new Date(ds); if(isNaN(+dt)) continue;
          const y=dt.getFullYear(); const week=Math.ceil((((dt - new Date(y,0,1))/86400000) + new Date(y,0,1).getDay() + 1)/7);
          points.push({y,week,v:+v});
        }
        if(!points.length) throw new Error("No price-like values parsed from MMN.");
        const byYW=new Map();
        for(const p of points){ const k=`${p.y}-${p.week}`; const arr=byYW.get(k)||[]; arr.push(p.v); byYW.set(k,arr); }
        const ys=Array.from(new Set(points.map(p=>p.y))).sort((a,b)=>a-b).slice(-5);
        const rows52=Array.from({length:52},(_,i)=>{ const r={week:i+1}; for(const y of ys){ const arr=byYW.get(`${y}-${r.week}`); if(arr?.length) r[y]=+(arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(2); } return r; });
        const withAvg=withFiveYearAverage(rows52,ys); if(!cancelled){ setYears(ys); setRows(withAvg); }
      }catch(e){
        try{
          const nass=await fetchNassPriceOverlay(commodity);
          if(!cancelled){ setYears(nass.years); setRows(withFiveYearAverage(nass.rows, nass.years)); setErr("Using NASS monthly (interpolated)  MMN unavailable."); }
        }catch(e2){
          const synth=synthesizeCommodity(commodity);
          if(!cancelled){ setYears(synth.years); setRows(withFiveYearAverage(synth.rows, synth.years)); setErr("Using placeholder data  MMN & NASS failed."); }
        }
      }finally{ if(!cancelled) setLoading(false); }
    })();
    return ()=>{ cancelled=true; };
  },[commodity]);

  const stats=useMemo(()=>rows?firstHalfStats(rows,years):null,[rows,years]);
  const csvHref=useMemo(()=>{ if(!rows||!years.length) return null; const blob=new Blob([toCSV(rows,years)],{type:"text/csv;charset=utf-8"}); return URL.createObjectURL(blob); },[rows,years]);

  return (
    <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <h2 className="text-lg font-semibold text-slate-800">USDA Pricing  5-Year Overlay</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Commodity</label>
          <select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  value={commodity} onChange={(e)=>setCommodity(e.target.value)}>
            {COMMODITIES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
      </div>
      {loading && <div className="text-sm text-slate-600">Loading USDA data</div>}
      {err && <div className="text-xs text-rose-700">{err}</div>}
      {rows && (
        <>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rows} margin={{ top:8, right:16, left:0, bottom:8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tickFormatter={(w)=>`W${w}`} />
                <YAxis tickFormatter={(v)=>`$${v}`}/>
                <Tooltip formatter={(v)=>`$${v}`}/>
                <Legend />
                {years.map(y=><Line key={y} type="monotone" dataKey={y} dot={false} strokeWidth={2} />)}
                <Line type="monotone" dataKey="Avg5y" dot={false} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-xs text-slate-500">W1W26 Average</div>
              <div className="text-xl font-semibold text-slate-900">{stats?.avg!=null?`$${stats.avg}`:""}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-xs text-slate-500">W1W26 Min</div>
              <div className="text-xl font-semibold text-slate-900">{stats?.min!=null?`$${stats.min}`:""}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-xs text-slate-500">W1W26 Max</div>
              <div className="text-xl font-semibold text-slate-900">{stats?.max!=null?`$${stats.max}`:""}</div>
            </div>
          </div>
          <div className="mt-3">
            {csvHref && <a href={csvHref} download={`USDA_${commodity.replace(/\s+/g,"_")}_5y.csv`}
              className="inline-block rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700">Download CSV</a>}
          </div>
        </>
      )}
    </div>
  );
}