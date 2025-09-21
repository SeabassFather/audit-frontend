import { useIntake } from "../contexts/intake";
import { useState } from "react";

export default function Uploads(){
 const { items, addFiles, remove, clear } = useIntake();
 const categories = [
 "Mortgage","Real Estate","Consumer","Auto","Medical","Ag",
 "USDA","Water & Soil","Compliance","Auditing"
 ];
 const [cat, setCat] = useState(categories[0]);

 function onPick(e){
 addFiles(cat, e.target.files);
 e.target.value = "";
 }

 return (
 <div className="dna-section">
 <h1 className="text-2xl font-bold mb-3">Document Uploads</h1>

 <div className="card p-4 mb-4 flex flex-col md:flex-row gap-3">
 <select value={cat} onChange={e=>setCat(e.target.value)} className="border rounded p-2">
 {categories.map(c => <option key={c}>{c}</option>)}
 </select>

 <label className="border rounded px-3 py-2 bg-white cursor-pointer inline-block">
 <input type="file" multiple className="hidden" onChange={onPick}/>
 Choose filesÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦
 </label>

 <button className="border px-3 py-2 rounded" onClick={clear}>Clear all</button>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
 {items.map(it => (
 <div key={it.id} className="card p-3">
 <div className="font-medium">{it.fileName}</div>
 <div className="text-xs text-slate-600">{it.category} Ãƒâ€šÃ‚Â· {(it.size/1024).toFixed(1)} KB</div>
 <div className="mt-2 flex gap-2">
 <button className="text-sm border px-2 py-1 rounded" onClick={()=>remove(it.id)}>Remove</button>
 </div>
 </div>
 ))}
 {items.length === 0 && (
 <div className="text-slate-500">No files yet. Select a category and choose files.</div>
 )}
 </div>
 </div>
 );
}