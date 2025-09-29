import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import spartan300 from "../data/spartan300.json";

export default function Sidebar() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();

  // Filter categories/services for search
  const filteredCategories = spartan300.categories.map((cat) => ({
    ...cat,
    services: cat.services.filter((srv) =>
      srv.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.services.length > 0);

  return (
    <aside className="fixed left-0 top-0 w-72 h-screen bg-gradient-to-b from-gray-100 via-slate-100 to-gray-50 text-gray-900 overflow-y-auto shadow z-30 border-r border-green-200">
      <div className="px-5 py-4 text-2xl font-extrabold flex items-center space-x-2 bg-slate-50 border-b border-green-200">
        <span className="text-green-700">AuditDNA</span>
        <span className="text-yellow-500">ELITE</span>
      </div>
      <div className="px-4 py-3">
        <input
          type="text"
          className="w-full rounded bg-gray-200 px-3 py-2 text-sm text-gray-900 mb-2 border border-silver-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Search services"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <nav>
        {filteredCategories.map((cat, idx) => (
          <div key={cat.name}>
            <button
              className={`w-full flex justify-between items-center px-4 py-2 font-semibold bg-silver-100 hover:bg-green-100 transition rounded border-b border-gray-200 ${openIndex === idx ? "text-green-700" : "text-gray-900"}`}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
            >
              <span>{cat.name}</span>
              <span>{openIndex === idx ? "▲" : "▼"}</span>
            </button>
            <div className={`${openIndex === idx ? "block" : "hidden"} pl-2 py-1`}>
              {cat.services.map((srv) => (
                <Link
                  to={`/services/${srv.id}`}
                  className={`block py-1 px-2 hover:bg-yellow-100 rounded text-sm transition ${
                    location.pathname === `/services/${srv.id}` ? "bg-green-200 font-bold" : ""
                  }`}
                  key={srv.id}
                >
                  {srv.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}