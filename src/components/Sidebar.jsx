import React, { useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/serviceData";
import { slugify } from "../utils/slugify";

export default function Sidebar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(() => new Set(["consumer","mortgage","agri","elite"]));
  const nav = useNavigate();
  const loc = useLocation();

  const filtered = useMemo(()=>{
    if(!query) return CATEGORIES;
    const q = query.toLowerCase();
    return CATEGORIES.map(c => ({
      ...c,
      services: c.services.filter(s => s.name.toLowerCase().includes(q) || (s.desc||"").toLowerCase().includes(q))
    })).filter(c => c.services.length > 0);
  }, [query]);

  const topPages = [
    { to: "/ag", label: "Ag Explorer" },
    { to: "/usda", label: "USDA Data" },
    { to: "/lenders", label: "Lender Match" },
    { to: "/inquiry", label: "Inquiry PDF" },
    { to: "/elite", label: "Elite" },
    { to: "/", label: "Dashboard" }
  ];

  return (
    <aside className="sidebar">
      <div className="brand" onClick={()=>nav("/")}>AuditDNA</div>

      <div className="quick">
        {topPages.map(x => (
          <NavLink key={x.to} to={x.to} end className={({isActive}) => (isActive ? "quick-link active" : "quick-link")}>
            {x.label}
          </NavLink>
        ))}
      </div>

      <div className="search">
        <input
          placeholder="Search services…"
          value={query}
          onChange={e=>setQuery(e.target.value)}
        />
      </div>

      <nav className="navcol">
        {filtered.map(cat => {
          const isOpen = open.has(cat.key);
          const catSlug = slugify(cat.title);
          return (
            <div key={cat.key} className="cat">
              <button className="cat-head" onClick={()=>{
                const n = new Set(open);
                if(n.has(cat.key)) n.delete(cat.key); else n.add(cat.key);
                setOpen(n);
              }}
              onDoubleClick={()=>nav(`/cat/${catSlug}`)}
              >
                <span>{cat.title}</span>
                <span className="count">{cat.services.length}</span>
              </button>
              {isOpen && (
                <div className="cat-list">
                  {cat.services.map(s => (
                    <NavLink
                      key={s.id}
                      to={`/service/${s.id}`}
                      className={({isActive}) => (isActive ? "nav item active" : "nav item")}
                    >
                      {s.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}