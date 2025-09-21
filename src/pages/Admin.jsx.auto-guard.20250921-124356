export default function Admin(){
 const rows = [
 {name:"DSAR Workflow", status:"Ready"},
 {name:"Vendor Reviews", status:"In Progress"},
 {name:"Policy Pack Generator", status:"Ready"},
 {name:"KYC/KYB Checklist", status:"Ready"},
 ];
 return (
 <div className="space-y-4">
 <div className="card">
 <div className="text-lg font-semibold">Admin Controls</div>
 <p className="text-gray-700 mt-2">Compliance toggles & partner integrations.</p>
 <ul className="list-disc ml-5 mt-2">{rows.map(r=> <li key={r.name}><b>{r.name}</b>: {r.status}</li>)}</ul>
 </div>
 </div>
 );
}