import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import all from "../data/services.all.json";
import UploadSheet from "../components/UploadSheet";

// strip tier labels anywhere in the name
function normalizeName(s=""){
 return s
 .replace(/\s*[ÃƒÆ’Ã†"Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â "ÃƒÆ’Ã†"ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†"Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†"Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†"ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†"Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†"Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†"ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â-]\s*(Starter|Elite|Pro).*/i,"")
 .replace(/\s*\((Starter|Elite|Pro)\).*/i,"")
 .replace(/\b(Starter|Elite|Pro)\b/ig,"")
 .replace(/\s{2,}/g," ")
 .trim();
}
function slug(s=""){ return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""); }

export default function Services(){
 const [q,setQ] = useState("");
 const [cat,setCat] = useState("All");
 const [sheet, setSheet] = useState({open:false, svc:null});

 const raw = Array.isArray(all) ? all : (all.services || []);
 const items = useMemo(()=> raw.map((s,i)=>({
 ...s,
 _id: s.id ?? i,
 display: normalizeName(s.name ?? s.title ?? s.service ?? ""),
 category: s.category ?? s.cat ?? "Other",
 desc: s.desc ?? s.description ?? ""
 })), [raw]);

 const cats = useMemo(() => ["All", ...Array.from(new Set(items.map(s=>s.category))).sort()], [items]);

 const filtered = useMemo(()=>{
 const t = q.trim().toLowerCase();
 return items
 .filter(s => (cat==="All" || s.category===cat))
 .filter(s => !t || s.display.toLowerCase().includes(t) || (Array.isArray(s.tags) && s.tags.join(" ").toLowerCase().includes(t)))
 .sort((a,b)=> a.display.localeCompare(b.display));
 }, [items,q,cat]);

 return (
 <div className="dna-section">
 <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
 <h1 className="text-2xl font-bold">Services</h1>
 <div className="flex gap-2">
 <input
 className="border rounded px-3 py-2 w-72"
 placeholder="Search services"
 value={q}
 onChange={e=>setQ(e.target.value)}
 />
 <select className="border rounded px-2 py-2" value={cat} onChange={e=>setCat(e.target.value)}>
 {cats.map(c=><option key={c} value={c}>{c}</option>)}
 </select>
 </div>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
 {filtered.map(s=>(
 <div key={s._id} className="card p-4 flex flex-col gap-3">
 <div>
 <div className="text-xs text-slate-500">{s.category}</div>
 <div className="font-semibold leading-snug">{s.display}</div>
 </div>
 {s.desc && <p className="text-sm text-slate-600">{s.desc}</p>}
 <div className="flex gap-2 mt-auto">
 <button
 className="border px-2 py-1 rounded text-sm"
 onClick={()=>setSheet({open:true, svc:s})}
 title="Upload docs for intake"
 >
 Upload
 </button>
 <Link to={`/service/${s.id ?? slug(s.display)}`} className="border px-2 py-1 rounded text-sm" title="Open details">Details</Link>
 </div>
 </div>
 ))}
 </div>

 <UploadSheet
 open={sheet.open}
 service={sheet.svc}
 onClose={()=>setSheet({open:false, svc:null})}
 />
 </div>
 );
}