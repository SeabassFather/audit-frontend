import { useState } from "react";
import { Link } from "react-router-dom";
import UploadSheet from "../components/UploadSheet";

export default function ModuleAudit(){
 const [open, setOpen] = useState(false);
 return (
 <div className="dna-section">
 <h1 className="text-2xl font-bold">Auditing</h1>
 <div className="card p-4 space-y-3">
 <ul className="list-disc ml-5 text-sm space-y-1">
 <li>USDA/GlobalG.A.P. audits</li>
 <li>CPA/Payroll/Tax reviews</li>
 <li>Water/Soil lab validation</li>
 </ul>
 <div className="flex gap-2 flex-wrap">
 <Link to="/auditing" className="border rounded px-3 py-2">Open Auditing</Link>
 <Link to="/services" className="border rounded px-3 py-2">All Services</Link>
 </div>
 <button className="bg-dnaBlue text-white px-3 py-2 rounded" onClick={()=>setOpen(true)}>
 Upload evidence
 </button>
 </div>
 <UploadSheet open={open} onClose={()=>setOpen(false)} service={{id:"module-audit", name:"Audit Intake"}}/>
 </div>
 );
}
