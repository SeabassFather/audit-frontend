import React from "react";

export default function Tickers() {
  // Example Ticker list; replace/add logic as needed
  const tickers = [
    { label: "USDA Lettuce", value: "$12.50/case" },
    { label: "Mortgage 30yr Fixed", value: "6.5%" },
    { label: "Factoring Advances", value: "Up to 80%" },
    { label: "Audit Services", value: "275+" }
  ];

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Market Tickers</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {tickers.map((t, i) => (
          <div key={i} className="card p-4 flex justify-between items-center">
            <span className="font-medium text-slate-700">{t.label}</span>
            <span className="text-blue-600 font-bold">{t.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}