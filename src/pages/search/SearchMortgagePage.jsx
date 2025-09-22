import React from "react";
import MortgageSearch from "../../pages/mortgage/MortgageSearch";

export default function SearchMortgagePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Mortgage Search Engine</h1>
      <MortgageSearch />
    </div>
  );
}