import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CATEGORIES } from "../data/serviceData";
import { slugify } from "../utils/slugify";

export default function Category(){
  const { slug } = useParams();
  const [q, setQ] = useState("");
  const cat = useMemo(()=> CATEGORIES.find(c => slugify(c.title) === slug), [slug]);

  if(!cat) return <div className="p-4">Category not found.</div>;

  const list = useMemo(()=> {
    const t = q.toLowerCase();
    return !t ? cat.services : cat.services.filter(s =>
      s.name.toLowerCase().includes(t) || (s.desc||"").toLowerCase().includes(t)
    );
  }, [cat, q]);

  return (
    <div className="p-4">
      <h2 className="h2">{cat.title}</h2>
      <input className="filter" placeholder="Filter…" value={q} onChange={e=>setQ(e.target.value)} />
      <div className="card-grid">
        {list.map(s => (
          <Link key={s.id} to={`/service/${s.id}`} className="card link">
            <div className="card-title">{s.name}</div>
            <div className="subtext">{s.desc}</div>
          </Link>
        ))}
        {list.length === 0 && <div className="subtext">No services match.</div>}
      </div>
    </div>
  );
}