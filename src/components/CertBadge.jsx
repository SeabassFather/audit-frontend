import React from "react";
export default function CertBadge({ ok, name }) {
  return (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: 8,
        fontSize: 12,
        marginRight: 6,
        background: ok ? "#0b4" : "#333",
        color: ok ? "#fff" : "#bbb",
        border: "1px solid #1f1f1f",
      }}
    >
      {name}
      {ok ? " " : ""}
    </span>
  );
}
