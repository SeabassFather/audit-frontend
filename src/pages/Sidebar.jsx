import React, { useState } from "react";

export default function Sidebar({ categories = [] }) {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <aside className="sidebar">
      {categories.map(cat => (
        <div key={cat.key} className="category">
          <button 
            onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
            className={activeCategory === cat.key ? "active" : ""}
            aria-expanded={activeCategory === cat.key}
          >
            {cat.label}
            <span className="icon">{activeCategory === cat.key ? "▼" : "▶"}</span>
          </button>
          
          {activeCategory === cat.key && (
            <div className="services">
              {(cat.services || []).map(svc => (
                <button key={svc} className="service-btn">
                  {svc}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}