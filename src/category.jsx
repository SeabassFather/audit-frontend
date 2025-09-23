// src/pages/Category.jsx
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import serviceData from "../data/serviceData"; // adjust if your path differs

export default function Category() {
  const { catId } = useParams();
  const [q, setQ] = useState("");

  // Always call hooks; put the conditional work *inside* the callback
  const list = useMemo(() => {
    const cat = serviceData[catId];
    if (!cat || !Array.isArray(cat.services)) return [];
    const term = q.trim().toLowerCase();
    if (!term) return cat.services;
    return cat.services.filter(s =>
      `${s.id} ${s.name} ${s.desc || ""}`.toLowerCase().includes(term)
    );
  }, [catId, q]);

  const cat = serviceData[catId];

  if (!cat) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Category not found</h2>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <h2 className="h2">{cat.title}</h2>
        <input
          className="filter"
          placeholder="Filter"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="card-grid">
        {list.map((s) => (
          <Link
            key={s.id}
            to={`/service/${s.id}`}
            className="card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card-title">{s.name}</div>
            {s.desc ? <div className="card-desc">{s.desc}</div> : null}
          </Link>
        ))}
        {list.length === 0 && <div className="muted">No matches.</div>}
      </div>
    </div>
  );
}
