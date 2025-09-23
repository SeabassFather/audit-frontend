import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  CategoryScale,
} from "chart.js";
import SearchBar, { COMMODITY_OPTIONS } from "../components/SearchBar";

ChartJS.register(
  LineElement,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  CategoryScale,
);

const COLORS = {
  tomatoes: "#4e79a7",
  roma_tomato: "#9c6ade",
  avocado: "#59a14f",
  strawberries: "#e15759",
  pineapple: "#f28e2c",
  papaya: "#edc948",
  white_onion: "#76b7b2",
  asparagus: "#af7aa1",
  broccoli: "#8cd17d",
  bell_pepper_gh: "#b6992d",
  beets: "#ff9da7",
  celery: "#86bc86",
  mango: "#ffbe7d",
  watermelon: "#33cccc",
};

function demoSeries(name, weeks = 26, floor = 8, variance = 0.6, start = 14) {
  const out = [];
  let v = start;
  for (let i = 0; i < weeks; i++) {
    v = v + (Math.random() - 0.5) * variance;
    if (v < floor) v = floor + Math.random();
    out.push(+v.toFixed(2));
  }
  return { commodity: name, weeks: out };
}
function demoData(filters) {
  const pick = filters.commodities.map((c) => c.value);
  const W = filters.weeks || 26;
  const seeds = {};
  COMMODITY_OPTIONS.forEach((c) => {
    seeds[c.value] = demoSeries(c.value, W, 8, 0.5, 12 + Math.random() * 8);
  });
  return pick.map((k) => seeds[k]);
}

export default function AgMarketplace() {
  const [filters, setFilters] = useState({
    commodities: COMMODITY_OPTIONS.filter((c) =>
      ["tomatoes", "avocado"].includes(c.value),
    ),
    country: null,
    port: null,
    incoterm: null,
    weeks: 26,
  });
  const [series, setSeries] = useState(
    demoData({
      commodities: COMMODITY_OPTIONS.filter((c) =>
        ["tomatoes", "avocado"].includes(c.value),
      ),
      weeks: 26,
    }),
  );
  const [company, setCompany] = useState(""); // FDA/Organic query
  const [request, setRequest] = useState({
    state: "",
    county: "",
    country: "",
    packaging: "",
    loads: "",
    terms: "FOB",
  });
  const labels = useMemo(
    () => Array.from({ length: filters.weeks || 26 }, (_, i) => `W${i + 1}`),
    [filters.weeks],
  );

  async function runSearch(f) {
    try {
      const live = process.env.REACT_APP_LIVE_USDA === "1";
      if (!live) {
        setSeries(demoData(f));
        return;
      }
      const qs = new URLSearchParams();
      qs.set("commodities", f.commodities.map((c) => c.value).join(","));
      if (f.country) qs.set("country", f.country);
      if (f.port) qs.set("port", f.port);
      if (f.incoterm) qs.set("incoterm", f.incoterm);
      qs.set("weeks", String(f.weeks || 26));
      const r = await fetch(`/api/market/avg?${qs.toString()}`);
      if (!r.ok) throw new Error(await r.text());
      const json = await r.json();
      setSeries(json);
    } catch (e) {
      console.error(e);
      alert("Pricing fetch failed. Using demo.");
      setSeries(demoData(f));
    }
  }

  const data = useMemo(
    () => ({
      labels,
      datasets: (series || []).map((s) => ({
        label: s.commodity.replace(/_/g, " "),
        data: s.weeks,
        borderColor: COLORS[s.commodity] || "#888",
        backgroundColor: "transparent",
        borderWidth: 2,
        tension: 0.25,
        pointRadius: 2,
      })),
    }),
    [labels, series],
  );

  async function checkFDA() {
    if (!company) return;
    const r = await fetch(`/api/fda/firm?q=${encodeURIComponent(company)}`);
    const json = r.ok ? await r.json() : [];
    alert(json.length ? `FDA matches: ${json.length}` : "No FDA match found.");
  }
  async function checkOrganic() {
    if (!company) return;
    const r = await fetch(
      `/api/organic/search?q=${encodeURIComponent(company)}`,
    );
    const json = r.ok ? await r.json() : [];
    alert(
      json.length
        ? `USDA Organic matches: ${json.length}`
        : "No Organic match found.",
    );
  }

  async function submitRequest() {
    // Posts a buyer request for sourcing team; backend can email/Slack later
    const r = await fetch("/api/market/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...request, filters }),
    });
    if (!r.ok) {
      alert("Request failed.");
      return;
    }
    alert("Request sent. Our team will contact you.");
    setRequest({
      state: "",
      county: "",
      country: "",
      packaging: "",
      loads: "",
      terms: "FOB",
    });
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Ag Marketplace</h2>
      <SearchBar
        defaultCommodities={filters.commodities}
        onSearch={(f) => {
          setFilters(f);
          runSearch(f);
        }}
      />
      <div className="card" style={{ padding: 12, marginBottom: 16 }}>
        <Line
          data={data}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: {
              y: { title: { display: true, text: "USD / unit (weekly)" } },
              x: { title: { display: true, text: "Weeks" } },
            },
          }}
        />
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 16 }}
      >
        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Buyer Request</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
            }}
          >
            <input
              className="text"
              placeholder="State/Province"
              value={request.state}
              onChange={(e) =>
                setRequest({ ...request, state: e.target.value })
              }
            />
            <input
              className="text"
              placeholder="County"
              value={request.county}
              onChange={(e) =>
                setRequest({ ...request, county: e.target.value })
              }
            />
            <input
              className="text"
              placeholder="Country"
              value={request.country}
              onChange={(e) =>
                setRequest({ ...request, country: e.target.value })
              }
            />
            <input
              className="text"
              placeholder="Packaging (e.g. 25# Carton)"
              value={request.packaging}
              onChange={(e) =>
                setRequest({ ...request, packaging: e.target.value })
              }
            />
            <input
              className="text"
              placeholder="Loads / Week"
              value={request.loads}
              onChange={(e) =>
                setRequest({ ...request, loads: e.target.value })
              }
            />
            <select
              className="text"
              value={request.terms}
              onChange={(e) =>
                setRequest({ ...request, terms: e.target.value })
              }
            >
              <option>FOB</option>
              <option>CIF</option>
              <option>DDP</option>
            </select>
          </div>
          <div style={{ marginTop: 10 }}>
            <button className="btn-primary" onClick={submitRequest}>
              Submit Request
            </button>
          </div>
          <small>
            Well match with verified growers and respond with availabilities &
            pricing.
          </small>
        </div>

        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            Compliance Quick Check
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 110px 110px",
              gap: 8,
            }}
          >
            <input
              className="text"
              placeholder="Company to verify (FDA / USDA Organic)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <button className="btn-primary" onClick={checkFDA}>
              FDA
            </button>
            <button className="btn-primary" onClick={checkOrganic}>
              USDA Organic
            </button>
          </div>
          <small>
            These use your backend adapters: <code>/api/fda/firm</code> and{" "}
            <code>/api/organic/search</code>.
          </small>
        </div>
      </div>
    </div>
  );
}
