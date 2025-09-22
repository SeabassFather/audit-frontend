import SeverityPill from "../components/SeverityPill";

/** Section: Findings
 * Normalized evidence table across engines (scanner/OCR/search/compliance checks).
 * This demo seeds synthetic findings; swap in API data later.
 */
const seed = [
 { id:"FND-001", module:"OCR", category:"Mortgage", severity:"High", finding:"Escrow fee overcharge detected", source:"upload.pdf", service:"Escrow Fee Reconciliation", caseId:"CASE-1029" },
 { id:"FND-002", module:"Scanner", category:"Consumer", severity:"Medium", finding:"Recurring app fee: $14.99/mo", source:"statements.zip", service:"Subscription/App Fee Audit", caseId:"CASE-1031" },
 { id:"FND-003", module:"Search", category:"Auto", severity:"Low", finding:"Dealer doc fee exceeds regional avg", source:"auto_quote.json", service:"Auto Loan Audit", caseId:"CASE-1033" },
 { id:"FND-004", module:"Compliance", category:"Privacy", severity:"Info", finding:"GLBA privacy notice missing year", source:"policy.html", service:"GLBA", caseId:"" }
];

export default function Findings(){
 return (
 <div>
 <h1 className="text-2xl font-bold mb-4">Section Findings</h1>
 <div className="card overflow-x-auto">
 <table className="table-auto w-full">
 <thead className="bg-dnaBlue text-white">
 <tr>
 <th className="p-2 text-left">ID</th>
 <th className="p-2 text-left">Module</th>
 <th className="p-2 text-left">Category</th>
 <th className="p-2 text-left">Severity</th>
 <th className="p-2 text-left">Finding</th>
 <th className="p-2 text-left">Source</th>
 <th className="p-2 text-left">Service</th>
 <th className="p-2 text-left">Case</th>
 </tr>
 </thead>
 <tbody>
 {seed.map(r=>(
 <tr key={r.id} className="odd:bg-slate-50">
 <td className="p-2">{r.id}</td>
 <td className="p-2">{r.module}</td>
 <td className="p-2">{r.category}</td>
 <td className="p-2"><SeverityPill level={r.severity}/></td>
 <td className="p-2">{r.finding}</td>
 <td className="p-2 text-xs">{r.source}</td>
 <td className="p-2">{r.service}</td>
 <td className="p-2">{r.caseId}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <p className="text-xs text-slate-500 mt-2">Replace with live data from scanner/OCR/search/compliance APIs.</p>
 </div>
 );
}
