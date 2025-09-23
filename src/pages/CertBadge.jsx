import React from "react";
export default function CertBadge({ type, valid }) {
  const color = valid ? "#2ecc40" : "#ff4136";
  return (
    <span
      style={{
        display: "inline-block",
        background: color,
        color: "#fff",
        borderRadius: "6px",
        padding: "0.3em 0.7em",
        margin: "0 0.5em",
        fontWeight: 600,
      }}
    >
      {type} {valid ? "Valid" : "Expired"}
    </span>
  );
}
