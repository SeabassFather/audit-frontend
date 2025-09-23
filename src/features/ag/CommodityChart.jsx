import React from "react";
export default function CommodityChart({ title, unit = "$/lb", weeks = [], series = [] }) {
  const dims = { w: 960, h: 360, pad: 48 };
  const flat = series.flatMap((s) => s.values).filter((v) => Number.isFinite(v));
  const yMin = Math.max(0, Math.min(...flat) - 0.2);
  const yMax = Math.max(...flat, 1) + 0.2;
  const x = (i) => {
    const n = weeks.length;
    if (n <= 1) return dims.pad;
    return dims.pad + (i * (dims.w - 2 * dims.pad)) / (n - 1);
  };
  const y = (val) => dims.h - dims.pad - ((val - yMin) / (yMax - yMin || 1)) * (dims.h - 2 * dims.pad);
  const xTicks = [];
  for (let i = 0; i < weeks.length; i++) if (i % 5 === 0 || i === weeks.length - 1) xTicks.push({ i, w: weeks[i] });
  return (
    <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 16 }}>
      <div style={{ padding: 16, display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>{unit}</div>
      </div>
      <svg viewBox={`0 0 ${dims.w} ${dims.h}`} width="100%" height="auto" role="img">
        <line x1={dims.pad} y1={dims.h - dims.pad} x2={dims.w - dims.pad} y2={dims.h - dims.pad} stroke="#e5e7eb" />
        <line x1={dims.pad} y1={dims.pad} x2={dims.pad} y2={dims.h - dims.pad} stroke="#e5e7eb" />
        {niceTicks(yMin, yMax, 6).map((t) => (
          <g key={`y-${t}`}>
            <line x1={dims.pad} y1={y(t)} x2={dims.w - dims.pad} y2={y(t)} stroke="#f3f4f6" />
            <text x={dims.pad - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize="10">{t.toFixed(1)}</text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text key={`x-${t.i}`} x={x(t.i)} y={dims.h - dims.pad + 14} textAnchor="middle" fontSize="10">W{t.w}</text>
        ))}
        {series.map((s, idx) => {
          const pts = s.values.map((v, i) => [x(i), y(v)]).filter(([, yy]) => Number.isFinite(yy));
          const path = pts.map(([xx, yy], i) => (i === 0 ? `M ${xx} ${yy}` : `L ${xx} ${yy}`)).join(" ");
          const stroke = s.thick ? "#111" : palette(idx);
          const sw = s.thick ? 3 : 1.6;
          const dash = s.dashed ? "5,5" : "0";
          return <path key={s.name} d={path} fill="none" stroke={stroke} strokeWidth={sw} strokeDasharray={dash} opacity={s.thick ? 1 : 0.9} />;
        })}
        <Legend series={series} x={dims.pad} y={dims.pad - 12} />
      </svg>
    </div>
  );
}
function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = Math.pow(10, Math.floor(Math.log10(span / count)));
  const err = (span / count) / step;
  const mult = err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1;
  const niceStep = mult * step;
  const niceMin = Math.floor(min / niceStep) * niceStep;
  const niceMax = Math.ceil(max / niceStep) * niceStep;
  const out = [];
  for (let v = niceMin; v <= niceMax + 1e-9; v += niceStep) out.push(v);
  return out;
}
function palette(i) { const base = ["#2563eb", "#16a34a", "#ea580c", "#9333ea", "#dc2626"]; return base[i % base.length]; }
function Legend({ series, x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {series.map((s, i) => (
        <g key={s.name} transform={`translate(${i * 120},0)`}>
          <rect width="10" height="10" y="-10" fill={s.thick ? "#111" : palette(i)} />
          <text x="14" y="-2" fontSize="10">{s.name}</text>
        </g>
      ))}
    </g>
  );
}