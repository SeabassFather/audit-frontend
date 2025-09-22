import React, { useState } from "react";
import SearchUSDA from "../features/search/SearchUSDA";
import SearchMexicoLoans from "../features/search/SearchMexicoLoans";
import SearchFactoring from "../features/search/SearchFactoring";
import MortgageSearch from "./mortgage/MortgageSearch";
import UsdaCommoditySearch from "../features/usda/UsdaCommoditySearch";
import WaterSoil from "./ag/WaterSoil";
import AgMarketplaceSearchPage from "./AgMarketplaceSearchPage";
import TradeFinanceSearchPage from "./TradeFinanceSearchPage";

const TABS = [
  { id: "usda", label: "USDA Pricing", component: SearchUSDA },
  { id: "mexico", label: "Mexico Real Estate", component: SearchMexicoLoans },
  { id: "factoring", label: "Factoring & Capital", component: SearchFactoring },
  { id: "mortgage", label: "US Mortgage", component: MortgageSearch },
  { id: "watertech", label: "WaterTech", component: WaterSoil },
  { id: "ag-marketplace", label: "Ag Marketplace", component: AgMarketplaceSearchPage },
  { id: "trade-finance", label: "Trade Finance", component: TradeFinanceSearchPage },
  { id: "usda-commodity", label: "USDA Commodity Chart", component: UsdaCommoditySearch },
];

export default function SearchPage({ initialTab = "usda" }) {
  const [tab, setTab] = useState(initialTab);
  const ActiveComponent = TABS.find(t => t.id === tab)?.component || SearchUSDA;
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">🔍 AuditDNA Search Engines</h1>
      <p className="text-slate-600 mb-6">Access all integrated search and pricing tools from one unified interface.</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map(t => (
          <button key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-xl border px-4 py-2 font-medium transition-colors ${
              tab === t.id 
                ? "bg-emerald-600 text-white border-emerald-600" 
                : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50 hover:border-emerald-300"
            }`}>
            {t.label}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <ActiveComponent />
      </div>
    </div>
  );
}
