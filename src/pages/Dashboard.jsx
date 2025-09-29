import React, { useState } from "react";
import { Link } from "react-router-dom";

const modules = [
  { name: "USDA Pricing", route: "/usda" },
  { name: "Mortgage Search", route: "/mortgage" },
  { name: "Ag Factoring", route: "/factoring" },
  { name: "Compliance Engine", route: "/compliance" },
  { name: "WaterTech Upload", route: "/water-tech" },
  { name: "Audit Reports", route: "/audit-report" }
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const filteredModules = modules.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-3xl mx-auto mb-8">
        <input
          type="text"
          className="w-full rounded-xl bg-gray-200 px-4 py-3 text-lg text-gray-900 mb-0 border border-silver-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="🔎 Search modules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-5">
        {filteredModules.map(mod => (
          <Link
            to={mod.route}
            key={mod.route}
            className="bg-gradient-to-b from-silver-100 to-green-50 rounded-xl hover:from-yellow-100 hover:to-green-100 text-center p-8 shadow-lg text-xl font-bold text-green-700 border-2 border-green-200 transition-all duration-200"
          >
            {mod.name}
          </Link>
        ))}
        {filteredModules.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-lg pt-12">
            No modules found.
          </div>
        )}
      </div>
    </div>
  );
}