import data from "../data/services.json";
import { useState, useMemo } from "react";

export default function Services(){
  const [q,setQ] = useState("");
  const filtered = useMemo(()=>{
    const t=q.trim().toLowerCase();
    if(!t) return data;
    return data.map(c=>({...c, items:c.items.filter(s=> s.name.toLowerCase().includes(t) || (s.tags||[]).some(x=>x.toLowerCase().includes(t)))}))
               .filter(c=>c.items.length>0);
  },[q]);
  return (
    <div className="space-y-4">
      <div className="card">
        <label className="text-sm text-gray-600">Filter</label>
        <input className="w-full border border-silver-300 rounded-xl2 px-3 py-2" value={q} onChange={e=>setQ(e.target.value)} placeholder="Type to filter services..." />
      </div>
      {filtered.map(cat=>(
        <details key={cat.id} open className="card">
          <summary className="cursor-pointer text-lg font-semibold">{cat.title}</summary>
          <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cat.items.map(s=>(
              <div key={s.id} className="border border-silver-200 rounded-xl2 p-3 hover:shadow-soft">
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-gray-600">{s.desc}</div>
                <div className="mt-2 flex flex-wrap gap-2">{(s.tags||[]).map(t=> <span key={t} className="pill">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}