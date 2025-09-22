import React from "react";
import { tickers } from "../data/tickers";
export default function TickerFeed() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-blue">Compliance Tickers & Regulatory News</h1>
      {tickers.map((t) => (
        <div key={t.id} className="bg-brand-silver/40 rounded-xl p-4 border-l-4 border-brand-blue mb-2">
          <div className="text-xs text-gray-500">{t.date}</div>
          <div className="font-bold text-brand-green mt-1">{t.title}</div>
          <div className="text-gray-700">{t.content}</div>
        </div>
      ))}
    </div>
  );
}
