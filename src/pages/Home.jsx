import servicesAll from "../data/services.all.json";

export default function Home(){
 const total = servicesAll.length;
 const cats = [...new Set(servicesAll.map(s=>s.category))];
 return (
 <div className="grid md:grid-cols-3 gap-4">
 <div className="card p-5">
 <div className="text-slate-500 text-sm">Total Services</div>
 <div className="text-3xl font-bold">{total}</div>
 </div>
 <div className="card p-5">
 <div className="text-slate-500 text-sm">Categories</div>
 <div className="text-3xl font-bold">{cats.length}</div>
 </div>
 <div className="card p-5">
 <div className="text-slate-500 text-sm">Status</div>
 <div className="text-3xl font-bold">Online</div>
 </div>
 <div className="md:col-span-3 card p-5">
 <h2 className="text-lg font-semibold mb-2">Welcome to AuditDNA</h2>
 <p className="text-sm text-slate-600">
 Use the navigation to browse Services, auditing/compliance modules, pricing, mortgage, and factoring.
 </p>
 </div>
 </div>
 );
}