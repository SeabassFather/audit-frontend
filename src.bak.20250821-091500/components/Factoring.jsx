import React, { useMemo, useState } from "react";
export default function Factoring() {
  const [f, setF] = useState({
    invoice: 250000,
    advancePct: 85,
    discountPct: 2.5,
    termDays: 45,
    reservePct: 10,
  });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const advance = useMemo(() => f.invoice * (f.advancePct / 100), [f]);
  const reserve = useMemo(() => f.invoice * (f.reservePct / 100), [f]);
  const fee = useMemo(
    () => f.invoice * (f.discountPct / 100) * (f.termDays / 30),
    [f],
  );
  const netInitial = useMemo(() => advance - fee, [advance, fee]);
  const netTotal = useMemo(() => netInitial + reserve, [netInitial, reserve]);
  const effApr = useMemo(() => {
    const cost = fee;
    const days = Math.max(1, f.termDays);
    const rate = cost / Math.max(1, advance);
    return rate * (365 / days) * 100;
  }, [fee, advance, f.termDays]);
  return (
    <section className="panel">
      <h2>Receivables Factoring</h2>
      <div className="mortGrid">
        <label>
          Invoice Amount (USD)
          <input
            type="number"
            value={f.invoice}
            onChange={(e) => set("invoice", +e.target.value || 0)}
          />
        </label>
        <label>
          Advance Rate (%)
          <input
            type="number"
            step="0.1"
            value={f.advancePct}
            onChange={(e) => set("advancePct", +e.target.value || 0)}
          />
        </label>
        <label>
          Discount Rate (% / 30d)
          <input
            type="number"
            step="0.01"
            value={f.discountPct}
            onChange={(e) => set("discountPct", +e.target.value || 0)}
          />
        </label>
        <label>
          Term (days)
          <input
            type="number"
            value={f.termDays}
            onChange={(e) => set("termDays", +e.target.value || 0)}
          />
        </label>
        <label>
          Reserve (%)
          <input
            type="number"
            step="0.1"
            value={f.reservePct}
            onChange={(e) => set("reservePct", +e.target.value || 0)}
          />
        </label>
      </div>
      <div className="tableWrap">
        <table className="tbl">
          <tbody>
            <tr>
              <th>Advance</th>
              <td>${advance.toLocaleString()}</td>
              <th>Fee</th>
              <td>${fee.toLocaleString()}</td>
            </tr>
            <tr>
              <th>Reserve (held)</th>
              <td>${reserve.toLocaleString()}</td>
              <th>Initial Wire</th>
              <td>${netInitial.toLocaleString()}</td>
            </tr>
            <tr>
              <th>Release @ Pay</th>
              <td>${reserve.toLocaleString()}</td>
              <th>Total Received</th>
              <td>${netTotal.toLocaleString()}</td>
            </tr>
            <tr>
              <th>Effective APR</th>
              <td colspan="3">{effApr.toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mut">
        Calculator uses simple discount on face per 30 days with pro-rata for
        term; APR based on advance as capital at risk.
      </p>
    </section>
  );
}
