import { Link } from "react-router-dom";

/** Section: Engines
 * Launchpads for tools per your FE tree: scanner, facialRec, OCR, loan match, trade/AG searches,
 * response-letter generator, agreements viewer, etc. (API hooks can be wired later.)
 */
export default function Engines(){
 const groups = [
 {
 title:"Identity & Intake",
 items:[
 {name:"ID Upload", to:"/tickers", note:"/api/id/upload OCR ready"},
 {name:"OCR Scanner", to:"/tickers", note:"/api/ocr parse & validate"},
 {name:"Facial Recognition", to:"/tickers", note:"/api/facial-recognition"}
 ]
 },
 {
 title:"Search & Matching",
 items:[
 {name:"Mortgage Search", to:"/mortgage", note:"/api/search/mortgages"},
 {name:"Trade Finance", to:"/services", note:"/api/search/trade-finance"},
 {name:"Ag Marketplace", to:"/services", note:"/api/search/ag"}
 ]
 },
 {
 title:"Consumer Protection (Phase-2)",
 items:[
 {name:"Auto Loan Audit", to:"/services", note:"BHPH/abuse patterns"},
 {name:"Student Loan Analysis", to:"/services", note:"repayment fees"},
 {name:"Subscription/App Fee Audit", to:"/services", note:"recurring charges"},
 {name:"P2P Payment Recovery", to:"/services", note:"Zelle/Venmo/CashApp"}
 ]
 },
 {
 title:"Docs, Letters & Agreements",
 items:[
 {name:"Response Letter Generator", to:"/caseflow", note:"CFPB/FTC templates"},
 {name:"Partner Agreements", to:"/services", note:"viewer & download"},
 {name:"Pitch Deck", to:"/services", note:"/api/docs/pitch-deck"}
 ]
 }
 ];
 return (
 <div>
 <h1 className="text-2xl font-bold mb-4">Section Engines</h1>
 <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
 {groups.map(g=>(
 <div key={g.title} className="card p-4">
 <div className="font-semibold mb-2">{g.title}</div>
 <ul className="space-y-2">
 {g.items.map(it=>(
 <li key={it.name} className="flex items-center justify-between">
 <Link to={it.to} className="text-dnaBlue font-medium hover:underline">{it.name}</Link>
 <span className="text-xs text-slate-600">{it.note}</span>
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 </div>
 );
}