// src/App.jsx
import React from "react";

const data = [12, 18, 9, 22, 27, 19, 30, 26, 34, 29, 38, 41]; // demo points

function Sparkline({ points, width = 560, height = 160, pad = 16 }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const stepX = (width - pad * 2) / (points.length - 1);
  const scaleY = (v) =>
    height - pad - ((v - min) / (max - min || 1)) * (height - pad * 2);

  const d = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${pad + i * stepX} ${scaleY(v)}`)
    .join(" ");

  const lastX = pad + (points.length - 1) * stepX;
  const lastY = scaleY(points[points.length - 1]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="240">
      <defs>
        <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopOpacity="0.25" />
          <stop offset="100%" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width={width} height={height} rx="16" />

      <path d={d} fill="none" strokeWidth="3" />
      <path
        d={`${d} L ${lastX} ${height - pad} L ${pad} ${height - pad} Z`}
        fill="url(#fill)"
        stroke="none"
        opacity="0.6"
      />

      <circle cx={lastX} cy={lastY} r="5" />
      <text x={lastX - 6} y={lastY - 12} fontSize="12" fontWeight="600">
        {points[points.length - 1]}
      </text>

      <g opacity="0.2">
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1={pad}
            x2={width - pad}
            y1={pad + i * ((height - pad * 2) / 4)}
            y2={pad + i * ((height - pad * 2) / 4)}
          />
        ))}
      </g>
    </svg>
  );
}

export default function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: 24,
        maxWidth: 960,
        margin: "0 auto",
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0 }}>AuditDNA</h1>
        <span style={{ opacity: 0.7 }}>localhost:3000</span>
      </header>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ margin: "0 0 8px" }}>Performance (demo)</h2>
        <Sparkline points={data} />
      </section>
    </div>
  );
}
