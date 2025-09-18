import { useState } from "react";
import byCat from "../data/services.byCategory.json";

export default function Services(){
  const [q,setQ] = useState("");
  const [open,setOpen] = useState({});
  const cats = Object.keys(byCat);
  const filter = (s)=> s.name.toLowerCase().includes(q.toLowerCase())
    || (s.tags||[]).join(" ").toLowerCase().includes(q.toLowerCase());

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AuditDNA Services</h1>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name or tag..." className="border p-2 w-full mb-4 rounded"/>
      <div className="space-y-3">
        {cats.map(cat=>{
          const list = byCat[cat].filter(filter);
          const isOpen = open[cat] ?? true;
          return (
            <div key={cat} className="card">
              <button onClick={()=>setOpen({...open,[cat]:!isOpen})}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-t bg-dnaBlue text-white">
                <span className="font-semibold">{cat}</span>
                <span>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="p-4">
                  <ul className="grid md:grid-cols-2 gap-2">
                    {list.map(s=>(
                      <li key={s.id} className="border rounded p-3 hover:bg-slate-50">
                        <a className="text-dnaBlue font-medium" href={`/service/${s.id}`}>{s.name}</a>
                        <div className="mt-1 text-xs text-slate-600">
                          {(s.tags||[]).slice(0,5).join(" · ")}
                        </div>
                      </li>
                    ))}
                    {list.length===0 && <div className="text-sm text-slate-500">No matches in this category.</div>}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}