import React, { useMemo, useState } from "react";
export default function WaterTech() {
  const [f, setF] = useState({
    baseline: 120000,
    current: 90000,
    price: 0.004,
    projectCost: 85000,
    incentive: 15000,
    horizon: 5,
  });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const dailySave = useMemo(
    () => Math.max(0, f.baseline - f.current),
    [f.baseline, f.current],
  );
  const annualSave$ = useMemo(
    () => dailySave * 365 * f.price,
    [dailySave, f.price],
  );
  const netCost = useMemo(
    () => Math.max(0, f.projectCost - f.incentive),
    [f.projectCost, f.incentive],
  );
  const paybackMonths = useMemo(
    () => (annualSave$ > 0 ? (netCost / annualSave$) * 12 : Infinity),
    [netCost, annualSave$],
  );
  const roi = useMemo(
    () => (annualSave$ > 0 ? (annualSave$ / netCost) * 100 : 0),
    [annualSave$, netCost],
  );
  return (
    <section className="panel">
      <h2>Water Tech Savings & ROI</h2>
      <div className="mortGrid">
        <label>
          Baseline Use (gal/day)
          <input
            type="number"
            value={f.baseline}
            onChange={(e) => set("baseline", +e.target.value || 0)}
          />
        </label>
        <label>
          Current Use (gal/day)
          <input
            type="number"
            value={f.current}
            onChange={(e) => set("current", +e.target.value || 0)}
          />
        </label>
        <label>
          Water Price ($/gal)
          <input
            type="number"
            step="0.0001"
            value={f.price}
            onChange={(e) => set("price", +e.target.value || 0)}
          />
        </label>
        <label>
          Project Cost (USD)
          <input
            type="number"
            value={f.projectCost}
            onChange={(e) => set("projectCost", +e.target.value || 0)}
          />
        </label>
        <label>
          Rebate/Incentive (USD)
          <input
            type="number"
            value={f.incentive}
            onChange={(e) => set("incentive", +e.target.value || 0)}
          />
        </label>
        <label>
          Horizon (yrs)
          <input
            type="number"
            value={f.horizon}
            onChange={(e) => set("horizon", +e.target.value || 0)}
          />
        </label>
      </div>
      <div className="statRow">
        <div className="stat">
          <div className="statVal">{dailySave.toLocaleString()}</div>
          <div className="statLbl">Daily gallons saved</div>
        </div>
        <div className="stat">
          <div className="statVal">${annualSave$.toFixed(0)}</div>
          <div className="statLbl">Annual savings</div>
        </div>
        <div className="stat">
          <div className="statVal">
            {isFinite(paybackMonths) ? paybackMonths.toFixed(1) : ""} mo
          </div>
          <div className="statLbl">Payback</div>
        </div>
        <div className="stat">
          <div className="statVal">{roi.toFixed(1)}%</div>
          <div className="statLbl">ROI (yr 1)</div>
        </div>
      </div>
      <svg viewBox="0 0 420 160" className="bigChart" style={{ height: 180 }}>
        <rect x="50" y="20" width="60" height="120" fill="#3b82f6" />
        <text x="80" y="155" textAnchor="middle" className="axisLabel">
          Baseline
        </text>
        <rect
          x="160"
          y="{20 + (f.baseline>0?120*(1 - f.current/f.baseline):0)}"
          width="60"
          height="{120 - (f.baseline>0?120*(1 - f.current/f.baseline):0)}"
          fill="#10b981"
        />
        <text x="190" y="155" textAnchor="middle" className="axisLabel">
          Current
        </text>
        <rect
          x="270"
          y="20"
          width="60"
          height="{Math.min(120, (annualSave$/1000))}"
          fill="#f59e0b"
        />
        <text x="300" y="155" textAnchor="middle" className="axisLabel">
          Annual $
        </text>
      </svg>
      <p className="mut">
        Model: (baseline - current) * price * 365; simple ROI & payback. Swap
        with your real metering data when ready.
      </p>
    </section>
  );
}
