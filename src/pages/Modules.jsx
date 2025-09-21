import { Link } from "react-router-dom";

export default function Modules(){
 const cards = [
 {href:"/module/ag", title:"Ag ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ USDA ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ Factoring", desc:"USDA pricing, lab uploads, produce factoring tools."},
 {href:"/module/mortgage", title:"Mortgage / Real Estate", desc:"Rates, products, search, legacy mortgage workflow."},
 {href:"/module/audit", title:"Auditing", desc:"Upload evidence, run checklists, generate reports."},
 {href:"/module/compliance", title:"Compliance", desc:"GDPR/CCPA/GLBA/TRID frameworks and tasks."},
 ];
 return (
 <div className="dna-section">
 <h1 className="text-2xl font-bold">Modules</h1>
 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {cards.map(c=>(
 <Link key={c.href} to={c.href} className="card p-4 hover:shadow-md transition">
 <div className="font-semibold text-dnaBlue">{c.title}</div>
 <div className="text-sm text-slate-600 mt-1">{c.desc}</div>
 </Link>
 ))}
 </div>
 </div>
 );
}