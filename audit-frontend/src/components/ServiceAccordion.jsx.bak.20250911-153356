import { useMemo, useState } from "react";
import data from "../data/services.json";

export default function ServiceAccordion(){
  const [q,setQ] = useState("");
  const filtered = useMemo(()=>{
    const term = q.trim().toLowerCase();
    if(!term) return data;
    return data.map(cat=>({
      ...cat,
      items: cat.items.filter(s=> s.name.toLowerCase().includes(term) || (s.tags||[]).some(t=>t.toLowerCase().includes(term)))
    })).filter(cat=>cat.items.length>0);
  },[q]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input className="w-full border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Filter services..." value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      {filtered.map(cat=> (
        <details key={cat.id} open className="card">
          <summary className="cursor-pointer text-lg font-semibold">{cat.title}</summary>
          <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cat.items.map(s=> (
              <div key={s.id} className="border border-silver-200 rounded-xl2 p-3 hover:shadow-soft">
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-gray-600">{s.desc}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(s.tags||[]).map(t=> <span key={t} className="pill">{t}</span>)}
                </div>
                <button className="btn btn-primary mt-3 w-full">Open</button>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}