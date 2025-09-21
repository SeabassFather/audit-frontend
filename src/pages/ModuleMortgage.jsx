import { useState } from "react";
import { Link } from "react-router-dom";
import UploadSheet from "../components/UploadSheet";

export default function ModuleMortgage(){
 const [open, setOpen] = useState(false);
 return (
 <div className="dna-section">
 <h1 className="text-2xl font-bold">Mortgage ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ Real Estate</h1>
 <div className="card p-4 space-y-3">
 <p className="text-sm text-slate-600">
 Run legacy mortgage tools, search lenders, and upload docs for fee/escrow audits.
 </p>
 <div className="flex gap-2 flex-wrap">
 <Link to="/mortgage" className="border rounded px-3 py-2">Legacy Mortgage</Link>
 <Link to="/mortgage-search" className="border rounded px-3 py-2">Mortgage Search</Link>
 <Link to="/services" className="border rounded px-3 py-2">All Services</Link>
 </div>
 <button className="bg-dnaBlue text-white px-3 py-2 rounded" onClick={()=>setOpen(true)}>
 Upload mortgage docs
 </button>
 </div>
 <UploadSheet open={open} onClose={()=>setOpen(false)} service={{id:"module-mortgage", name:"Mortgage Intake"}}/>
 </div>
 );
}
