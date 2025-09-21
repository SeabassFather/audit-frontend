import React, { useMemo, useState } from "react";
import { fetchNassPriceOverlay } from "../usda/nassClient";
import { searchReports, fetchReportSeries } from "../usda/mmnClient";
import ContactCard from "../../components/ContactCard";
import { saveLead } from "../../lib/leads";

const COMMS = ["Papaya","Oranges","Oranges Valencia","Avocado","Tomato Roma"];

export default function SearchUSDA(){
  const [commodity,setCommodity]=useState(COMMS[0]);
  const [source,setSource]=useState("MMN"); // MMN | NASS
  const [rows,setRows]=useState([]);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");

  async function run(){
    setLoading(true); setErr(""); setRows([]);
    try{
      const now=new Date(); const since=new Date(); since.setFullYear(since.getFullYear()-5);
      if(source==="NASS"){
        const overlay=await fetchNassPriceOverlay(commodity);
        const flat = [];
        overlay.rows.forEach(r=>{
          overlay.years.forEach(y=>{
            if(r[y]!=null) flat.push({date:`Y${y}-W${r.week}`, value:r[y]});
          });
        });
        setRows(flat);
      } else {
        const reports=await searchReports({commodity});
        if(!reports.length) throw new Error("No MMN reports for "+commodity);
        const rep=reports[0];
        const json=await fetchReportSeries({reportId:rep.slug_id||rep.report_id||rep.id, commodity, since});
        const entries=(json.results||json.report||json||[]).flatMap(page=>{
          const sections=page?.sections||page?.body||[]; return sections.flatMap(sec=>sec?.table||sec?.results||[]);
        });
        const out=[];
        for(const e of entries){
          const ds=e.report_date||e.trans_date||e.date||e.published_date;
          const raw = e.avg_price ?? e.price ?? e.fob ?? e.low ?? e.high;
          if(!ds || raw==null) continue;
          const val=Number(String(raw).replace(/[^0-9.\-]/g,""));
          if(!isFinite(val)) continue;
          out.push({ date: ds, value: +val.toFixed(2) });
        }
        out.sort((a,b)=>new Date(a.date)-new Date(b.date));
        setRows(out.slice(-800));
      }
    }catch(ex){ setErr(ex.message||String(ex)); }
    finally{ setLoading(false); }
  }

  const csv = useMemo(()=>{
    if(!rows.length) return null;
    const text = ["date,value", ...rows.map(r=>`${r.date},${r.value}`)].join("\n");
    const blob = new Blob([text], {type:"text/csv;charset=utf-8"});
    return URL.createObjectURL(blob);
  },[rows]);

  function handleLead(lead){
    const payload = { ...lead, service:"USDA", query:{ commodity, source } };
    if (saveLead(payload)) alert("Lead saved to Inbox.");
  }

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 rounded-2xl border border-emerald-300 bg-emerald-50 p-4">
        <div className="grid sm:grid-cols-4 gap-3 mb-3">
          <div>
            <label className="text-sm text-slate-600">Commodity</label>
            <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
              value={commodity} onChange={e=>setCommodity(e.target.value)}>
              {COMMS.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-600">Source</label>
            <select className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
              value={source} onChange={e=>setSource(e.target.value)}>
              <option>MMN</option><option>NASS</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={run}
              className="w-full rounded-lg bg-emerald-600 text-white px-3 py-2 hover:bg-emerald-700">
              Search
            </button>
          </div>
          <div className="flex items-end">
            {csv && <a className="w-full text-center rounded-lg border border-slate-300 bg-white px-3 py-2 hover:bg-slate-50" href={csv} download={`USDA_${commodity}_results.csv`}>Download CSV</a>}
          </div>
        </div>
        {loading && <div className="text-sm text-slate-700">Loading</div>}
        {err && <div className="text-xs text-rose-700">Error: {err}</div>}
        <div className="rounded-xl border border-slate-200 bg-white overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 sticky top-0">
              <tr><th className="text-left px-3 py-2">Date/Week</th><th className="text-left px-3 py-2">Price</th></tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i} className="border-t">
                  <td className="px-3 py-2">{r.date}</td>
                  <td className="px-3 py-2">${r.value}</td>
                </tr>
              ))}
              {!rows.length && !loading && <tr><td className="px-3 py-3 text-slate-500" colSpan="2">No results yet. Pick options and hit Search.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <ContactCard
        title="USDA Trade & Pricing  Contact"
        partner=""
        service="USDA"
        onSubmit={handleLead}
      />
    </div>
  );
}
