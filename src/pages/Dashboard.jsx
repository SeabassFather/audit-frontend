import React from "react";

export default function Dashboard() {
  return (
    <div style={{ padding: "32px 0", maxWidth: 1400, margin: "0 auto" }}>
      <h1 style={{ fontWeight: 900, fontSize: 38, color: "#17853b", marginBottom: 14 }}>
        Welcome back, Saul!
      </h1>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 36 }}>
        {/* Example stat cards */}
        {[
          { label: "Total Transactions", value: 1241, color: "#17853b" },
          { label: "Active Growers", value: 312, color: "#eab308" },
          { label: "Market Alerts", value: 5, color: "#ef4444" },
          { label: "Compliance Issues", value: 1, color: "#0ea5e9" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#fff",
              flex: "1 1 220px",
              minWidth: 220,
              padding: 26,
              borderRadius: 15,
              boxShadow: "0 2px 18px #17853b10",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontWeight: 700,
              fontSize: 18,
              color: "#222",
              borderLeft: `6px solid ${stat.color}`,
            }}
          >
            <div style={{ fontSize: 44, color: stat.color, marginBottom: 8 }}>
              {stat.value}
            </div>
            <div>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {/* Placeholder for charts or quick overview widgets */}
        <div
          style={{
            flex: "2 1 420px",
            background: "#fff",
            padding: 32,
            borderRadius: 16,
            boxShadow: "0 2px 24px #17853b12",
            minWidth: 340,
          }}
        >
          <h2 style={{ fontWeight: 800, fontSize: 23, marginBottom: 18 }}>
            Price Trends Overview
          </h2>
          <div
            style={{
              height: 240,
              background: "linear-gradient(90deg,#c7f9cc,#57cc99 80%)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#222",
              fontSize: 28,
              fontWeight: 700,
              opacity: 0.5,
            }}
          >
            {/* Replace with live chart */}
            [Chart goes here]
          </div>
        </div>
        <div
          style={{
            flex: "1 1 260px",
            background: "#fff",
            padding: 32,
            borderRadius: 16,
            boxShadow: "0 2px 24px #17853b12",
            minWidth: 260,
          }}
        >
          <h2 style={{ fontWeight: 800, fontSize: 23, marginBottom: 18 }}>
            Quick Actions
          </h2>
          <button
            style={{
              width: "100%",
              marginBottom: 14,
              padding: "14px 0",
              background: "#17853b",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontWeight: 800,
              fontSize: 17,
              cursor: "pointer",
              transition: "background 0.18s",
            }}
          >
            Launch USDA Search
          </button>
          <button
            style={{
              width: "100%",
              marginBottom: 14,
              padding: "14px 0",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontWeight: 800,
              fontSize: 17,
              cursor: "pointer",
              transition: "background 0.18s",
            }}
          >
            View Compliance Alerts
          </button>
          <button
            style={{
              width: "100%",
              padding: "14px 0",
              background: "#0ea5e9",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontWeight: 800,
              fontSize: 17,
              cursor: "pointer",
              transition: "background 0.18s",
            }}
          >
            New Service Request
          </button>
        </div>
      </div>
    </div>
  );
}