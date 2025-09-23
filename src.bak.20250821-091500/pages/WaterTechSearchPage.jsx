import React, { useState } from "react";
import { apiPost, apiNotify } from "../utils/api";
import UploadArea from "../components/UploadArea";

const COMMODITIES = [
  "Tomatoes",
  "Peppers",
  "Berries",
  "Leafy Greens",
  "Avocados",
  "Citrus",
  "Melons",
  "Grapes",
  "Corn",
  "Wheat",
  "Almonds",
  "Pistachios",
];
const IRRIGATION = [
  "Drip tape",
  "Micro-sprinkler",
  "Center pivot",
  "Furrow/Flood",
  "Pipes",
  "Sprinkler line",
];
const WATER_SOURCES = [
  "Well",
  "Surface (canal/river)",
  "Municipal",
  "Recycled/RO",
  "Blend",
];
const CHEMSETS = [
  "Chlorination",
  "Acids",
  "Fertilizers",
  "Herbicides",
  "Fungicides",
  "Biostimulants",
];

export default function WaterTechSearchPage() {
  const [p, setP] = useState({
    farm: "",
    contact: "",
    email: "",
    phone: "",
    country: "USA",
    region: "West",
    lat: "",
    lon: "",
    acreage: 100,
    waterUseAFY: "",
    waterSource: "Well",
    irrigation: "Drip tape",
    commodities: ["Tomatoes"],
    chemicals: [],
    notes: "",
  });
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const upd = (k, v) => setP((prev) => ({ ...prev, [k]: v }));
  const toggle = (k, val) =>
    setP((prev) => {
      const s = new Set(prev[k]);
      s.has(val) ? s.delete(val) : s.add(val);
      return { ...prev, [k]: [...s] };
    });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setRes(null);
    try {
      const r = await apiPost("/api/search/water-tech/profile", p);
      setRes(r);
      await apiNotify({
        topic: "water-tech-profile",
        channel: ["email", "sms"],
        meta: p,
      });
    } catch (e) {
      setErr(String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="page-card">
        <h1>Water Technology – Grower Intake</h1>
        <form onSubmit={submit} className="row">
          <label>
            Farm/Company
            <input
              className="input"
              value={p.farm}
              onChange={(e) => upd("farm", e.target.value)}
            />
          </label>
          <label>
            Contact
            <input
              className="input"
              value={p.contact}
              onChange={(e) => upd("contact", e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              className="input"
              value={p.email}
              onChange={(e) => upd("email", e.target.value)}
            />
          </label>
          <label>
            Phone
            <input
              className="input"
              value={p.phone}
              onChange={(e) => upd("phone", e.target.value)}
            />
          </label>
          <label>
            Country
            <input
              className="input"
              value={p.country}
              onChange={(e) => upd("country", e.target.value)}
            />
          </label>
          <label>
            Region/State
            <input
              className="input"
              value={p.region}
              onChange={(e) => upd("region", e.target.value)}
            />
          </label>
          <label>
            Latitude
            <input
              className="input"
              value={p.lat}
              onChange={(e) => upd("lat", e.target.value)}
            />
          </label>
          <label>
            Longitude
            <input
              className="input"
              value={p.lon}
              onChange={(e) => upd("lon", e.target.value)}
            />
          </label>
          <label>
            Acreage
            <input
              className="input"
              value={p.acreage}
              onChange={(e) => upd("acreage", Number(e.target.value) || 0)}
            />
          </label>
          <label>
            Annual Water Use (AFY)
            <input
              className="input"
              value={p.waterUseAFY}
              onChange={(e) => upd("waterUseAFY", e.target.value)}
            />
          </label>
          <label>
            Water Source
            <select
              className="select"
              value={p.waterSource}
              onChange={(e) => upd("waterSource", e.target.value)}
            >
              {WATER_SOURCES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Irrigation
            <select
              className="select"
              value={p.irrigation}
              onChange={(e) => upd("irrigation", e.target.value)}
            >
              {IRRIGATION.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <div>
            <div className="small">Commodities</div>
            {COMMODITIES.map((x) => (
              <label key={x} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  checked={p.commodities.includes(x)}
                  onChange={() => toggle("commodities", x)}
                />{" "}
                {x}
              </label>
            ))}
          </div>
          <div>
            <div className="small">Chemicals in Use</div>
            {CHEMSETS.map((x) => (
              <label key={x} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  checked={p.chemicals.includes(x)}
                  onChange={() => toggle("chemicals", x)}
                />{" "}
                {x}
              </label>
            ))}
          </div>
          <label style={{ gridColumn: "1 / -1" }}>
            Notes
            <textarea
              className="textarea"
              rows="3"
              value={p.notes}
              onChange={(e) => upd("notes", e.target.value)}
            />
          </label>
          <div>
            <button className="btn btn-accent" disabled={busy}>
              {busy ? "Submit..." : "Submit"}
            </button>
          </div>
        </form>
        {err && <div style={{ color: "#b00", marginTop: 8 }}>{err}</div>}
        {res && (
          <pre className="json" style={{ marginTop: 8 }}>
            {JSON.stringify(res, null, 2)}
          </pre>
        )}
      </div>

      <div className="grid grid-3">
        <UploadArea
          title="Upload: Water Lab (PDF/CSV)"
          to="/api/upload/water"
          accept=".pdf,.csv,.xlsx"
          extraFields={{ kind: "lab" }}
          notifyTopic="water-lab"
        />
        <UploadArea
          title="Upload: Soil/Tissue Tests"
          to="/api/upload/water"
          accept=".pdf,.csv,.xlsx"
          extraFields={{ kind: "soil-tissue" }}
          notifyTopic="water-soil-tissue"
        />
        <UploadArea
          title="Upload: System Schematics"
          to="/api/upload/water"
          accept=".pdf,.png,.jpg,.jpeg"
          extraFields={{ kind: "schematics" }}
          notifyTopic="water-schematics"
        />
      </div>
    </div>
  );
}
