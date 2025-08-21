import React, { useMemo, useState } from "react";
export default function POFinance(){
  const [f,setF]=useState({po:400000, cog:300000, feePct:3.0, termDays:60, sellPrice:500000});
  const set=(k,v)=>setF(p=>({...p,[k]:v}));
  const funding = useMemo(()=> Math.max(0, f.cog),[f.cog]);
  const fee = useMemo(()=> funding * (f.feePct/100) * (f.termDays/30),[funding,f.feePct,f.termDays]);
  const grossMargin = useMemo(()=> f.sellPrice - f.cog,[f.sellPrice,f.cog]);
  const netMargin = useMemo(()=> grossMargin - fee,[grossMargin,fee]);
  const marginPct = useMemo(()=> f.sellPrice>0 ? (netMargin/f.sellPrice)*100 : 0,[netMargin,f.sellPrice]);
  return (<section className="panel">
    <h2>Purchase Order Finance</h2>
    <div className="mortGrid">
      <label>PO Amount (Sales) USD<input type="number" value={f.sellPrice} onChange={e=>set("sellPrice",+e.target.value||0)}/></label>
      <label>Cost of Goods (USD)<input type="number" value={f.cog} onChange={e=>set("cog",+e.target.value||0)}/></label>
      <label>Finance Fee (% / 30d)<input type="number" step="0.01" value={f.feePct} onChange={e=>set("feePct",+e.target.value||0)}/></label>
      <label>Term (days)<input type="number" value={f.termDays} onChange={e=>set("termDays",+e.target.value||0)}/></label>
    </div>
    <div className="tableWrap"><table className="tbl"><tbody>
      <tr><th>Funding Required</th><td>${funding.toLocaleString()}</td><th>Finance Fee</th><td>${fee.toLocaleString()}</td></tr>
      <tr><th>Gross Margin</th><td>${grossMargin.toLocaleString()}</td><th>Net Margin</th><td>${netMargin.toLocaleString()} ({marginPct.toFixed(1)}%)</td></tr>
    </tbody></table></div>
    <p className="mut">Assumes PO financier covers COG; fee prorated by term. Swap with lender quote API when available.</p>
  </section>);
}