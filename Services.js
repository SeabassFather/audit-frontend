import React, { useState } from "react";
import servicesData from "../data/services.json";

export default function Services() {
  const [expanded, setExpanded] = useState(null);
  const [query, setQuery] = useState("");

  // Filtered services based on query
  const filteredData = servicesData.map((group) => {
    const filteredItems = group.items.filter((svc) =>
      svc.toLowerCase().includes(query.toLowerCase())
    );
    return { ...group, items: filteredItems };
  }).filter(group => group.items.length > 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🛠️ AuditDNA Services Catalog</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search services (e.g. Escrow, Water, Compliance)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Accordion for Categories */}
      {filteredData.map((group, idx) => (
        <div
          key={idx}
          className="mb-4 border rounded-lg bg-white shadow overflow-hidden"
        >
          <div
            className="cursor-pointer px-4 py-2 font-semibold bg-gray-100 hover:bg-gray-200"
            onClick={() => setExpanded(expanded === idx ? null : idx)}
          >
            {group.category}
          </div>
          {expanded === idx && (
            <ul className="p-4 list-disc list-inside space-y-1">
              {group.items.map((svc, i) => (
                <li key={i}>{svc}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Overview Block */}
      <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-lg shadow">
        <h3 className="font-bold mb-2">📋 Services Overview</h3>
        <p>
          AuditDNA integrates <strong>300+ services</strong> across agriculture,
          mortgage & real estate, escrow/title, CPA/legal, education,
          eco-sustainability, consumer protection, trade finance, healthcare,
          government, energy, and more. Use this catalog to explore modules,
          audits, and compliance checks in one place.
        </p>
      </div>
    </div>
  );
}
