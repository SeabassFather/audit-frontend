import React from "react";
import SearchFactoring from "../../features/search/SearchFactoring";

export default function SearchFactoringPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Factoring Search Engine</h1>
      <SearchFactoring />
    </div>
  );
}