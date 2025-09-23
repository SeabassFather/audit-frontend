import { Link } from "react-router-dom";

export default function Modules(){
  const cards = [
    {href:"/module/ag", title:"Ag • USDA • Factoring", desc:"USDA pricing, lab uploads, produce factoring tools."},
    {href:"/module/mortgage", title:"Mortgage / Real Estate", desc:"Rates, products, search, legacy mortgage workflow."},
    {href:"/module/audit", title:"Auditing", desc:"Upload evidence, run checklists, generate reports."},
    {href:"/module/compliance", title:"Compliance", desc:"GDPR/CCPA/GLBA/TRID frameworks and tasks."},
    {href:"/comprehensive-modules", title:"Comprehensive Modules Suite", desc:"Complete banking, insurance, healthcare, real estate, security & legal modules."},
    {href:"/engines", title:"Audit Engines", desc:"AI-powered engines for processing, compliance, and automation."},
    {href:"/checklist", title:"Development Checklist", desc:"AuditDNA Elite 2.0 development roadmap and progress tracking."},
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