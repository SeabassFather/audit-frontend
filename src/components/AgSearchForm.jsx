import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { endpoints } from '../utils/api';
export default function AgSearchForm({ onSearch }){
  const [f,setF]=useState({
    legalName:"", dba:"", country:"", ein:"", duns:"", years:"", owners:"",
    contact:"", facility:"", warehouse:"", coldChain:false, recallPlan:false,
    crops:"", variety:"", grade:"", pack:"", size:"", hsCode:"", harvest:"", volume:"", price:"", incoterms:"", ship:"", buyer:"", buyerType:"", po:"", poValue:"", terms:"",
    insuranceCOI:false, cargoIns:false
  });
  const set = k => e => setF(s=>({...s,[k]: e.target.type==="checkbox"? e.target.checked : e.target.value}));
  const submit = e => { e.preventDefault(); onSearch?.(f); };
  return (
    <>
      <form onSubmit={submit} className="card">
        <div className="card-title">Company & KYB</div>
        <input className="filter" placeholder="Legal name" value={f.legalName} onChange={set("legalName")}/>
        <input className="filter" placeholder="DBA" value={f.dba} onChange={set("dba")}/>
        <input className="filter" placeholder="Country" value={f.country} onChange={set("country")}/>
        <input className="filter" placeholder="EIN/RFC" value={f.ein} onChange={set("ein")}/>
        <input className="filter" placeholder="DUNS" value={f.duns} onChange={set("duns")}/>
        <input className="filter" placeholder="Years in business" value={f.years} onChange={set("years")}/>
        <input className="filter" placeholder="Principals/Owners" value={f.owners} onChange={set("owners")}/>
        <input className="filter" placeholder="Contact" value={f.contact} onChange={set("contact")}/>

        <div className="card-title" style={{marginTop:10}}>Facility</div>
        <input className="filter" placeholder="Location(s)" value={f.facility} onChange={set("facility")}/>
        <input className="filter" placeholder="LA Warehouse Partner (optional)" value={f.warehouse} onChange={set("warehouse")}/>
        <label className="subtext"><input type="checkbox" checked={f.coldChain} onChange={set("coldChain")}/> Cold chain capability</label>
        <label className="subtext"><input type="checkbox" checked={f.recallPlan} onChange={set("recallPlan")}/> Recall plan on file</label>

        <div className="card-title" style={{marginTop:10}}>Product Offerings</div>
        <input className="filter" placeholder="Crop type" value={f.crops} onChange={set("crops")}/>
        <input className="filter" placeholder="Variety" value={f.variety} onChange={set("variety")}/>
        <input className="filter" placeholder="Grade/Spec" value={f.grade} onChange={set("grade")}/>
        <input className="filter" placeholder="Pack style" value={f.pack} onChange={set("pack")}/>
        <input className="filter" placeholder="Size" value={f.size} onChange={set("size")}/>
        <input className="filter" placeholder="HS code" value={f.hsCode} onChange={set("hsCode")}/>
        <input className="filter" placeholder="Harvest window" value={f.harvest} onChange={set("harvest")}/>
        <input className="filter" placeholder="Volume/week or month" value={f.volume} onChange={set("volume")}/>
        <input className="filter" placeholder="Target price" value={f.price} onChange={set("price")}/>
        <input className="filter" placeholder="Incoterms" value={f.incoterms} onChange={set("incoterms")}/>
        <input className="filter" placeholder="Shipping terms" value={f.ship} onChange={set("ship")}/>

        <div className="card-title" style={{marginTop:10}}>Buyer & Docs</div>
        <input className="filter" placeholder="Buyer (optional)" value={f.buyer} onChange={set("buyer")}/>
        <input className="filter" placeholder="Buyer type (retail/wholesale/chain)" value={f.buyerType} onChange={set("buyerType")}/>
        <input className="filter" placeholder="PO #" value={f.po} onChange={set("po")}/>
        <input className="filter" placeholder="PO value" value={f.poValue} onChange={set("poValue")}/>
        <input className="filter" placeholder="Payment terms (Net 30/45/60/90)" value={f.terms} onChange={set("terms")}/>

        <button className="btn" type="submit">Search Growers / Compliance</button>
      </form>

      <div className="grid" style={{marginTop:12}}>
        <FileUpload label="Upload Certifications (PDF/IMG)" accept=".pdf,.png,.jpg" endpoint={endpoints.uploadWater()} />
        <FileUpload label="Upload Lab Tests / MRL Reports" accept=".pdf,.png,.jpg" endpoint={endpoints.uploadWater()} />
        <FileUpload label="Upload HACCP/FSMA Plan" accept=".pdf" endpoint={endpoints.uploadWater()} />
      </div>
    </>
  );
}