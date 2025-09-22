// src/components/Accordion.jsx
import React, { useState, useMemo } from "react";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
export default function Accordion({ categories, searchable = true }) {
  const [open, setOpen] = useState({});
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return categories;
    return categories.map(cat => ({
      ...cat,
      services: (cat.services || []).filter(s => s.name.toLowerCase().includes(term))
    })).filter(cat => (cat.services || []).length > 0);
  }, [categories, q]);
  return (
    <div className="space-y-4">
      {searchable && (
        <div className="flex items-center gap-3">
          <input className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
                 placeholder="Filter services" value={q} onChange={(e)=>setQ(e.target.value)} />
        </div>
      )}
      {filtered.map((cat) => {
        const Icon = Icons[cat.icon] || Icons.Folder;
        const isOpen = !!open[cat.id];
        return (
          <section key={cat.id} className={`rounded-2xl border ${cat.tone} shadow-sm`}>
            <button className="w-full flex items-center justify-between px-4 py-3"
                    onClick={()=>setOpen(o=>({...o,[cat.id]:!o[cat.id]}))}>
              <div className="flex items-center gap-3 text-slate-800">
                <Icon className="h-5 w-5" /><h3 className="text-lg font-semibold">{cat.title}</h3>
              </div>
              <Icons.ChevronDown className={`h-5 w-5 transition-transform ${isOpen?"rotate-180":"rotate-0"}`} />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(cat.services || []).map((s) => (
                  <Link key={s.id} to={s.route || "#"}
                        className="group rounded-xl border border-slate-200 bg-white p-3 hover:shadow-md transition"
                        style={{textDecoration:"none"}}>
                    <div className="text-sm font-medium text-slate-900">{s.name}</div>
                    <div className="text-xs text-slate-500">ID: {s.id}</div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
