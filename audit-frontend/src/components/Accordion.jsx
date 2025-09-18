import React, { useMemo, useState } from "react";
import services from "../data/services.json";

function Group({ title, items, open, onToggle }) {
  return (
    <div className="card" style={{marginBottom:12}}>
      <button className="btn" onClick={onToggle} style={{width:"100%", justifyContent:"space-between", background:"transparent"}}>
        <span style={{fontWeight:600}}>{title}</span>
        <span>{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div style={{marginTop:8, display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:8}}>
          {items.map(s => (
            <div key={s.id} className="card" style={{padding:12}}>
              <div style={{fontWeight:600}}>{s.name}</div>
              <div style={{fontSize:12, opacity:.7}}>{s.category}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ServicesAccordion() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState({});

  const grouped = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = needle
      ? services.filter(s =>
          s.name.toLowerCase().includes(needle) ||
          s.category.toLowerCase().includes(needle)
        )
      : services;

    const map = new Map();
    for (const s of filtered) {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category).push(s);
    }
    return [...map.entries()].map(([cat, items]) => ({ cat, items }));
  }, [q]);

  return (
    <section id="services" className="container" style={{paddingTop:24}}>
      <h2 style={{marginBottom:12}}>Services <span className="badge">{services.length}</span></h2>
      <input className="input" placeholder="Search services or category…" value={q} onChange={e=>setQ(e.target.value)} />
      <div style={{marginTop:12}}>
        {grouped.map(({cat, items}) => (
          <Group
            key={cat}
            title={`${cat} — ${items.length}`}
            items={items}
            open={!!open[cat]}
            onToggle={() => setOpen(o => ({...o, [cat]: !o[cat]}))}
          />
        ))}
        {grouped.length === 0 && <div className="card">No matches.</div>}
      </div>
    </section>
  );
}