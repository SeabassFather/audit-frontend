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
];

export default function TradeFinancePage() {
  const [p, setP] = useState({
    company: "",
    country: "",
    duns: "",
    usBuyer: "",
    commodity: "Tomatoes",
    amount: 50000,
    tenor: "60 days",
    facility: "Factoring",
    exportTo: "USA",
    certifications: [],
    notes: "",
  });
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const upd = (k, v) => setP((prev) => ({ ...prev, [k]: v }));
  const toggle = (val) =>
    setP((prev) => {
      const s = new Set(prev.certifications);
      s.has(val) ? s.delete(val) : s.add(val);
      return { ...prev, certifications: [...s] };
    });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setRes(null);
    try {
      const r = await apiPost("/api/search/trade-finance", p);
      setRes(r);
      await apiNotify({
        topic: "trade-finance-intake",
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
        <h1>Trade Finance – Factoring & PO</h1>
        <form onSubmit={submit} className="row">
          <label>
            Company
            <input
              className="input"
              value={p.company}
              onChange={(e) => upd("company", e.target.value)}
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
            DUNS
            <input
              className="input"
              value={p.duns}
              onChange={(e) => upd("duns", e.target.value)}
            />
          </label>
          <label>
            US Buyer
            <input
              className="input"
              value={p.usBuyer}
              onChange={(e) => upd("usBuyer", e.target.value)}
            />
          </label>
          <label>
            Commodity
            <select
              className="select"
              value={p.commodity}
              onChange={(e) => upd("commodity", e.target.value)}
            >
              {COMMODITIES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Amount (USD)
            <input
              className="input"
              value={p.amount}
              onChange={(e) => upd("amount", Number(e.target.value) || 0)}
            />
          </label>
          <label>
            Tenor
            <select
              className="select"
              value={p.tenor}
              onChange={(e) => upd("tenor", e.target.value)}
            >
              <option>30 days</option>
              <option>45 days</option>
              <option>60 days</option>
              <option>90 days</option>
              <option>120 days</option>
            </select>
          </label>
          <label>
            Facility
            <input
              className="input"
              value={p.facility}
              onChange={(e) => upd("facility", e.target.value)}
            />
          </label>
          <label>
            Export To
            <input
              className="input"
              value={p.exportTo}
              onChange={(e) => upd("exportTo", e.target.value)}
            />
          </label>
          <div>
            <div className="small">Certifications</div>
            {["USDA Organic", "FDA", "GlobalG.A.P.", "PrimusGFS"].map((x) => (
              <label key={x} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  checked={p.certifications.includes(x)}
                  onChange={() => toggle(x)}
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
              {busy ? "Evaluate..." : "Evaluate"}
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
          title="Upload: Purchase Orders"
          to="/api/upload/trade"
          extraFields={{ kind: "po" }}
          notifyTopic="trade-po"
        />
        <UploadArea
          title="Upload: Invoices"
          to="/api/upload/trade"
          extraFields={{ kind: "invoices" }}
          notifyTopic="trade-invoices"
        />
        <UploadArea
          title="Upload: Shipping Docs (BOL/POD)"
          to="/api/upload/trade"
          extraFields={{ kind: "shipping" }}
          notifyTopic="trade-shipping"
        />
      </div>
    </div>
  );
}
