import { useState } from "react";
import CertBadge from "../components/CertBadge";
import RiskBadge from "../components/RiskBadge";
import FileUpload from "../components/FileUpload";

export default function AgSearchForm(){
  const [files,setFiles] = useState([]);
  const [v,setV] = useState({
    legalName:"", duns:"", country:"Mexico", years:"", contact:"",
    facility:"", coldChain:true, recallPlan:true, laWarehouse:true,
    products:"", harvest:"", volume:"", targetPrice:"", incoterms:"FOB",
    buyerName:"", buyerType:"", po:"#", poValue:"", terms:"Net 30",
    insuranceCOI:true, cargoInsurance:false
  });
  const set = e => setV(o=>({...o,[e.target.name]: e.target.type==="checkbox"?e.target.checked:e.target.value}));

  const risk = (v.duns && v.coldChain && v.recallPlan) ? "Low" : (v.coldChain || v.recallPlan ? "Medium" : "High");

  const preview = {
    company:{ legalName:v.legalName, duns:v.duns, country:v.country, years:v.years, contact:v.contact },
    facility:{ location:v.facility, coldChain:v.coldChain, recallPlan:v.recallPlan, laWarehouse:v.laWarehouse },
    products:{ list:v.products, harvestWindow:v.harvest, weeklyVolume:v.volume, price:v.targetPrice, incoterms:v.incoterms },
    buyer:{ name:v.buyerName, type:v.buyerType, po:v.po, value:v.poValue, terms:v.terms },
    insurance:{ productCOI:v.insuranceCOI, cargo:v.cargoInsurance },
    uploads: files.map(f=>f.name)
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card p-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="font-semibold">Grower Onboarding</div>
          <RiskBadge level={risk}/>
          <CertBadge label="PrimusGFS" valid={true}/>
          <CertBadge label="GlobalG.A.P." valid={true}/>
        </div>
        <input className="border p-2 rounded w-full" name="legalName" placeholder="Legal name" value={v.legalName} onChange={set}/>
        <div className="grid grid-cols-3 gap-2">
          <input className="border p-2 rounded" name="duns" placeholder="DUNS" value={v.duns} onChange={set}/>
          <input className="border p-2 rounded" name="years" placeholder="Years in business" value={v.years} onChange={set}/>
          <input className="border p-2 rounded" name="contact" placeholder="Contact (email/phone)" value={v.contact} onChange={set}/>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input className="border p-2 rounded" name="facility" placeholder="Facility location(s)" value={v.facility} onChange={set}/>
          <label className="text-sm flex items-center gap-2"><input type="checkbox" name="coldChain" checked={v.coldChain} onChange={set}/> Cold chain</label>
          <label className="text-sm flex items-center gap-2"><input type="checkbox" name="recallPlan" checked={v.recallPlan} onChange={set}/> Recall plan</label>
        </div>
        <label className="text-sm flex items-center gap-2"><input type="checkbox" name="laWarehouse" checked={v.laWarehouse} onChange={set}/> Connect with LA Warehouse</label>
      </div>

      <div className="card p-4 space-y-2">
        <div className="font-semibold mb-1">Products & Buyer</div>
        <textarea className="border p-2 rounded w-full" rows="3" name="products" placeholder="Products/crops (variety, grade, pack)..." value={v.products} onChange={set}/>
        <div className="grid grid-cols-3 gap-2">
          <input className="border p-2 rounded" name="harvest" placeholder="Harvest window" value={v.harvest} onChange={set}/>
          <input className="border p-2 rounded" name="volume" placeholder="Volume / wk" value={v.volume} onChange={set}/>
          <input className="border p-2 rounded" name="targetPrice" placeholder="Target price" value={v.targetPrice} onChange={set}/>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <select className="border p-2 rounded" name="incoterms" value={v.incoterms} onChange={set}>
            <option>FOB</option><option>CIF</option><option>EXW</option>
          </select>
          <input className="border p-2 rounded" name="buyerName" placeholder="Buyer (optional)" value={v.buyerName} onChange={set}/>
          <select className="border p-2 rounded" name="buyerType" value={v.buyerType} onChange={set}>
            <option></option><option>Retail</option><option>Wholesale</option><option>Chain</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input className="border p-2 rounded" name="po" placeholder="PO #" value={v.po} onChange={set}/>
          <input className="border p-2 rounded" name="poValue" placeholder="PO value" value={v.poValue} onChange={set}/>
          <input className="border p-2 rounded" name="terms" placeholder="Payment terms" value={v.terms} onChange={set}/>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-sm flex items-center gap-2"><input type="checkbox" name="insuranceCOI" checked={v.insuranceCOI} onChange={set}/> Product liability COI</label>
          <label className="text-sm flex items-center gap-2"><input type="checkbox" name="cargoInsurance" checked={v.cargoInsurance} onChange={set}/> Cargo insurance</label>
        </div>
        <FileUpload label="Upload Certifications / POs" onFiles={setFiles}/>
      </div>

      <div className="md:col-span-2 card p-4">
        <div className="font-semibold mb-2">Preview (agRiskModel input)</div>
        <pre className="text-xs overflow-auto">{JSON.stringify(preview,null,2)}</pre>
        <div className="flex gap-2 mt-2">
          <button className="bg-dnaBlue text-white px-3 py-2 rounded">Request PO Financing</button>
          <button className="border px-3 py-2 rounded">Request Factoring</button>
          <button className="border px-3 py-2 rounded">Connect with LA Warehouse</button>
        </div>
      </div>
    </div>
  );
}