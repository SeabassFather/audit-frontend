import React, { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

/**
 * Elite dashboard (multi-commodity)
 * - Color-coded multi-line chart (26 weeks)
 * - Toggle commodities
 * - Pulls from /api/market/avg?commodities=A,B,C (if available)
 * - Falls back to local demo series if API not ready
 */

const ALL_COMMODITIES = [
  { key: "tomatoes", label: "Tomatoes" },
  { key: "avocado", label: "Avocado" },
  { key: "strawberry", label: "Strawberries" },
  { key: "pineapple", label: "Pineapple" },
  { key: "papaya", label: "Papaya" },
  { key: "roma", label: "Roma Tomato" },
];

const COLOR = {
  tomatoes: "rgba(30,144,255,0.85)", // dodger blue
  avocado: "rgba(46,204,113,0.9)", // green
  strawberry: "rgba(255,99,132,0.9)", // red
  pineapple: "rgba(241,196,15,0.9)", // yellow
  papaya: "rgba(255,159,64,0.95)", // orange
  roma: "rgba(142,68,173,0.95)", // purple
};

// 26 week labels
const labels = Array.from({ length: 26 }, (_, i) => `W${i + 1}`);

const demoSeries = {
  // 26 points per series; tweakable
  tomatoes: [
    16, 17, 18.5, 18.7, 18.6, 19.2, 18.8, 18.4, 18.6, 17, 16.9, 17.2, 15.1,
    15.2, 15.3, 15.2, 15.1, 14.1, 15.0, 15.9, 15.2, 16.1, 16.2, 16.8, 17.6,
    17.8,
  ],
  avocado: [
    24.3, 24.1, 23.9, 23.8, 23.5, 22.6, 22.5, 22.0, 21.2, 20.4, 19.8, 19.5,
    19.2, 18.9, 18.7, 18.1, 17.2, 16.8, 16.5, 16.9, 17.3, 17.8, 18.2, 18.9,
    19.6, 20.4,
  ],
  strawberry: [
    13.1, 12.9, 12.7, 12.4, 12.1, 11.6, 11.2, 10.9, 10.5, 10.2, 10.0, 10.1,
    10.3, 10.6, 10.9, 11.3, 11.6, 11.8, 12.2, 12.6, 13.0, 13.3, 13.5, 13.7,
    13.9, 14.2,
  ],
  pineapple: [
    9.5, 9.6, 9.4, 9.3, 9.2, 9.1, 9.0, 8.9, 8.8, 8.7, 8.8, 8.9, 9.0, 9.1, 9.2,
    9.2, 9.3, 9.4, 9.6, 9.8, 9.9, 10.0, 10.1, 10.3, 10.4, 10.6,
  ],
  papaya: [
    8.1, 8.0, 8.2, 8.1, 7.9, 7.8, 7.7, 7.6, 7.5, 7.6, 7.7, 7.9, 8.0, 8.1, 8.3,
    8.4, 8.6, 8.7, 8.9, 9.0, 9.1, 9.3, 9.4, 9.6, 9.8, 9.9,
  ],
  roma: [
    14.2, 14.4, 14.5, 14.7, 14.9, 15.0, 15.1, 15.2, 15.3, 15.1, 14.8, 14.2,
    13.7, 13.5, 13.2, 13.0, 12.9, 13.1, 13.6, 13.9, 14.1, 14.4, 14.9, 15.3,
    15.7, 16.0,
  ],
};

const currency = (v) => `$${Number(v).toFixed(2)}`;

export default function Elite() {
  const [active, setActive] = useState([
    "tomatoes",
    "avocado",
    "strawberry",
    "pineapple",
    "papaya",
    "roma",
  ]);
  const [series, setSeries] = useState(demoSeries);
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState("");

  // Try backend feed (optional). If it fails, we keep demoSeries.
  useEffect(() => {
    const go = async () => {
      setLoading(true);
      setErr("");
      try {
        const qs = encodeURIComponent(active.join(","));
        const res = await fetch(`/api/market/avg?commodities=${qs}`);
        if (res.ok) {
          const json = await res.json();
          // expect { data: { key: [..26 numbers..], ... } }
          if (json && json.data)
            setSeries((prev) => ({ ...prev, ...json.data }));
        }
      } catch (e) {
        setErr(String(e));
      } finally {
        setLoading(false);
      }
    };
    // fire once on mount; comment the next line if you want every toggle to refetch
    go();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (key) => {
    setActive((a) =>
      a.includes(key) ? a.filter((x) => x !== key) : [...a, key],
    );
  };

  const chartData = useMemo(() => {
    return {
      labels,
      datasets: active.map((k) => ({
        label: ALL_COMMODITIES.find((x) => x.key === k)?.label || k,
        data: series[k] || [],
        borderColor: COLOR[k] || "rgba(0,0,0,0.6)",
        backgroundColor: (COLOR[k] || "rgba(0,0,0,0.6)")
          .replace("0.9", "0.15")
          .replace("0.95", "0.15")
          .replace("0.85", "0.15"),
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.25,
      })),
    };
  }, [active, series]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${currency(ctx.parsed.y)}`,
        },
      },
    },
    scales: {
      y: {
        ticks: { callback: (v) => currency(v) },
        title: { display: true, text: "USD per unit (weekly)" },
      },
      x: { title: { display: true, text: "Weeks" } },
    },
  };

  return (
    <div style={{ padding: "18px" }}>
      <h2 style={{ margin: "4px 0 12px 0" }}>
        Elite Multi-Commodity Pricing (USDA)
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          margin: "8px 0 16px 0",
        }}
      >
        {ALL_COMMODITIES.map((c) => (
          <button
            key={c.key}
            onClick={() => toggle(c.key)}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: `1px solid ${COLOR[c.key]}`,
              background: active.includes(c.key)
                ? COLOR[c.key]
                    .replace("0.9", "0.15")
                    .replace("0.95", "0.15")
                    .replace("0.85", "0.15")
                : "#fff",
              color: "#222",
              cursor: "pointer",
              boxShadow: active.includes(c.key)
                ? "0 0 0 2px rgba(0,0,0,0.04) inset"
                : "none",
            }}
            title={c.label}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ marginBottom: 8, color: "#888" }}>Loading USDA feed</div>
      )}
      {error && (
        <div style={{ marginBottom: 8, color: "#b00" }}>{String(error)}</div>
      )}

      <div
        style={{
          height: 420,
          border: "1px solid #eee",
          borderRadius: 12,
          padding: 10,
          background: "#fff",
        }}
      >
        <Line data={chartData} options={options} />
      </div>

      <p className="small" style={{ marginTop: 10, color: "#666" }}>
        Tip: Toggle buttons to compare commodities. Values fall back to demo
        series until your backend
        <code> /api/market/avg</code> is wired to USDA pricing.
      </p>
    </div>
  );
}
