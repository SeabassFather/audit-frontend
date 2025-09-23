import React, { useState } from "react";
import { searchMortgages } from "../../utils/mortgageSearchAPI";
import FileUpload from "../../components/FileUpload";
function ltvCalc(v, l) {
  const V = Number(v || 0),
    L = Number(l || 0);
  return V > 0 ? Math.round((L / V) * 1000) / 10 : 0;
}

export default function MortgageLeadForm() {
  const [b, setB] = useState({
    name: "",
    email: "",
    phone: "",
    nmlsConsent: false,
    softPull: false,
  });
  const [p, setP] = useState({
    address: "",
    type: "Single Family",
    occupancy: "owner",
    purpose: "purchase",
    purchasePrice: "",
    estValue: "",
  });
  const [f, setF] = useState({
    credit: "720-759",
    dti: "",
    income: "",
    assets: "",
    loanAmount: "",
    product: "Conventional",
  });
  const [t, setT] = useState({ closeTarget: "", lockPref: "no" });
  const [files, setFiles] = useState([]);
  const [out, setOut] = useState(null);
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

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
        borrower: b,
        property: p,
        financial: { ...f, dti: f.dti, ltv: ltvCalc(p.estValue, f.loanAmount) },
        timing: t,
        docs: files.map((x) => ({ name: x.name, size: x.size, type: x.type })),
      };
      const data = await searchMortgages(payload);
      setOut(data);
    } catch (ex) {
      setErr(ex?.response?.data || ex.message);
    } finally {
      setBusy(false);
    }
  };

  const grid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
  const i = {
    padding: "10px 12px",
    background: "#111",
    color: "#eee",
    border: "1px solid #333",
    borderRadius: 8,
  };

  return (
    <form
      onSubmit={submit}
      style={{ maxWidth: 980, margin: "24px auto", padding: "0 12px" }}
    >
      <h1>Mortgage Loan Search</h1>
      <p style={{ opacity: 0.7, fontSize: 12, margin: "4px 0 16px" }}>
        POST /api/search/mortgages loanMatcher
      </p>

      <section style={grid}>
        <div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>Borrower</div>
          <input
            name="name"
            placeholder="Name"
            value={b.name}
            onChange={change(setB)}
            style={i}
          />
          <input
            name="email"
            placeholder="Email"
            value={b.email}
            onChange={change(setB)}
            style={i}
          />
          <input
            name="phone"
            placeholder="Phone"
            value={b.phone}
            onChange={change(setB)}
            style={i}
          />
          <label style={{ display: "block", marginTop: 6 }}>
            <input
              type="checkbox"
              name="nmlsConsent"
              checked={b.nmlsConsent}
              onChange={change(setB)}
            />{" "}
            NMLS consent
          </label>
          <label style={{ display: "block" }}>
            <input
              type="checkbox"
              name="softPull"
              checked={b.softPull}
              onChange={change(setB)}
            />{" "}
            Soft-pull consent
          </label>
        </div>

        <div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>Property</div>
          <input
            name="address"
            placeholder="Address"
            value={p.address}
            onChange={change(setP)}
            style={i}
          />
          <select name="type" value={p.type} onChange={change(setP)} style={i}>
            <option>Single Family</option>
            <option>Condo</option>
            <option>Townhome</option>
            <option>2-4 Unit</option>
          </select>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <label>
              <input
                type="radio"
                name="occupancy"
                value="owner"
                checked={p.occupancy === "owner"}
                onChange={change(setP)}
              />{" "}
              Owner
            </label>
            <label>
              <input
                type="radio"
                name="occupancy"
                value="second"
                checked={p.occupancy === "second"}
                onChange={change(setP)}
              />{" "}
              Second
            </label>
            <label>
              <input
                type="radio"
                name="occupancy"
                value="investment"
                checked={p.occupancy === "investment"}
                onChange={change(setP)}
              />{" "}
              Investment
            </label>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <label>
              <input
                type="radio"
                name="purpose"
                value="purchase"
                checked={p.purpose === "purchase"}
                onChange={change(setP)}
              />{" "}
              Purchase
            </label>
            <label>
              <input
                type="radio"
                name="purpose"
                value="refi"
                checked={p.purpose === "refi"}
                onChange={change(setP)}
              />{" "}
              Refi
            </label>
          </div>
          <input
            name="purchasePrice"
            placeholder="Purchase Price $"
            value={p.purchasePrice}
            onChange={change(setP)}
            style={i}
          />
          <input
            name="estValue"
            placeholder="Est. Value $"
            value={p.estValue}
            onChange={change(setP)}
            style={i}
          />
        </div>
      </section>

      <section style={{ ...grid, marginTop: 16 }}>
        <div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>Financial</div>
          <select
            name="credit"
            value={f.credit}
            onChange={change(setF)}
            style={i}
          >
            <option>760+</option>
            <option>720-759</option>
            <option>680-719</option>
            <option>640-679</option>
            <option>580-639</option>
            <option>&lt;580</option>
          </select>
          <input
            name="dti"
            placeholder="DTI %"
            value={f.dti}
            onChange={change(setF)}
            style={i}
          />
          <input
            name="income"
            placeholder="Income $"
            value={f.income}
            onChange={change(setF)}
            style={i}
          />
          <input
            name="assets"
            placeholder="Assets $"
            value={f.assets}
            onChange={change(setF)}
            style={i}
          />
          <input
            name="loanAmount"
            placeholder="Loan Amount $"
            value={f.loanAmount}
            onChange={change(setF)}
            style={i}
          />
          <select
            name="product"
            value={f.product}
            onChange={change(setF)}
            style={i}
          >
            <option>Conventional</option>
            <option>FHA</option>
            <option>VA</option>
            <option>USDA</option>
            <option>Jumbo</option>
          </select>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            Computed LTV: <b>{ltvCalc(p.estValue, f.loanAmount)}%</b>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>Timing</div>
          <input
            type="date"
            name="closeTarget"
            value={t.closeTarget}
            onChange={change(setT)}
            style={i}
          />
          <select
            name="lockPref"
            value={t.lockPref}
            onChange={change(setT)}
            style={i}
          >
            <option value="no">No Lock Preference</option>
            <option value="30">Lock 30</option>
            <option value="45">Lock 45</option>
            <option value="60">Lock 60</option>
          </select>
          <FileUpload
            label="Optional Docs (W-2/1099, paystubs, IDs)"
            onFiles={setFiles}
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
        {busy ? "Submitting" : "Search / Match"}
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
