import { useState } from "react";
import services from "../lib/services.json";

export default function Sidebar() {
  const [query, setQuery] = useState("");
  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-4 overflow-y-auto">
      <h2 className="font-bold mb-4 text-blue-700">Services</h2>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search services..."
        className="w-full mb-4 p-2 border rounded"
      />
      <div className="space-y-2">
        {filtered.map(svc => (
          <div key={svc.id} className="text-sm">
            <a href={svc.link} className="block p-2 rounded hover:bg-gray-100">
              {svc.name}
            </a>
          </div>
        ))}
      </div>
    </aside>
  );
}
