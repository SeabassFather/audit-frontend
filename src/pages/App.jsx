import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", background: "#181e2f", minHeight: "100vh" }}>
      <Sidebar onSelectService={(cat, subCat, svc) => setSelected({ cat, subCat, svc })} />
      <main style={{
        flex: 1,
        minHeight: "100vh",
        padding: "3rem 2.5rem",
        background: "#232d44",
        color: "#fff",
        fontFamily: "Inter, Arial, sans-serif",
      }}>
        <h1 style={{
          fontSize: "2.2rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "#0077c7",
          marginBottom: "1.2rem",
        }}>
          AuditDNA Dashboard
        </h1>
        {!selected ? (
          <div style={{
            marginTop: "2.5rem",
            color: "#b8c5d1",
            fontSize: "1.2rem",
            fontWeight: 500,
          }}>
            Select a service from the sidebar to view details.
          </div>
        ) : (
          <div style={{
            marginTop: "2.2rem",
            background: "#181e2f",
            borderRadius: "1.3rem",
            boxShadow: "0 4px 18px #0077c712",
            padding: "1.8rem 2rem",
            maxWidth: "500px",
          }}>
            <h2 style={{ fontSize: "1.15rem", color: "#FFD600", fontWeight: 700 }}>
              {selected.cat.label}: {selected.svc}
            </h2>
            <p style={{ marginTop: "1rem", color: "#b8c5d1" }}>
              Service details and workflow for <span style={{ color: "#0077c7" }}>{selected.svc}</span> will appear here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}