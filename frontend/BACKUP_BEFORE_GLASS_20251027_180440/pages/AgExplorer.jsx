import React, { useMemo, useState } from "react";
import Ticker from "../components/Ticker";

const COMMODITY_HINTS = [
  "Papaya", "Orange", "Apple", "Grape", "Tomato",
  "Avocado", "Lemon", "Lime", "Mango", "Banana",
];

export default function AgExplorer() {
  const [tab, setTab] = useState("produce");
  const [q, setQ] = useState("");
  const CORN_EP = process.env.REACT_APP_TICKER_CORN || "";
  const WHEAT_EP = process.env.REACT_APP_TICKER_WHEAT || "";
  const WATER_EP = process.env.REACT_APP_TICKER_WATER || "";
  const PAPAYA_EP = process.env.REACT_APP_TICKER_PAPAYA || "";

  const hints = useMemo(() => {
    const t = q.toLowerCase();
    return t ? COMMODITY_HINTS.filter((x) => x.toLowerCase().includes(t)) : [];
  }, [q]);

  const [acre, setAcre] = useState(0);
  const [gpm, setGpm] = useState(0);
  const [hours, setHours] = useState(0);
  const gallonsPerDay = gpm > 0 && hours > 0 ? gpm * 60 * hours : 0;
  const gallonsPerAcre = acre > 0 ? Math.round(gallonsPerDay / acre) : 0;

  const [invoice, setInvoice] = useState(0);
  const [rate, setRate] = useState(0);
  const [days, setDays] = useState(30);
  const advance = Math.round(invoice * 0.85 * 100) / 100;
  const fee = Math.round(invoice * (rate / 100) * (days / 30) * 100) / 100;
  const net = Math.round((advance - fee) * 100) / 100;

  return (
    <div className="p-4">
      <h2 className="h2">Agriculture Suite</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {["produce", "water", "factoring", "tickers"].map((t) => (
          <button key={t} className="btn" onClick={() => setTab(t)}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      {tab === "produce" && (
        <div className="card">
          <div className="card-title">Produce Search Engine</div>
          <input
            className="filter"
            placeholder="Search commodity name"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {hints.length === 0 ? (
            <div className="empty">type to filter</div>
          ) : (
            <div className="card-grid" style={{ marginTop: 12 }}>
              {hints.map((h) => (
                <div className="card" key={h}>
                  <div className="card-title">{h}</div>
                  <div className="subtext">
                    connect USDA endpoint to show live data
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {tab === "water" && (
        <div className="grid">
          <div className="card">
            <div className="card-title">Water Usage Calculator</div>
            <div className="kv">
              <span>Acres</span>
              <input className="filter" type="number" value={acre} onChange={(e) => setAcre(+e.target.value || 0)} />
            </div>
            <div className="kv">
              <span>Flow (GPM)</span>
              <input className="filter" type="number" value={gpm} onChange={(e) => setGpm(+e.target.value || 0)} />
            </div>
            <div className="kv">
              <span>Hours/day</span>
              <input className="filter" type="number" value={hours} onChange={(e) => setHours(+e.target.value || 0)} />
            </div>
            <div className="subtext">{gallonsPerDay ? gallonsPerDay.toLocaleString() + " gal/day" : "enter values"}</div>
            <div className="subtext">{gallonsPerAcre ? gallonsPerAcre.toLocaleString() + " gal/acre/day" : ""}</div>
          </div>
          <div className="card">
            <div className="card-title">Irrigation Notes</div>
            <div className="empty">add emitter spacing, ET, schedule when backend is ready</div>
          </div>
        </div>
      )}
      {tab === "factoring" && (
        <div className="grid">
          <div className="card">
            <div className="card-title">Factoring Quote</div>
            <div className="kv">
              <span>Invoice $</span>
              <input className="filter" type="number" value={invoice} onChange={(e) => setInvoice(+e.target.value || 0)} />
            </div>
            <div className="kv">
              <span>Rate % / 30d</span>
              <input className="filter" type="number" value={rate} onChange={(e) => setRate(+e.target.value || 0)} />
            </div>
            <div className="kv">
              <span>Days</span>
              <input className="filter" type="number" value={days} onChange={(e) => setDays(+e.target.value || 0)} />
            </div>
            <div className="subtext">Advance 85% (static policyadjust once backend provides product terms)</div>
            <div className="subtext">
              Advance: {advance ? "$" + advance.toLocaleString() : ""} | Fee: {fee ? "$" + fee.toLocaleString() : ""} | Net: {net ? "$" + net.toLocaleString() : ""}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Term Sheet</div>
            <div className="empty">wire lender list + e-sign later</div>
          </div>
        </div>
      )}
      {tab === "tickers" && (
        <div className="grid">
          <Ticker label="Corn" endpoint={CORN_EP} />
          <Ticker label="Wheat" endpoint={WHEAT_EP} />
          <Ticker label="Water" endpoint={WATER_EP} />
          <Ticker label="Papaya" endpoint={PAPAYA_EP} />
        </div>
      )}
    </div>
  );
}
