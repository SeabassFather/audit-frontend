import React, { useMemo, useState } from "react";
export default function CommoditySearch({
  options = [],
  value,
  onSelect,
  placeholder,
}) {
  const [q, setQ] = useState(value || "");
  const list = useMemo(() => {
    const t = (q || "").trim().toLowerCase();
    if (!t) return options.slice(0, 12);
    return options.filter((o) => o.toLowerCase().includes(t)).slice(0, 12);
  }, [q, options]);
  return (
    <div style={{ position: "relative", minWidth: 260 }}>
      <input
        aria-label="Commodity"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const pick = list[0] || q;
            setQ(pick);
            if (typeof onSelect === "function") onSelect(pick);
          }
        }}
        placeholder={placeholder || "Commodity"}
        style={{
          padding: "8px 10px",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          width: "100%",
        }}
      />
      {q && (
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            zIndex: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {list.map((opt) => (
            <div
              key={opt}
              onMouseDown={(e) => {
                e.preventDefault();
                setQ(opt);
                if (typeof onSelect === "function") onSelect(opt);
              }}
              style={{ padding: "8px 10px", cursor: "pointer" }}
            >
              {opt}
            </div>
          ))}
          {list.length === 0 && (
            <div
              style={{ padding: "8px 10px", color: "#6b7280", fontSize: 12 }}
            >
              No matches
            </div>
          )}
        </div>
      )}
    </div>
  );
}
