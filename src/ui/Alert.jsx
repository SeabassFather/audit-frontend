import React from "react";
export default function Alert({ kind = "error", children }) {
  const color = kind === "error" ? "#b91c1c" : "#065f46";
  const bg = kind === "error" ? "#fee2e2" : "#d1fae5";
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${bg}`,
        borderRadius: 10,
        padding: "10px 12px",
        color,
      }}
    >
      {children}
    </div>
  );
}
