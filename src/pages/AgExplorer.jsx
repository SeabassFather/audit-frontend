import React, { useMemo, useRef, useState } from "react";
import CommodityCompare from "../components/CommodityCompare";
import { COMMODITIES } from "../data/commodities";
import { generateSeries } from "../utils/generateSeries";
import { stats } from "../utils/metrics";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

async function fetchUSDASeries(base, key, commodity){
  // placeholder: try to hit `${base}/services/v1/market?commodity=...`
  // must return [{date:"YYYY-MM", price:Number}, ...]
  // Fallback to local generator if fails.
  try{
    const url = `${base.replace(/\\/+$/, "")}/services/v1/market/?commodity=${encodeURIComponent(commodity)}`;
    const r = await fetch(url, { headers: key ? { "x-api-key": key } : {} });
    if(!r.ok) throw new Error("bad http");
    const j = await r.json();
    const arr = Array.isArray(j) ? j : [];
    // attempt to normalize known fields
    return arr.map((it)=>({
      date: (it.date || it.report_date || "").slice(0,7),
      price: Number(it.price || it.avg_price || it.value || 0)
    })).filter(x => x.date && x.price>0).slice(-60); // last 60
  }catch(e){
    return null;
  }
}

export default function AgExplorer(){
  const [selected, setSelected] = useState(["Papaya","Orange"]);
  const [seriesMap, setSeriesMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [useLive, setUseLive] = useState(false);
  const reportRef = useRef(null);

  const base = process.env.REACT_APP_USDA_API_BASE || "";
  const key  = process.env.REACT_APP_USDA_API_KEY || "";

  const metrics = useMemo(()=>{
    const obj = {};
    for(const k of Object.keys(seriesMap)){
      obj[k] = stats(seriesMap[k] || []);
    }
    return obj;
  }, [seriesMap]);

  const loadData = async ()=>{
    setLoading(true);
    const next = {};
    for(const c of selected){
      let s = null;
      if(useLive && base){
        s = await fetchUSDASeries(base, key, c);
      }
      if(!s || s.length===0){
        s = generateSeries(c, 60); // local mock
      }
      next[c] = s;
    }
    setSeriesMap(next);
    setLoading(false);
  };

  const exportPdf = async ()=>{
    if(!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { backgroundColor: null, scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(img, "PNG", 0, 0, w, h);
    pdf.save("ag-market-report.pdf");
  };

  return (
    <div className="p-4">
      <h2 className="h2" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span>Ag Produce Market Explorer</span>
        <label style={{display:"flex",alignItems:"center",gap:8,fontSize:12,opacity:0.85}}>
          <input type="checkbox" checked={useLive} onChange={e=>setUseLive(e.target.checked)} />
          Use Live USDA (if configured)
        </label>
      </h2>

      <div className="filters" style={{marginTop:12}}>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {COMMODITIES.map(c=>(
            <button
              key={c}
              type="button"
              onClick={()=>{
                setSelected(s=> s.includes(c) ? s.filter(x=>x!==c) : [...s, c].slice(0,6));
              }}
              className={"btn"}
              style={{
                background: selected.includes(c) ? "#4da3ff" : "#16224a",
                color: selected.includes(c) ? "#07142e" : "#c6d0f7",
                border:"1px solid #233055"
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:10,marginLeft:"auto"}}>
          <button className="btn" onClick={loadData} disabled={loading}>
            {loading ? "Loading" : "Compare Last 5 Years"}
          </button>
          <button className="btn" onClick={exportPdf}>Download Report (PDF)</button>
        </div>
      </div>

      <div ref={reportRef} style={{marginTop:12}}>
        <CommodityCompare seriesMap={seriesMap} />
        <div className="grid" style={{marginTop:12, gridTemplateColumns:"repeat(3,minmax(220px,1fr))"}}>
          {Object.keys(seriesMap).length===0 && (
            <div className="card">
              <div className="card-title">Tip</div>
              <div className="subtext">Select commodities and click <b>Compare Last 5 Years</b>.</div>
            </div>
          )}
          {Object.entries(metrics).map(([name,m])=>(
            <div key={name} className="card">
              <div className="card-title">{name}</div>
              <div className="metric">${m.latest}</div>
              <div className="subtext">
                Avg ${m.avg}  Min ${m.min}  Max ${m.max}  YoY {m.yoy}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}