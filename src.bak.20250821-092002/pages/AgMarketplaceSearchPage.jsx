import React, { useState } from "react";
import { apiPost } from "../utils/api";

export default function AgMarketplaceSearchPage() {
  const [p, setP] = useState({
    commodity: "Tomatoes",
    certs: [],
    country: "MX",
    qty: "",
    priceTarget: "",
  });
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const upd = (k, v) => setP((prev) => ({ ...prev, [k]: v }));
  const toggle = (val) =>
    setP((prev) => {
      const s = new Set(prev.certs);
      s.has(val) ? s.delete(val) : s.add(val);
      return { ...prev, certs: [...s] };
    });
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setRes(null);
    try {
      const r = await apiPost("/api/ag/intake", p);
      setRes(r);
    } catch (ex) {
      setErr(String(ex));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="page-card">
        <h1>Ag Intake</h1>
        <form onSubmit={submit} className="row">
          <label>
            Commodity
            <input
              className="input"
              value={p.commodity}
              onChange={(e) => upd("commodity", e.target.value)}
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
            Quantity (pallets)
            <input
              className="input"
              value={p.qty}
              onChange={(e) => upd("qty", e.target.value)}
            />
          </label>
          <label>
            Price Target (USD)
            <input
              className="input"
              value={p.priceTarget}
              onChange={(e) => upd("priceTarget", e.target.value)}
            />
          </label>
          <div style={{ gridColumn: "1 / -1" }}>
            <div className="small">Certifications</div>
            {["USDA Organic", "GlobalG.A.P.", "PrimusGFS", "FDA"].map((x) => (
              <label key={x} style={{ marginRight: 12 }}>
                <input
                  type="checkbox"
                  checked={p.certs.includes(x)}
                  onChange={() => toggle(x)}
                />{" "}
                {x}
              </label>
            ))}
          </div>
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
    </div>
  );
}
