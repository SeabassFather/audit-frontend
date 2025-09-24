import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";
import { getUSDAWeeklyPrices } from "../lib/api";
import { downloadCSV } from "../lib/csv";

const COMMODITIES = [
  "Tomatoes",
  "Avocados",
  "Limes",
  "Bell Peppers",
  "Cucumbers",
];
const MARKETS = ["Nogales", "McAllen", "San Diego", "Los Angeles"];

function useAsync(fn, deps) {
  const [state, set] = useState({ loading: true, data: null, error: null });
  useEffect(() => {
    let alive = true;
    (async () => {
      set({ loading: true, data: null, error: null });
      try {
        const data = await fn();
        if (alive) set({ loading: false, data, error: null });
      } catch (e) {
        if (alive) set({ loading: false, data: null, error: e });
      }
    })();
    return () => {
      alive = false;
    };
  }, deps);
  return state;
}

export default function Prices() {
  const thisYear = new Date().getFullYear();
  const [commodity, setCommodity] = useState(COMMODITIES[0]);
  const [market, setMarket] = useState(MARKETS[0]);
  const [year, setYear] = useState(thisYear);
  const [showAvg, setShowAvg] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  const { loading, data, error } = useAsync(
    () => getUSDAWeeklyPrices({ commodity, market, year }),
    [commodity, market, year],
  );

  const { chart, stats } = useMemo(() => {
    const current = data?.current ?? [];
    const avg5 = data?.avg5 ?? [];
    const map = new Map();
    current.forEach((d) => map.set(d.week, { week: d.week, current: d.price }));
    avg5.forEach((d) => {
      const row = map.get(d.week) || { week: d.week };
      row.avg5 = d.price;
      map.set(d.week, row);
    });
    const rows = Array.from(map.values()).sort((a, b) => a.week - b.week);

    const prices = current
      .map((d) => d.price)
      .filter((v) => Number.isFinite(v));
    const min = prices.length ? Math.min(...prices) : null;
    const max = prices.length ? Math.max(...prices) : null;
    const last = prices.at(-1) ?? null;
    const first = prices[0] ?? null;
    const change =
      last != null && first != null ? ((last - first) / first) * 100 : null;
    return { chart: rows, stats: { min, max, last, first, change } };
  }, [data]);

  function exportCSV() {
    const rows = (chart ?? []).map((r) => ({
      Year: year,
      Commodity: commodity,
      Market: market,
      Week: r.week,
      Price: r.current ?? "",
      Avg5: r.avg5 ?? "",
    }));
    downloadCSV(`USDA_${commodity}_${market}_${year}.csv`, rows);
  }

  return (
    <div className="card">
      <div className="h1">USDA Prices</div>
      <div className="controls">
        <div>
          <div className="subtle">Commodity</div>
          <select
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
          >
            {COMMODITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <div className="subtle">Market</div>
          <select value={market} onChange={(e) => setMarket(e.target.value)}>
            {MARKETS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <div className="subtle">Year</div>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(+e.target.value || thisYear)}
          />
        </div>
        <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={showAvg}
            onChange={(e) => setShowAvg(e.target.checked)}
          />{" "}
          5-yr avg
        </label>
        <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
          />{" "}
          Grid
        </label>
        <button className="tab" onClick={exportCSV}>
          Export CSV
        </button>
      </div>

      {loading && <p className="subtle mt-3">Loading</p>}
      {error && (
        <p className="subtle mt-3" style={{ color: "#b91c1c" }}>
          Failed to load data. Showing nothing until it recovers.
        </p>
      )}

      {!loading && (
        <>
          <div className="mt-4" style={{ height: 380 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chart}>
                {showGrid && <CartesianGrid strokeDasharray="4 4" />}
                <XAxis dataKey="week" tickFormatter={(w) => "W" + w} />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine
                  x={13}
                  stroke="#999"
                  strokeDasharray="3 3"
                  label="Mid-season"
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  name={String(year)}
                  strokeWidth={2}
                  dot={false}
                />
                {showAvg && (
                  <Line
                    type="monotone"
                    dataKey="avg5"
                    name="5-yr avg"
                    strokeWidth={2}
                    strokeDasharray="6 6"
                    dot={false}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            className="mt-3"
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <span className="badge">Min: {stats.min ?? ""}</span>
            <span className="badge">Max: {stats.max ?? ""}</span>
            <span className="badge">First: {stats.first ?? ""}</span>
            <span className="badge">Last: {stats.last ?? ""}</span>
            <span className="badge">
              YTD: {stats.change != null ? stats.change.toFixed(1) + "%" : ""}
            </span>
            {data?.source === "synthetic" && (
              <span className="badge" title="Backend not reachable">
                offline model
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
