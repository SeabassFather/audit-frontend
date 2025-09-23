import React, { useState } from "react";
import { searchTradeFinance } from "../../utils/tradeFinanceAPI";
import FileUpload from "../../components/FileUpload";

export default function TradeFinanceForm() {
  const [biz, setBiz] = useState({
    legal: "",
    duns: "",
    country: "US",
    revenue: "",
    arAging: "",
  });
  const [facility, setFacility] = useState({ factoring: true, po: false });
  const [inv, setInv] = useState({
    amount: "",
    currency: "USD",
    debtor: "",
    terms: "Net 30",
    recurrence: "One-off",
    season: "",
  });
  const [coll, setColl] = useState({
    collateral: "",
    shipping: "",
    insurance: "",
  });
  const [commit, setCommit] = useState("30");
  const [regions, setRegions] = useState({ mx: false, ca: false, sa: false });
  const [uploads, setUploads] = useState([]);
  const [out, setOut] = useState(null),
    [err, setErr] = useState(null),
    [busy, setBusy] = useState(false);

  const change = (setter) => (e) => {
    const { name, type, checked, value } = e.target;
    setter((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setOut(null);
    try {
      const payload = {
        business: biz,
        facility,
        invoice: inv,
        collateral: coll,
        commitment: commit,
        uploads: uploads.map((f) => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
        regions,
      };
      const data = await searchTradeFinance(payload);
      setOut(data);
    } catch (ex) {
      setErr(ex?.response?.data || ex.message);
    } finally {
      setBusy(false);
    }
  };

  const i = {
    padding: "10px 12px",
    background: "#111",
    color: "#eee",
    border: "1px solid #333",
    borderRadius: 8,
  };
  const grid3 = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12,
  };

  return (
    <form
      onSubmit={submit}
      style={{ maxWidth: 980, margin: "24px auto", padding: "0 12px" }}
    >
      <h1>Trade Finance Search</h1>
      <p style={{ opacity: 0.7, fontSize: 12, margin: "4px 0 16px" }}>
        POST /api/search/trade-finance
      </p>

      <section style={grid3}>
        <div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>Business</div>
          <input
            name="legal"
            placeholder="Legal name"
            value={biz.legal}
            onChange={change(setBiz)}
            style={i}
          />
          <input
            name="duns"
            placeholder="DUNS"
            value={biz.duns}
            onChange={change(setBiz)}
            style={i}
          />
          <input
            name="country"
            placeholder="Country"
            value={biz.country}
            onChange={change(setBiz)}
            style={i}
          />
          <input
            name="revenue"
            placeholder="Annual revenue $"
            value={biz.revenue}
            onChange={change(setBiz)}
            style={i}
          />
          <input
            name="arAging"
            placeholder="AR aging summary"
            value={biz.arAging}
            onChange={change(setBiz)}
            style={i}
          />
          <div style={{ marginTop: 6 }}>
            <label>
              <input
                type="checkbox"
                name="factoring"
                checked={facility.factoring}
                onChange={change(setFacility)}
              />{" "}
              Factoring
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="po"
                checked={facility.po}
                onChange={change(setFacility)}
              />{" "}
              PO Financing
            </label>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>Invoice / PO</div>
          <input
            name="amount"
            placeholder="Amount"
            value={inv.amount}
            onChange={change(setInv)}
            style={i}
          />
          <input
            name="currency"
            placeholder="Currency (USD/MXN)"
            value={inv.currency}
            onChange={change(setInv)}
            style={i}
          />
          <input
            name="debtor"
            placeholder="Debtor/buyer"
            value={inv.debtor}
            onChange={change(setInv)}
            style={i}
          />
          <input
            name="terms"
            placeholder="Terms (Net 30/45/60/90)"
            value={inv.terms}
            onChange={change(setInv)}
            style={i}
          />
          <input
            name="recurrence"
            placeholder="Recurrence (monthly/one-off)"
            value={inv.recurrence}
            onChange={change(setInv)}
            style={i}
          />
          <input
            name="season"
            placeholder="Season (if seasonal)"
            value={inv.season}
            onChange={change(setInv)}
            style={i}
          />
        </div>

        <div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>
            Collateral & Regions
          </div>
          <input
            name="collateral"
            placeholder="Inventory/crop"
            value={coll.collateral}
            onChange={change(setColl)}
            style={i}
          />
          <input
            name="shipping"
            placeholder="Shipping terms"
            value={coll.shipping}
            onChange={change(setColl)}
            style={i}
          />
          <input
            name="insurance"
            placeholder="Insurance"
            value={coll.insurance}
            onChange={change(setColl)}
            style={i}
          />
          <div style={{ marginTop: 6 }}>
            <label>Commitment</label>
            <select
              value={commit}
              onChange={(e) => setCommit(e.target.value)}
              style={i}
            >
              <option>30</option>
              <option>60</option>
              <option>90</option>
              <option>120</option>
              <option>Seasonal</option>
            </select>
          </div>
          <div style={{ marginTop: 6 }}>
            Regions:&nbsp;
            <label>
              <input
                type="checkbox"
                name="mx"
                checked={regions.mx}
                onChange={change(setRegions)}
              />{" "}
              MX
            </label>
            &nbsp;
            <label>
              <input
                type="checkbox"
                name="ca"
                checked={regions.ca}
                onChange={change(setRegions)}
              />{" "}
              Central Am.
            </label>
            &nbsp;
            <label>
              <input
                type="checkbox"
                name="sa"
                checked={regions.sa}
                onChange={change(setRegions)}
              />{" "}
              South Am.
            </label>
          </div>
          <FileUpload
            label="Upload PO/Invoice/MSA/Insurance"
            onFiles={setUploads}
          />
        </div>
      </section>

      <button
        disabled={busy}
        style={{
          marginTop: 18,
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #2a2a2a",
          background: "#1a1a1a",
          color: "#eee",
        }}
      >
        {busy ? "Submitting" : "Find Facilities / Matches"}
      </button>

      {err ? (
        <div style={{ color: "#f66", marginTop: 12 }}>{String(err)}</div>
      ) : null}
      {out ? (
        <pre
          style={{
            marginTop: 12,
            fontSize: 12,
            background: "#111",
            border: "1px solid #333",
            borderRadius: 8,
            padding: 12,
          }}
        >
          {JSON.stringify(out, null, 2)}
        </pre>
      ) : null}
    </form>
  );
}
