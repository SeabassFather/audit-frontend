import React, { useState } from "react";
import { apiPost, apiNotify } from "../utils/api";
import UploadArea from "../components/UploadArea";

const LOAN_TYPES = [
  "Conventional",
  "FHA",
  "VA",
  "USDA",
  "Non-QM",
  "HELOC",
  "DSCR",
  "Bank Statement",
  "Fix & Flip",
  "Construction",
  "Commercial",
];
const PROP_TYPES = [
  "SFR",
  "Condo",
  "Townhome",
  "2-4 Units",
  "Multi-Family",
  "Mixed-Use",
  "Commercial",
];
const OCC = ["Primary", "Second Home", "Investment"];

export default function MortgageSearchPage() {
  const [p, setP] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "Conventional",
    propertyType: "SFR",
    occupancy: "Primary",
    state: "CA",
    loanAmount: 400000,
    fico: 720,
    dti: 40,
    ltv: 80,
    incomeType: "W2",
    selfEmployed: false,
    notes: "",
    liveRep: false,
  });
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const upd = (k, v) => setP((prev) => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setRes(null);
    try {
      const r = await apiPost("/api/search/mortgages", p);
      setRes(r);
      await apiNotify({
        topic: "mortgage-intake",
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
        <h1>Mortgage – Inquiry & Match</h1>
        <form onSubmit={submit} className="row">
          <label>
            Name
            <input
              className="input"
              value={p.name}
              onChange={(e) => upd("name", e.target.value)}
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
            Loan Type
            <select
              className="select"
              value={p.loanType}
              onChange={(e) => upd("loanType", e.target.value)}
            >
              {LOAN_TYPES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Property Type
            <select
              className="select"
              value={p.propertyType}
              onChange={(e) => upd("propertyType", e.target.value)}
            >
              {PROP_TYPES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Occupancy
            <select
              className="select"
              value={p.occupancy}
              onChange={(e) => upd("occupancy", e.target.value)}
            >
              {OCC.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            State
            <input
              className="input"
              value={p.state}
              onChange={(e) => upd("state", e.target.value)}
            />
          </label>
          <label>
            Loan Amount
            <input
              className="input"
              value={p.loanAmount}
              onChange={(e) => upd("loanAmount", Number(e.target.value) || 0)}
            />
          </label>
          <label>
            FICO
            <input
              className="input"
              value={p.fico}
              onChange={(e) => upd("fico", Number(e.target.value) || 0)}
            />
          </label>
          <label>
            DTI %
            <input
              className="input"
              value={p.dti}
              onChange={(e) => upd("dti", Number(e.target.value) || 0)}
            />
          </label>
          <label>
            LTV %
            <input
              className="input"
              value={p.ltv}
              onChange={(e) => upd("ltv", Number(e.target.value) || 0)}
            />
          </label>
          <label>
            Income Type
            <input
              className="input"
              value={p.incomeType}
              onChange={(e) => upd("incomeType", e.target.value)}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={p.selfEmployed}
              onChange={(e) => upd("selfEmployed", e.target.checked)}
            />{" "}
            Self-Employed
          </label>
          <label style={{ gridColumn: "1 / -1" }}>
            Scenario / Notes
            <textarea
              className="textarea"
              rows="3"
              value={p.notes}
              onChange={(e) => upd("notes", e.target.value)}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={p.liveRep}
              onChange={(e) => upd("liveRep", e.target.checked)}
            />{" "}
            Request live rep
          </label>
          <div>
            <button className="btn btn-accent" disabled={busy}>
              {busy ? "Match..." : "Match Lenders"}
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
          title="Upload: ID & Income (W2/Paystubs/Bank)"
          to="/api/upload/mortgage"
          extraFields={{ kind: "id-income" }}
          notifyTopic="mortgage-id-income"
        />
        <UploadArea
          title="Upload: Credit/LOE/Other Docs"
          to="/api/upload/mortgage"
          extraFields={{ kind: "loe-other" }}
          notifyTopic="mortgage-other"
        />
        <UploadArea
          title="Upload: Purchase Contract/Appraisal"
          to="/api/upload/mortgage"
          extraFields={{ kind: "contract-appraisal" }}
          notifyTopic="mortgage-contract"
        />
      </div>
    </div>
  );
}
