import React, { useState } from "react";
import SearchUSDA from "../features/search/SearchUSDA";
import SearchMexicoLoans from "../features/search/SearchMexicoLoans";
import SearchFactoring from "../features/search/SearchFactoring";

const TABS = [
  { id: "usda", label: "USDA" },
  { id: "mexico", label: "Mexico Loans" },
  { id: "factoring", label: "Factoring" },
];

export default function SearchPage({ initialTab = "usda" }) {
  const [tab, setTab] = useState(initialTab);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">AuditDNA  Search Engines</h1>
      <div className="flex gap-2 mb-4">
        {TABS.map(t => (
          <button key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-xl border px-3 py-2 ${tab===t.id ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"}`}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === "usda" && <SearchUSDA />}
      {tab === "mexico" && <SearchMexicoLoans />}
      {tab === "factoring" && <SearchFactoring />}
    </div>
  );
}