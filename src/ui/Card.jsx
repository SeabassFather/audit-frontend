import React from "react";
export default function Card({ title, extra, children }) {
  return (
    <div className="card">
      {(title || extra) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 800 }}>{title}</div>
          <div>{extra}</div>
        </div>
      )}
      {children}
    </div>
  );
}
