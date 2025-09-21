export default function AuditCenter(){
 const checks = [
 {id:"id-kyc", name:"KYC/KYB complete"},
 {id:"id-aml", name:"AML screening performed"},
 {id:"id-terms", name:"Signed Terms & NDA"},
 {id:"id-lic", name:"Licensing verified (NMLS/Ag)"},
 {id:"id-ins", name:"Insurance/COI attached"},
 ];
 return (
 <div className="space-y-4">
 <div className="card">
 <div className="text-lg font-semibold">Audit Center</div>
 <p className="text-gray-700 mt-2">Use the standardized checklist to produce a client audit pack.</p>
 <div className="grid md:grid-cols-3 gap-3 mt-3">
 {checks.map(c=> (
 <label key={c.id} className="flex items-center gap-2">
 <input type="checkbox" className="w-4 h-4"/><span>{c.name}</span>
 </label>
 ))}
 <button className="btn btn-primary md:col-span-3">Export Audit PDF</button>
 </div>
 </div>
 </div>
 );
}
