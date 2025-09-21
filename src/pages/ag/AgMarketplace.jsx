import { useMemo, useState } from "react";
import Table from "../../components/Table.jsx";
import { mkListings } from "../../lib/mock.js";

export default function AgMarketplace(){
 const [term,setTerm] = useState("");
 const rows = useMemo(()=> mkListings(35),[]);
 const filtered = rows.filter(r => !term || r.commodity.toLowerCase().includes(term.toLowerCase()));
 const cols = [
 {key:"id", title:"#"},
 {key:"commodity", title:"Commodity"},
 {key:"grade", title:"Grade"},
 {key:"qty", title:"Qty"},
 {key:"price", title:"Price"},
 {key:"origin", title:"Origin"},
 {key:"status", title:"Status"},
 ];
 return (
 <div className="space-y-4">
 <div className="card">
 <div className="flex gap-3 items-end">
 <div className="flex-1">
 <label className="text-sm text-gray-600">Filter by commodity</label>
 <input className="w-full border border-silver-300 rounded-xl2 px-3 py-2" value={term} onChange={e=>setTerm(e.target.value)} placeholder="Papaya, Orange, Avocado..."/>
 </div>
 <span className="pill">{filtered.length} results</span>
 </div>
 </div>
 <Table columns={cols} rows={filtered}/>
 </div>
 );
}