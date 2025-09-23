import React, { useEffect, useMemo, useState } from "react";

export default function CommodityPicker({ value, onChange }) {
  const [all, setAll] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch("/api/usda/commodities")
      .then((r) => r.json())
      .then((j) => {
        if (alive) setAll(Array.isArray(j.items) ? j.items : []);
      })
      .finally(() => alive && setLoading(false));
    return () => (alive = false);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((x) => x.toLowerCase().includes(q));
  }, [all, query]);

  function toggle(item) {
    const set = new Set(value || []);
    if (set.has(item)) set.delete(item);
    else set.add(item);
    onChange(Array.from(set));
  }
  function selectAllVisible() {
    const set = new Set(value || []);
    filtered.forEach((x) => set.add(x));
    onChange(Array.from(set));
  }
  function clearAll() {
    onChange([]);
  }

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 12,
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <input
          placeholder="Search commodities (USDA)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: 8,
          }}
        />
        <button
          onClick={selectAllVisible}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
          }}
        >
          Select Visible
        </button>
        <button
          onClick={clearAll}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
          }}
        >
          Clear
        </button>
      </div>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <div
          style={{
            maxHeight: 300,
            overflow: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gap: 8,
          }}
        >
          {filtered.map((item, i) => (
            <label
              key={i}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                padding: "8px 10px",
                border: "1px solid #f3f4f6",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={(value || []).includes(item)}
                onChange={() => toggle(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      )}
      <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
        Showing {filtered.length} of {all.length}. Selected:{" "}
        {(value || []).length}.
      </div>
    </div>
  );
}
