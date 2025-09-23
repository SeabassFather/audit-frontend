import React, { useMemo, useState } from "react";
import { serviceTree, servicePricing } from "../../data/serviceTree";

export default function ServiceTree() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return serviceTree;
    const needle = q.toLowerCase();
    return serviceTree
      .map((sec) => {
        const items = sec.items.filter((i) => i.toLowerCase().includes(needle));
        const titleMatch = sec.title.toLowerCase().includes(needle);
        return titleMatch || items.length ? { ...sec, items } : null;
      })
      .filter(Boolean);
  }, [q]);

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: "0 12px" }}>
      <h1 style={{ marginBottom: 8 }}>AuditDNA Services</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search services, audits, verticals"
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid #333",
          background: "#111",
          color: "#eee",
        }}
      />
      <div style={{ marginTop: 16 }}>
        {filtered.map((sec, idx) => (
          <details
            key={idx}
            open
            style={{
              background: "#121212",
              border: "1px solid #2a2a2a",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                padding: "10px 14px",
                fontWeight: 600,
              }}
            >
              {sec.title}
            </summary>
            <ul style={{ margin: "6px 0 14px 24px" }}>
              {sec.items.map((it, i) => (
                <li key={i} style={{ margin: "6px 0" }}>
                  {it}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <h2>Pricing Snapshots</h2>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <Card title="Consumer Protection">
            {servicePricing.consumer.map((p, i) => (
              <Row key={i} {...p} />
            ))}
          </Card>
          <Card title="Commercial (ELITE)">
            {servicePricing.commercial.map((p, i) => (
              <Row key={i} {...p} />
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div
      style={{
        background: "#121212",
        border: "1px solid #2a2a2a",
        borderRadius: 12,
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          borderBottom: "1px solid #222",
          fontWeight: 700,
        }}
      >
        {title}
      </div>
      <div style={{ padding: "6px 10px" }}>{children}</div>
    </div>
  );
}
function Row({ name, price, avgRecovery, time }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr .6fr .8fr .6fr",
        gap: 8,
        padding: "8px 6px",
        borderBottom: "1px dashed #222",
      }}
    >
      <div>{name}</div>
      <div>${price.toLocaleString()}</div>
      <div>${avgRecovery.toLocaleString()} avg</div>
      <div>{time}</div>
    </div>
  );
}
