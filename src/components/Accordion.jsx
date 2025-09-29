import React, { useState } from "react";
import services from "../lib/services";

export default function Accordion() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState("");

  const grouped = services.reduce((acc, svc) => {
    acc[svc.category] = acc[svc.category] || [];
    acc[svc.category].push(svc);
    return acc;
  }, {});

  const filterServices = (items) => {
    if (!query) return items;
    return items.filter((svc) =>
      svc.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search services…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>
      {Object.keys(grouped).map((cat) => {
        const filtered = filterServices(grouped[cat]);
        if (filtered.length === 0) return null;
        return (
          <div key={cat} className="border-b border-gray-300">
            <button
              className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold"
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
            >
              {cat} ({filtered.length})
            </button>
            {activeCategory === cat && (
              <div className="px-6 py-2 bg-white">
                <ul className="list-disc pl-5 space-y-1">
                  {filtered.map((svc) => (
                    <li key={svc.id}>
                      <a
                        href={svc.link}
                        className="text-blue-600 hover:underline"
                      >
                        {svc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
