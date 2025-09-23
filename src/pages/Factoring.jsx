import { useEffect, useMemo, useState } from "react";
import { listFactoringDeals } from "../lib/api";
export default function Factoring() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState([]);
  useEffect(() => {
    (async () => {
      const r = await listFactoringDeals();
      setRows(r.deals || []);
    })();
  }, []);
  const filtered = useMemo(
    () =>
      rows.filter((x) =>
        JSON.stringify(x).toLowerCase().includes(q.toLowerCase()),
      ),
    [rows, q],
  );
  return (
    <div className="card">
      <div className="h1">Ag Factoring</div>
      <div className="controls">
        <div style={{ flex: "1 1 auto" }}>
          <div className="subtle">Search</div>
          <input
            style={{ width: "100%" }}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="debtor, lender, commodity, status"
          />
        </div>
        <button className="tab">New Deal</button>
      </div>
      <div className="mt-4" style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Debtor</th>
              <th>Lender</th>
              <th>Country</th>
              <th>Commodity</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i}>
                <td>{r.debtor}</td>
                <td>{r.lender}</td>
                <td>{r.country}</td>
                <td>{r.commodity}</td>
                <td>${(+r.amount || 0).toLocaleString()}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
