import React, { useEffect, useMemo, useState } from "react";
import USDACommodityChart from "../../components/charts/USDACommodityChart";
import { useAppMode } from "../../context/AppModeContext";
import { api } from "../../utils/api";

const COMMODITIES = [
  "Papaya",
  "Orange",
  "Lemon",
  "Avocado",
  "Tomato",
  "Strawberry",
  "Blueberry",
  "Mango",
  "Grape",
  "Apple",
  "Banana",
];

function genDemoSeries(name) {
  const out = [];
  const base = Math.max(5, 25 - (name.length % 7));
  for (let i = 0; i < 104; i++) {
    const season =
      4 * Math.sin((i / 52) * Math.PI * 2) +
      2 * Math.cos((i / 26) * Math.PI * 2);
    const noise = (Math.random() - 0.5) * 1.2;
    const price = Math.max(0, base + season + noise);
    const avg5y = base + 0.3 * season;
    out.push({
      label: `W${(i % 52) + 1}`,
      price: +price.toFixed(2),
      avg5y: +avg5y.toFixed(2),
    });
  }
  return out;
}

function Tile({ k, v, sub }) {
  return (
    <div className="tile">
      <div className="k">{k}</div>
      <div className="v">{v}</div>
      {sub && <div className="text-xs text-slate-400">{sub}</div>}
    </div>
  );
}

export default function CommodityExplorer() {
  const { mode } = useAppMode();
  const [commodity, setCommodity] = useState("Papaya");
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        if (mode === "demo") {
          if (alive) setSeries(genDemoSeries(commodity));
        } else {
          const data = await api.get(
            "/ag/commodity?name=" + encodeURIComponent(commodity) + "&range=2y",
          );
          const s = (data || []).map((d) => ({
            label: String(d.weekLabel || d.label),
            price: +d.price,
            avg5y: +(d.avg5y ?? 0),
          }));
          if (alive) setSeries(s);
        }
      } catch (e) {
        if (alive) setErr(String(e.message || e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [commodity, mode]);

  const stats = useMemo(() => {
    if (!series.length) return { last: 0, avg: 0, max: 0, min: 0 };
    const last = series[series.length - 1]?.price ?? 0;
    const sum = series.reduce((a, b) => a + (b.price || 0), 0);
    const avg = sum / series.length;
    const max = series.reduce((m, b) => Math.max(m, b.price || 0), -Infinity);
    const min = series.reduce((m, b) => Math.min(m, b.price || 0), +Infinity);
    return {
      last: +last.toFixed(2),
      avg: +avg.toFixed(2),
      max: +max.toFixed(2),
      min: +min.toFixed(2),
    };
  }, [series]);

  return (
    <div>
      {/* HERO */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-600/20 to-blue-700/10 p-6 md:p-8">
        <div className="relative z-10">
          <div className="text-cyan-300 text-sm font-semibold tracking-wide">
            Market Intelligence
          </div>
          <h1 className="mt-1 text-2xl md:text-3xl font-extrabold">
            USDA Produce Pricing
          </h1>
          <p className="mt-2 text-slate-300 max-w-2xl">
            Weekly USDA series with 5-year averages. Toggle Demo/Live in the
            top-right to connect to your API.
          </p>
        </div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"></div>
      </div>

      {/* CONTROLS */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="card-soft p-3">
          <label className="text-xs text-slate-400">Commodity</label>
          <select
            className="select mt-1 w-full"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
          >
            {COMMODITIES.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
        <div className="card-soft p-3">
          <label className="text-xs text-slate-400">Mode</label>
          <div className="mt-1 badge">{mode.toUpperCase()}</div>
        </div>
        <div className="card-soft p-3">
          <label className="text-xs text-slate-400">Status</label>
          <div className="mt-1 text-sm">
            {loading ? (
              "Loading"
            ) : err ? (
              <span className="text-red-400">{err}</span>
            ) : (
              "OK"
            )}
          </div>
        </div>
      </div>

      {/* KPI TILES */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Tile k="Last" v={`$${stats.last}`} />
        <Tile k="Average" v={`$${stats.avg}`} />
        <Tile k="52w High" v={`$${stats.max}`} />
        <Tile k="52w Low" v={`$${stats.min}`} />
      </div>

      {/* CHART */}
      <div className="mt-5">
        <USDACommodityChart data={series} />
      </div>

      <div className="mt-4 text-xs text-slate-400">
        Live mode expects <code>/ag/commodity?name=&amp;range=</code> to return
        an array of <pre>{`[{ weekLabel, price, avg5y }]`}</pre>.
      </div>
    </div>
  );
}
