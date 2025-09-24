import { useEffect, useState } from "react";
import { searchMortgageRates } from "../lib/api";
export default function Mortgage() {
  const [state, setState] = useState("CA"),
    [score, setScore] = useState(720),
    [ltv, setLtv] = useState(70),
    [term, setTerm] = useState(30);
  const [rows, setRows] = useState([]);
  async function run() {
    const r = await searchMortgageRates({ state, score, ltv, term });
    setRows(r.results || []);
  }
  useEffect(() => {
    run();
  }, []);
  return (
    <div className="card">
      <div className="h1">Mortgage Search</div>
      <div className="controls">
        <div>
          <div className="subtle">State</div>
          <input
            value={state}
            onChange={(e) => setState(e.target.value.toUpperCase())}
          />
        </div>
        <div>
          <div className="subtle">Credit Score</div>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(+e.target.value)}
          />
        </div>
        <div>
          <div className="subtle">LTV %</div>
          <input
            type="number"
            value={ltv}
            onChange={(e) => setLtv(+e.target.value)}
          />
        </div>
        <div>
          <div className="subtle">Term</div>
          <select value={term} onChange={(e) => setTerm(+e.target.value)}>
            <option>15</option>
            <option>20</option>
            <option>30</option>
          </select>
        </div>
        <button className="tab" onClick={run}>
          Search
        </button>
      </div>
      <div className="mt-4" style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Lender</th>
              <th>Product</th>
              <th>Rate</th>
              <th>APR</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.lender}</td>
                <td>{r.product}</td>
                <td>{r.rate}%</td>
                <td>{r.apr}%</td>
                <td>${r.payment.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
