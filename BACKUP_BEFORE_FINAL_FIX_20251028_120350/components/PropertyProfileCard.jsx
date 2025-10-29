import React from "react";

export default function PropertyProfileCard({ property }) {
  return (
    <div style={{
      background: "#fef9c3",
      borderRadius: "12px",
      padding: "24px",
      margin: "24px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
    }}>
      <h2 style={{
        color: "#b45309",
        fontWeight: 700,
        marginBottom: 8,
        fontSize: "1.3rem"
      }}>
        Property Profile
      </h2>
      <p style={{
        color: "#854d0e",
        fontSize: "1rem"
      }}>
        (Stub) Tax and mortgage data would display here for: <strong>{property ? property.address : "Selected Property"}</strong>
      </p>
    </div>
  );
}