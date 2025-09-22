import { useState } from "react";
import { Link } from "react-router-dom";
import UploadSheet from "../components/UploadSheet";

export default function ModuleCompliance(){
 const [open, setOpen] = useState(false);
 const regs = ["TRID","ECOA","GLBA","CCPA","GDPR","UK GDPR","PIPEDA"];
 return (
 <div className="dna-section">
 <h1 className="text-2xl font-bold">Compliance</h1>
 <div className="card p-4 space-y-3">
 <div className="text-sm text-slate-600">Frameworks included:</div>
 <div className="flex gap-2 flex-wrap">
 {regs.map(r => <span key={r} className="badge">{r}</span>)}
 </div>
 <div className="flex gap-2 flex-wrap">
 <Link to="/compliance" className="border rounded px-3 py-2">Open Compliance</Link>
 <Link to="/services" className="border rounded px-3 py-2">All Services</Link>
 </div>
 <button className="bg-dnaBlue text-white px-3 py-2 rounded" onClick={()=>setOpen(true)}>
 Upload policy/docs
 </button>
 </div>
 <UploadSheet open={open} onClose={()=>setOpen(false)} service={{id:"module-compliance", name:"Compliance Intake"}}/>
 </div>
 );
}
