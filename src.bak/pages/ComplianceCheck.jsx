import React, { useState } from "react";
import { apiPost } from "../utils/api";

export default function ComplianceCheck(){
  const [company,setCompany]=useState("");
  const [country,setCountry]=useState("");
  const [res,setRes]=useState(null);

  const run=async()=>{
    try{
      const r=await fetch(`/api/compliance/check?company=${encodeURIComponent(company)}&country=${encodeURIComponent(country)}`);
      const j=await r.json();
      setRes(j);
      await apiPost("/notify",{msg:`Compliance check run: ${company} (${country})`});
    }catch(e){setRes({error:String(e)});}
  };

  return(
    <div className="card">
      <h2>Compliance Checker</h2>
      <input className="input" placeholder="Company name" value={company} onChange={e=>setCompany(e.target.value)} />
      <input className="input" placeholder="Country" value={country} onChange={e=>setCountry(e.target.value)} />
      <button className="btn btn-accent" onClick={run}>Run Check</button>
      {res && <pre>{JSON.stringify(res,null,2)}</pre>}
    </div>
  );
}