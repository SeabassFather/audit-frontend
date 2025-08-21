import React, { useState } from "react";
import UploadCard from "../components/UploadCard";

export default function AgIntake(){
  const [p,setP]=useState({
    company:"", contact:"", email:"", phone:"",
    country:"MX", commodity:"Tomatoes", pallets:"", priceTarget:"",
    certs: { organic:false, gap:false, primus:false, fda:false }
  });
  const upd=(k,v)=> setP(prev=>({...prev,[k]:v}));
  const toggle=(k)=> setP(prev=>({...prev, certs:{...prev.certs, [k]:!prev.certs[k]}}));

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Ag Intake</h2>

      <div className="row">
        <label>Company<input className="input" value={p.company} onChange={e=>upd("company",e.target.value)} /></label>
        <label>Contact<input className="input" value={p.contact} onChange={e=>upd("contact",e.target.value)} /></label>
        <label>Email<input type="email" className="input" value={p.email} onChange={e=>upd("email",e.target.value)} /></label>
        <label>Phone<input className="input" value={p.phone} onChange={e=>upd("phone",e.target.value)} /></label>
        <label>Commodity<input className="input" value={p.commodity} onChange={e=>upd("commodity",e.target.value)} /></label>
        <label>Country<input className="input" value={p.country} onChange={e=>upd("country",e.target.value)} /></label>
        <label>Quantity (pallets)<input className="input" value={p.pallets} onChange={e=>upd("pallets",e.target.value)} /></label>
        <label>Price Target (USD)<input className="input" value={p.priceTarget} onChange={e=>upd("priceTarget",e.target.value)} /></label>
      </div>

      <div className="row" style={{marginTop:6}}>
        <div className="small" style={{marginRight:12}}>Certifications</div>
        <label><input type="checkbox" checked={p.certs.organic} onChange={()=>toggle("organic")}/> USDA Organic</label>
        <label><input type="checkbox" checked={p.certs.gap} onChange={()=>toggle("gap")}/> GlobalG.A.P.</label>
        <label><input type="checkbox" checked={p.certs.primus} onChange={()=>toggle("primus")}/> PrimusGFS</label>
        <label><input type="checkbox" checked={p.certs.fda} onChange={()=>toggle("fda")}/> FDA</label>
      </div>

      <h3 style={{margin:"18px 0 10px"}}>Uploads (for U.S. review)</h3>
      <div className="grid grid-3">
        <UploadCard title="Food Safety Certificates (Primus/GlobalG.A.P.)" extraFields={{kind:"food-safety", company: p.company}} accept=".pdf,.jpg,.jpeg,.png" />
        <UploadCard title="Association / Growing Agreement" extraFields={{kind:"growing-agreement", company: p.company}} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
        <UploadCard title="Farm Maps / Ranch List" extraFields={{kind:"farm-maps", company: p.company}} accept=".pdf,.xlsx,.csv,.jpg,.jpeg,.png" />
        <UploadCard title="Water Test Results" extraFields={{kind:"water-tests", company: p.company}} accept=".pdf,.xlsx,.csv,.jpg,.jpeg,.png" />
        <UploadCard title="Pesticide / Spray Logs" extraFields={{kind:"spray-logs", company: p.company}} accept=".pdf,.xlsx,.csv" />
        <UploadCard title="Insurance (COI)" extraFields={{kind:"insurance-coi", company: p.company}} accept=".pdf,.jpg,.jpeg,.png" />
      </div>

      <div className="small" style={{marginTop:10, color:"#667"}}>
        Tip: You can drag-select multiple files in each uploader. Files go to <code>/api/upload/ag</code> with a <code>kind</code> tag.
      </div>
    </div>
  );
}