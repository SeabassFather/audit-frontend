import React, { useState } from "react";
import { apiPost, apiAuthLogin } from "../utils/api";

export default function MarketplacePage(){
  const token = typeof window!=="undefined" ? localStorage.getItem("token") : null;
  const [auth,setAuth] = useState(!!token);
  if (!auth) return <Login onOK={()=>setAuth(true)} />;
  return <MarketShell/>;
}
function Login({onOK}){
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [err,setErr]=useState("");
  const go=async()=>{ setErr(""); try{ const r=await apiAuthLogin({email,password}); localStorage.setItem("token", r.token||"ok"); onOK(); }catch(e){ setErr(String(e)); } };
  return (
    <div className="page-card" style={{maxWidth:440}}>
      <h1>Ag Marketplace</h1>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" style={{marginTop:8}} placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn btn-accent" style={{marginTop:8}} onClick={go}>Login</button>
      {err && <div style={{color:"#b00",marginTop:8}}>{err}</div>}
    </div>
  );
}
function MarketShell(){
  const [q,setQ]=useState({ commodity:"Tomatoes", size:"", count:"", market:"Open", country:"", minLoad:"", priceMax:"" });
  const [rows,setRows]=useState([]); const [err,setErr]=useState("");
  const upd=(k,v)=>setQ(prev=>({...prev,[k]:v}));
  const search=async()=>{ setErr(""); try{ const r = await apiPost("/api/market/search", q); setRows(r.items||[]); }catch(e){ setErr(String(e)); } };
  return (
    <div className="grid" style={{gap:12}}>
      <div className="page-card">
        <h1>Buyer/Seller Search</h1>
        <div className="row">
          <label>Commodity<input className="input" value={q.commodity} onChange={e=>upd("commodity",e.target.value)} /></label>
          <label>Size<input className="input" value={q.size} onChange={e=>upd("size",e.target.value)} /></label>
          <label>Count<input className="input" value={q.count} onChange={e=>upd("count",e.target.value)} /></label>
          <label>Market<select className="select" value={q.market} onChange={e=>upd("market",e.target.value)}><option>Open</option><option>Contract</option></select></label>
          <label>Origin Country<input className="input" value={q.country} onChange={e=>upd("country",e.target.value)} /></label>
          <label>Min Load (pallets)<input className="input" value={q.minLoad} onChange={e=>upd("minLoad",e.target.value)} /></label>
          <label>Price Max (USD)<input className="input" value={q.priceMax} onChange={e=>upd("priceMax",e.target.value)} /></label>
          <div><button className="btn btn-accent" onClick={search}>Search</button></div>
        </div>
        {err && <small className="muted">{err}</small>}
      </div>
      <div className="page-card">
        {rows.length===0 ? <small className="muted">No results yet.</small> :
          <pre className="json">{JSON.stringify(rows,null,2)}</pre>}
      </div>
    </div>
  );
}