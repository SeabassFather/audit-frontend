import React, { useState } from "react";
export default function PacaVerify(){
  const [lic,setLic]=useState(""); const [res,setRes]=useState(null); const [err,setErr]=useState("");
  async function check(){
    setErr(""); setRes(null);
    try{
      const r = await fetch(`/api/paca?license=${encodeURIComponent(lic)}`);
      if(!r.ok) throw new Error("PACA lookup failed");
      setRes(await r.json());
    }catch(e){ setErr(String(e)); }
  }
  return (<div className="page">
    <h2>PACA License Verification</h2>
    <div className="searchBar glass">
      <div className="searchRow">
        <input value={lic} onChange={e=>setLic(e.target.value)} placeholder="Enter PACA License #"/>
        <div className="searchActions"><button onClick={check} disabled={!lic}>Verify</button></div>
      </div>
      {err && <div className="mut" style={{color:"#ff9db0"}}>{err}</div>}
    </div>
    {res && <div className="card glass">
      <div className="grid2 s">
        <div><div className="mut">License</div><div style={{fontWeight:800}}>{res.license||""}</div></div>
        <div><div className="mut">Status</div><div style={{fontWeight:800}}>{res.status||""}</div></div>
        <div><div className="mut">Firm</div><div>{res.firm||""}</div></div>
        <div><div className="mut">Issued</div><div>{res.issued||""}</div></div>
        <div><div className="mut">Expires</div><div>{res.expires||""}</div></div>
      </div>
    </div>}
    <p className="mut">Demo response until wired to a real PACA datasource.</p>
  </div>);
}