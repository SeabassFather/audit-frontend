import React, { useEffect, useState } from "react";

export default function USDA() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseEnv = process.env.REACT_APP_USDA_API_BASE || "";
    const base = baseEnv.replace(/\/+$/, "");
    const key = process.env.REACT_APP_USDA_API_KEY || "";

    if (!base) {
      setError("Set REACT_APP_USDA_API_BASE in .env");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const r = await fetch(`${base}/services/v1/market/`, {
          headers: key ? { "x-api-key": key } : {},
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = await r.json();
        setRows(Array.isArray(j) ? j : []);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4">Loading…</div>;
  if (error) return <div className="p-4 text-red-600">USDA error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="h2">USDA Market Data</h2>
      <div className="mb-2">{rows.length} records</div>
      <div className="list">
        {rows.slice(0, 50).map((it, idx) => (
          <div key={idx} className="row">
            <div className="row-title">{it.name || it.commodity || "Item"}</div>
            <div className="row-sub">{it.market || it.location || ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
}