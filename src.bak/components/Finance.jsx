import React, { useMemo, useState } from "react";
export default function Finance() {
  const [amt, setAmt] = useState(250000),
    [rate, setRate] = useState(2.25),
    [days, setDays] = useState(45);
  const fee = useMemo(
    () => +(amt * (rate / 100) * (days / 30)).toFixed(2),
    [amt, rate, days],
  );
  return (
    <div className="page">
      <h2>Factoring & PO Financing</h2>
      <div className="grid2">
        <div className="card glass">
          <h3>Quick Calculator</h3>
          <div className="grid2 s">
            <input
              type="number"
              value={amt}
              onChange={(e) => setAmt(+e.target.value || 0)}
              placeholder="Advance Amount (USD)"
            />
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(+e.target.value || 0)}
              placeholder="Rate % per 30d"
            />
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(+e.target.value || 0)}
              placeholder="Days Outstanding"
            />
          </div>
          <div className="mut" style={{ marginTop: 8 }}>
            Estimated Fee
          </div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>
            ${fee.toLocaleString()}
          </div>
        </div>
        <div className="card glass">
          <h3>Request Financing</h3>
          <div className="grid2 s">
            <input placeholder="Company" />
            <input placeholder="Contact Email" />
            <input placeholder="PO / Invoice #" />
            <input placeholder="Buyer Name" />
            <input placeholder="Amount (USD)" />
            <input placeholder="Expected Pay Date" />
          </div>
          <div className="inline">
            <input type="file" />
            <button className="btn">Submit Package</button>
          </div>
        </div>
      </div>
    </div>
  );
}
