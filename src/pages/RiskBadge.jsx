import React from "react";
export default function RiskBadge({ level }) {
  const colors = { Low: "#2ecc40", Med: "#ffdc00", High: "#ff4136" };
  return (
    <span
      style={{
        display: "inline-block",
        background: colors[level] || "#aaa",
        color: "#fff",
        borderRadius: "6px",
        padding: "0.3em 0.7em",
        fontWeight: 600,
      }}
    >
      {level} Risk
    </span>
  );
}
