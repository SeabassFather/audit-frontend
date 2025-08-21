import React, { useState } from "react";
import { apiPost } from "../utils/api";

export default function Mortgage(){
  const [p,setP]=useState({ name:"", state:"CA", amount:400000, fico:720, dti:40, notes:"" });
  const [out,setOut]=useState(null); const [err,setErr]=useState("");
  const go=async(e)=>{ e.preventDefault(); setErr(""); setOut(null);
    try{ setOut(await apiPost("/api/search/mortgages", p)); }catch(ex){ setErr(String(ex)); }
  };

  return (
    <section>
      <div className="badge">Mortgage</div>
      <h1 className="h1">Inquiry & Match</h1>
      <form onSubmit={go} className="grid grid-2">
        <input className="input" placeholder="Name" value={p.name} onChange={e=>setP({...p,name:e.target.value})}/>
        <input className="input" placeholder="State" value={p.state} onChange={e=>setP({...p,state:e.target.value})}/>
        <input className="input" placeholder="Loan Amount" value={p.amount} onChange={e=>setP({...p,amount:Number(e.target.value)||0})}/>
        <input className="input" placeholder="FICO" value={p.fico} onChange={e=>setP({...p,fico:Number(e.target.value)||0})}/>
        <input className="input" placeholder="DTI %" value={p.dti} onChange={e=>setP({...p,dti:Number(e.target.value)||0})}/>
        <textarea className="textarea" placeholder="Scenario / Notes" value={p.notes} onChange={e=>setP({...p,notes:e.target.value})}/>
        <div className="toolbar"><button className="btn" type="submit">Match Lenders</button></div>
      </form>
      {err && <div style={{color:"#b00020", marginTop:10}}>{err}</div>}
      {out && <pre className="card" style={{marginTop:12, overflow:"auto"}}>{JSON.stringify(out,null,2)}</pre>}
    </section>
  );
}