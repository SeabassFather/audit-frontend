import React from "react";
export default function Field({ label, hint, children }) {
  return (
    <div>
      {label && <label>{label}</label>}
      {children}
      {hint && (
        <div className="small-muted" style={{ marginTop: 6 }}>
          {hint}
        </div>
      )}
    </div>
  );
}
