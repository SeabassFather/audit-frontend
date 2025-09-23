import React, { useEffect, useState } from "react";

const items = [
  "MXN/USD FX ~ 16.9 (placeholder)",
  "Papaya W1W26 avg  (placeholder)",
  "Navel Oranges stable  (placeholder)",
  "Freight index  0.7% (placeholder)",
];

export default function TopRibbonTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full bg-black text-white text-sm px-4 py-2">
      <div className="max-w-6xl mx-auto flex items-center gap-3">
        <span className="opacity-70">Ticker</span>
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap">{items[i]}</div>
        </div>
      </div>
    </div>
  );
}
