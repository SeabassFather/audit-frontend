import React, { useState } from "react";
import SmartUpload from "../components/SmartUpload";

export default function PACALicense() {
  const [license, setLicense] = useState("");
  const [state, setState] = useState("");
  const [exp, setExp] = useState("");

  return (
    <div style={{ padding: "18px" }}>
      <h1 style={{ margin: "0 0 6px 0" }}>PACA License</h1>
      <p style={{ color: "#475569", margin: "0 0 16px 0" }}>
        Upload your current PACA license for verification. JPEG/PNG/PDF are
        accepted.
      </p>

      <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>License #</span>
          <input
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            placeholder="e.g., 2012-XXXXX"
            style={fieldStyle}
          />
        </label>
        <label style={{ display: "grid", gap: 4 }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>Issuing State</span>
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="CA, FL, TX"
            style={fieldStyle}
          />
        </label>
        <label style={{ display: "grid", gap: 4 }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>Expiration</span>
          <input
            type="date"
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            style={fieldStyle}
          />
        </label>

        <SmartUpload
          title="Upload PACA License"
          accept=".pdf,.png,.jpg,.jpeg"
          to="/api/upload/paca"
          extraFields={{
            license,
            state,
            expiration: exp,
            kind: "paca-license",
          }}
        />
      </div>
    </div>
  );
}
const fieldStyle = {
  padding: "10px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: 8,
};
