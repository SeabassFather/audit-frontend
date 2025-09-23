import React, { useMemo, useState } from "react";

function Field({ label, value, onChange, type = "number", step = "any" }) {
  return (
    <label style={{ display: "grid", gap: 4, marginBottom: 8 }}>
      <span style={{ fontSize: 12, color: "var(--muted)" }}>{label}</span>
      <input
        type={type}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value || 0)}
        style={{
          padding: "8px",
          border: "1px solid var(--line)",
          borderRadius: "6px",
        }}
      />
    </label>
  );
}

function money(n) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function Tools() {
  // Payment calc
  const [p, setP] = useState(400000),
    [r, setR] = useState(6.75),
    [y, setY] = useState(30);
  const mPay = useMemo(() => {
    const i = r / 100 / 12,
      n = y * 12;
    return i ? (p * i) / (1 - Math.pow(1 + i, -n)) : p / n;
  }, [p, r, y]);

  // DSCR
  const [noi, setNoi] = useState(24000),
    [annualDebt, setAD] = useState(mPay * 12);
  const dscr = useMemo(
    () => (annualDebt ? noi / annualDebt : 0),
    [noi, annualDebt],
  );

  // Refi breakeven
  const [oldRate, setOld] = useState(7.25),
    [newRate, setNew] = useState(6.5),
    [costs, setCosts] = useState(4500);
  const oldP = useMemo(() => {
    const i = oldRate / 100 / 12,
      n = y * 12;
    return i ? (p * i) / (1 - Math.pow(1 + i, -n)) : p / n;
  }, [p, oldRate, y]);
  const newP = useMemo(() => {
    const i = newRate / 100 / 12,
      n = y * 12;
    return i ? (p * i) / (1 - Math.pow(1 + i, -n)) : p / n;
  }, [p, newRate, y]);
  const breakeven = useMemo(() => {
    const delta = Math.max(oldP - newP, 0.01);
    return Math.ceil(costs / delta);
  }, [oldP, newP, costs]);

  return (
    <div className="card" style={{ padding: 18 }}>
      <h2>Mortgage Tools</h2>
      <div className="grid" style={{ marginTop: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>
            Payment Calculator
          </div>
          <Field label="Principal ($)" value={p} onChange={setP} />
          <Field label="Rate (%)" value={r} onChange={setR} />
          <Field label="Years" value={y} onChange={setY} />
          <div
            style={{
              marginTop: 12,
              padding: 8,
              background: "#f8fafc",
              borderRadius: 6,
            }}
          >
            Monthly Payment: <strong>{money(mPay)}</strong>
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>
            DSCR Calculator
          </div>
          <Field label="NOI (annual $)" value={noi} onChange={setNoi} />
          <Field
            label="Debt Service (annual $)"
            value={annualDebt}
            onChange={setAD}
          />
          <div
            style={{
              marginTop: 12,
              padding: 8,
              background: "#f8fafc",
              borderRadius: 6,
            }}
          >
            DSCR: <strong>{dscr.toFixed(2)}</strong>
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>
            Refi Breakeven
          </div>
          <Field label="Old Rate (%)" value={oldRate} onChange={setOld} />
          <Field label="New Rate (%)" value={newRate} onChange={setNew} />
          <Field label="Closing Costs ($)" value={costs} onChange={setCosts} />
          <div
            style={{
              marginTop: 12,
              padding: 8,
              background: "#f8fafc",
              borderRadius: 6,
            }}
          >
            Breakeven: <strong>{breakeven}</strong> months
          </div>
        </div>
      </div>
    </div>
  );
}
