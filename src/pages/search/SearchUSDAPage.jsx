import React from "react";
import SearchUSDA from "../../features/search/SearchUSDA";

export default function SearchUSDAPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">USDA Search Engine</h1>
      <SearchUSDA />
    </div>
  );
}