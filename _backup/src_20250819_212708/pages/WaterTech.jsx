import React, { useState } from "react";
import { apiPost } from "../utils/api";
import UploadArea from "../components/UploadArea";

export default function WaterTech() {
  const [p, setP] = useState({
    farm: "",
    region: "West",
    waterSource: "Well",
    irrigation: "Drip",
    notes: "",
  });
  const [out, setOut] = useState(null);
  const [err, setErr] = useState("");
  const go = async (e) => {
    e.preventDefault();
    setErr("");
    setOut(null);
    try {
      setOut(await apiPost("/api/search/water-tech/profile", p));
    } catch (ex) {
      setErr(String(ex));
    }
  };

  return (
    <section>
      <div className="badge">Water Tech</div>
      <h1 className="h1">Grower Intake</h1>
      <form onSubmit={go} className="grid grid-2">
        <input
          className="input"
          placeholder="Farm/Company"
          value={p.farm}
          onChange={(e) => setP({ ...p, farm: e.target.value })}
        />
        <input
          className="input"
          placeholder="Region/State"
          value={p.region}
          onChange={(e) => setP({ ...p, region: e.target.value })}
        />
        <input
          className="input"
          placeholder="Water Source"
          value={p.waterSource}
          onChange={(e) => setP({ ...p, waterSource: e.target.value })}
        />
        <input
          className="input"
          placeholder="Irrigation"
          value={p.irrigation}
          onChange={(e) => setP({ ...p, irrigation: e.target.value })}
        />
        <textarea
          className="textarea"
          placeholder="Notes"
          value={p.notes}
          onChange={(e) => setP({ ...p, notes: e.target.value })}
        />
        <div className="toolbar">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>

      <div className="grid grid-3" style={{ marginTop: 14 }}>
        <UploadArea title="Water Lab" accept=".pdf,.csv,.xlsx" />
        <UploadArea title="Soil / Tissue" accept=".pdf,.csv,.xlsx" />
        <UploadArea title="Schematics" accept=".pdf,.jpg,.png" />
      </div>

      {err && <div style={{ color: "#b00020", marginTop: 10 }}>{err}</div>}
      {out && (
        <pre className="card" style={{ marginTop: 12, overflow: "auto" }}>
          {JSON.stringify(out, null, 2)}
        </pre>
      )}
    </section>
  );
}
