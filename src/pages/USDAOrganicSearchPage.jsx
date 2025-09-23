import React, { useState } from "react";
import { endpoints, safeGet } from "../utils/api";
export default function USDAOrganicSearchPage() {
  const [q, setQ] = useState("");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const go = async (e) => {
    e.preventDefault();
    const { ok, data, error } = await safeGet(
      endpoints.organic(`?q=${encodeURIComponent(q)}`),
    );
    if (!ok) {
      setErr(error);
      setData(null);
    } else {
      setErr("");
      setData(data);
    }
  };
  return (
    <div className="p-4">
      <h2 className="h2">USDA / FDA / Organic Registry</h2>
      <form onSubmit={go} className="card">
        <input
          className="filter"
          placeholder="Company, facility, or certificate ID"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>
      <div className="card" style={{ marginTop: 12 }}>
        {!endpoints.organic() && (
          <div className="subtext">backend not configured</div>
        )}
        {err && <div className="subtext">error: {err}</div>}
        {data && (
          <pre className="subtext" style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
