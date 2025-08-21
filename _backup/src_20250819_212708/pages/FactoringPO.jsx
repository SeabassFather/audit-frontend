import React, { useState } from "react";
import { apiPost } from "../utils/api";

export default function FactoringPO(){
  const [p,setP]=useState({ company:"", buyer:"", invoice:"", amount:50000, goods:"" });
  const [out,setOut]=useState(null); const [err,setErr]=useState("");
  const go=async(e)=>{ e.preventDefault(); setErr(""); setOut(null);
    try{ setOut(await apiPost("/api/search/trade-finance", p)); }catch(ex){ setErr(String(ex)); }
  };

  return (
    <section>
      <div className="badge">Factoring & PO</div>
      <h1 className="h1">Working Capital</h1>
      <form onSubmit={go} className="grid grid-2">
        <input className="input" placeholder="Company" value={p.company} onChange={e=>setP({...p,company:e.target.value})}/>
        <input className="input" placeholder="Customer / Buyer" value={p.buyer} onChange={e=>setP({...p,buyer:e.target.value})}/>
        <input className="input" placeholder="Invoice / PO #" value={p.invoice} onChange={e=>setP({...p,invoice:e.target.value})}/>
        <input className="input" placeholder="Amount (USD)" value={p.amount} onChange={e=>setP({...p,amount:Number(e.target.value)||0})}/>
        <input className="input" placeholder="Goods / Description" value={p.goods} onChange={e=>setP({...p,goods:e.target.value})}/>
        <div className="toolbar"><button className="btn" type="submit">Evaluate</button></div>
      </form>
      {err && <div style={{color:"#b00020", marginTop:10}}>{err}</div>}
      {out && <pre className="card" style={{marginTop:12, overflow:"auto"}}>{JSON.stringify(out,null,2)}</pre>}
    </section>
  );
}