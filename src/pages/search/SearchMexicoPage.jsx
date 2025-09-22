import React from "react";
import SearchMexicoLoans from "../../features/search/SearchMexicoLoans";

export default function SearchMexicoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Mexico Loans Search Engine</h1>
      <SearchMexicoLoans />
    </div>
  );
}