import { useMemo, useState } from "react";
import Table from "../../components/Table.jsx";
import { mkLoans } from "../../lib/mock.js";

export default function MortgageSearch(){
 const [q,setQ] = useState({ fico: 660, ltv: 80, product: "Any" });
 const rows = useMemo(()=> mkLoans(40),[]);
 const filtered = rows.filter(r =>
 r.fico >= q.fico && r.ltv <= q.ltv && (q.product==="Any" || r.product===q.product)
 );
 const cols = [
 {key:"id", title:"ID"},
 {key:"product", title:"Product"},
 {key:"state", title:"State"},
 {key:"fico", title:"FICO"},
 {key:"ltv", title:"LTV %"},
 {key:"dti", title:"DTI %"},
 {key:"rate", title:"Rate"},
 ];
 return (
 <div className="space-y-4">
 <div className="card">
 <div className="grid md:grid-cols-4 gap-3">
 <div>
 <label className="text-sm text-gray-600">Min FICO</label>
 <input type="number" className="w-full border border-silver-300 rounded-xl2 px-3 py-2"
 value={q.fico} onChange={e=>setQ(s=>({...s, fico: Number(e.target.value)||0}))}/>
 </div>
 <div>
 <label className="text-sm text-gray-600">Max LTV %</label>
 <input type="number" className="w-full border border-silver-300 rounded-xl2 px-3 py-2"
 value={q.ltv} onChange={e=>setQ(s=>({...s, ltv: Number(e.target.value)||0}))}/>
 </div>
 <div>
 <label className="text-sm text-gray-600">Product</label>
 <select className="w-full border border-silver-300 rounded-xl2 px-3 py-2"
 value={q.product} onChange={e=>setQ(s=>({...s, product: e.target.value}))}>
 <option>Any</option><option>DSCR</option><option>SBA</option><option>Conventional</option><option>HELOC</option>
 </select>
 </div>
 <div className="self-end"><span className="pill">{filtered.length} matches</span></div>
 </div>
 </div>
 <Table columns={cols} rows={filtered}/>
 </div>
 );
}