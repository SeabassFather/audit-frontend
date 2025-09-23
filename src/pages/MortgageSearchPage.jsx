import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const links = [
    { label: "Mortgage Loan Search", to: "/mortgages" },
    { label: "Ag Marketplace Search", to: "/ag-market" },
    { label: "Trade Finance / Factoring", to: "/trade-finance" },
    { label: "Tickers (Mortgage Rates & Stocks)", to: "/tickers" },
    { label: "AuditDNA Auditing", to: "/auditdna" },
    { label: "Compliance Services", to: "/compliance" },
  ];
  return (
    <section className="space-y-8">
      <div className="bg-gradient-to-r from-sky-50 via-green-50 to-yellow-50 border border-gray-200 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          AuditDNA Platform Dashboard
        </h2>
        <p className="text-gray-600">
          Access all core business engines and compliance modules from this
          dashboard.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {links.map((l, i) => (
          <button
            key={i}
            className="block w-full px-6 py-6 text-lg font-semibold text-left rounded-xl border bg-white hover:bg-blue-50 shadow"
            onClick={() => navigate(l.to)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </section>
  );
}
