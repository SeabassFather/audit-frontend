import React from "react";
import EnginesPanel from "../components/EnginesPanel";

export default function Programs() {
  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="page-card">
        <h1>Programs</h1>
        <small className="muted">Select an engine below.</small>
      </div>
      <EnginesPanel />
    </div>
  );
}
