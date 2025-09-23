import React, { useEffect, useState } from "react";
export default function TickerTape() {
  const [rates, setRates] = useState({});
  async function load() {
    try {
      const r = await fetch(
        "/api/fx/latest?base=USD&symbols=MXN,EUR,JPY,CAD,GBP",
      );
      const j = await r.json();
      setRates(j.rates || {});
    } catch {}
  }
  useEffect(() => {
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);
  const items = Object.entries(rates).map(
    ([sym, val]) => `USD/${sym} ${val?.toFixed(4) ?? ""}`,
  );
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          whiteSpace: "nowrap",
          animation: "mar 30s linear infinite",
          padding: "10px 0",
        }}
      >
        {items.map((t, i) => (
          <span key={i} style={{ marginRight: 24, opacity: 0.9 }}>
            {t}
          </span>
        ))}
      </div>
      <style>{`@keyframes mar{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
