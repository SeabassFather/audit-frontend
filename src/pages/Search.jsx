import { useEffect, useMemo, useState } from "react";
import { listFactoringDeals, searchMortgageRates, getUSDAWeeklyPrices } from "../lib/api";
export default function Search(){
  const [q,setQ]=useState(new URLSearchParams(location.search).get("q")||"");
  const [deals,setDeals]=useState([]); const [rates,setRates]=useState([]); const [series,setSeries]=useState([]);
  useEffect(()=>{(async()=>{ const d=await listFactoringDeals(); setDeals(d.deals||[]); const r=await searchMortgageRates({}); setRates(r.results||[]); const p=await getUSDAWeeklyPrices({}); setSeries(p.current||[]); })();},[]);
  const match=(t)=>t.toLowerCase().includes(q.toLowerCase());
  const d=deals.filter(x=>match(JSON.stringify(x)));
  const r=rates.filter(x=>match(JSON.stringify(x)));
  const s=series.filter(x=>match(String(x.week))||match(String(x.price)));
  return (<div className="card">
    <div className="h1">Global Search</div>
    <div className="controls"><div style={{flex:"1 1 auto"}}><div className="subtle">Query</div><input style={{width:"100%"}} value={q} onChange={e=>setQ(e.target.value)} placeholder="services, deals, rates, weeks, etc"/></div></div>
    <div className="mt-4 grid grid-3">
      <section className="card"><div className="h3">Factoring Deals <span className="badge">{d.length}</span></div><ul>{d.map((x,i)=><li key={i}>{x.debtor}  {x.commodity}  ${x.amount.toLocaleString()}  {x.status}</li>)}</ul></section>
      <section className="card"><div className="h3">Mortgage Quotes <span className="badge">{r.length}</span></div><ul>{r.map((x,i)=><li key={i}>{x.lender}  {x.product}  {x.rate}% APR {x.apr}%</li>)}</ul></section>
      <section className="card"><div className="h3">USDA Series (W1W26) <span className="badge">{s.length}</span></div><div className="subtle">Type a week number (e.g., W12) or price.</div></section>
    </div>
  </div>);
}