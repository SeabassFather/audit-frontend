import React from "react";
export default function RiskBadge({ score = 50 }) {
  const label = score >= 75 ? "Low" : score >= 50 ? "Medium" : "High";
  const bg = score >= 75 ? "#063" : score >= 50 ? "#6a4" : "#933";
  const fg = "#fff";
  return (
    <span
      style={{
        background: bg,
        color: fg,
        padding: "2px 8px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {label}
    </span>
  );
}
