export default function ComplianceDashboard(){
 const items = [
 {name:"CCPA/CPRA (California)", status:"Ready"},
 {name:"GLBA (US Financial)", status:"Ready"},
 {name:"GDPR (EU/Ireland)", status:"In Progress"},
 {name:"PIPEDA (Canada)", status:"Ready"},
 {name:"PDPA (Singapore)", status:"Planned"},
 {name:"Australia Privacy Act", status:"Planned"},
 ];
 return (
 <div className="space-y-4">
 <div className="card">
 <div className="text-lg font-semibold">Global Privacy Dashboard</div>
 <p className="text-gray-700 mt-2">Centralized policies, DSAR handling, data maps, and vendor reviews.</p>
 <div className="grid md:grid-cols-3 gap-3 mt-3">
 <button className="btn btn-primary">New DSAR</button>
 <button className="btn">Add Vendor</button>
 <button className="btn">Generate Policy Pack</button>
 </div>
 </div>
 <div className="card">
 <div className="font-semibold mb-2">Framework Status</div>
 <ul className="list-disc ml-5">
 {items.map(x=> <li key={x.name}><b>{x.name}</b>: {x.status}</li>)}
 </ul>
 </div>
 </div>
 );
}
