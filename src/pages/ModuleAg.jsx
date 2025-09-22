import { useState } from "react";
import { Link } from "react-router-dom";
import UploadSheet from "../components/UploadSheet";

export default function ModuleAg(){
 const [open, setOpen] = useState(false);
 return (
 <div className="dna-section">
 <h1 className="text-2xl font-bold">Ag ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ USDA ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ WaterTech ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ Factoring</h1>
 <div className="card p-4 space-y-3">
 <p className="text-sm text-slate-600">
 Tools for agriculture supply chain, USDA pricing, lab uploads, and produce factoring.
 </p>
 <div className="flex gap-2 flex-wrap">
 <Link to="/pricing" className="border rounded px-3 py-2">USDA Pricing</Link>
 <Link to="/factoring" className="border rounded px-3 py-2">Produce Factoring</Link>
 <Link to="/services" className="border rounded px-3 py-2">All Services</Link>
 </div>
 <button className="bg-dnaBlue text-white px-3 py-2 rounded" onClick={()=>setOpen(true)}>
 Upload documents
 </button>
 </div>
 <UploadSheet open={open} onClose={()=>setOpen(false)} service={{id:"module-ag", name:"Ag Module Intake"}}/>
 </div>
 );
}
