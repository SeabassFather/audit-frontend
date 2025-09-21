import ResultBadge from "../components/ResultBadge";

/** Section: Results
 * Final outcomes + regulator/disbursement actions, aligned with CaseFlow.
 * Synthetic data now; wire to /api/cases later.
 */
const cases = [
 { caseId:"CASE-1029", consumer:"Jane Grower", category:"Mortgage", outcome:"Refund $1,240.22", status:"Pending",
 actions:["Title Notice sent","Escrow reassignment requested","CFPB letter drafted"] },
 { caseId:"CASE-1031", consumer:"Marco Buyer", category:"Consumer", outcome:"Cancel subscription; refund $59.96", status:"Open",
 actions:["Merchant letter sent","FTC template queued"] },
 { caseId:"CASE-1033", consumer:"Lee Driver", category:"Auto", outcome:"Doc fee adjustment $199 $95", status:"Closed",
 actions:["Dealer response received","Remediation confirmed"] }
];

export default function Results(){
 return (
 <div>
 <h1 className="text-2xl font-bold mb-4">Section Results</h1>
 <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
 {cases.map(c=>(
 <div key={c.caseId} className="card p-4">
 <div className="flex items-center justify-between">
 <div className="font-semibold">{c.caseId}</div>
 <ResultBadge status={c.status}/>
 </div>
 <div className="text-sm text-slate-600">{c.consumer} {c.category}</div>
 <div className="mt-2 font-medium">{c.outcome}</div>
 <ul className="mt-3 text-sm list-disc ml-5 space-y-1">
 {c.actions.map((a,i)=><li key={i}>{a}</li>)}
 </ul>
 </div>
 ))}
 </div>
 <div className="card p-4 mt-4">
 <div className="font-semibold mb-2">Regulator Payload (CaseFlow)</div>
 <pre className="text-xs overflow-auto">{JSON.stringify({
 notifyTitle:{ required:["consumer","creditor","amount","contact"] },
 escrowInstruction:{ reassign:true, fields:["escrowAccount","amount","creditor"] },
 regulators:[{ agency:"CFPB" }, { agency:"State Authority"}]
 }, null, 2)}</pre>
 </div>
 </div>
 );
}