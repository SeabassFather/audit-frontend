import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// 10 distinct chart colors
const CHART_COLORS = [
  "#cb356b",
  "#1e90ff",
  "#ffa500",
  "#16a34a",
  "#f59e42",
  "#7c3aed",
  "#e11d48",
  "#facc15",
  "#0ea5e9",
  "#f472b6",
];

// Your USDA Quick Stats API Key
const USDA_API_KEY = "4F158DB1-85C2-3243-BFFA-58B53FB40D23";

// Example commodity search params for USDA NASS
const ALL_COMMODITIES = [
  {
    name: "Papaya",
    nass: {
      commodity_desc: "PAPAYAS",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / LB",
    },
  },
  {
    name: "Oranges",
    nass: {
      commodity_desc: "ORANGES",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / LB",
    },
  },
  {
    name: "Apples",
    nass: {
      commodity_desc: "APPLES",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / LB",
    },
  },
  {
    name: "Grapes",
    nass: {
      commodity_desc: "GRAPES",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / LB",
    },
  },
  {
    name: "Corn",
    nass: {
      commodity_desc: "CORN",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / BU",
    },
  },
  {
    name: "Soybeans",
    nass: {
      commodity_desc: "SOYBEANS",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / BU",
    },
  },
  {
    name: "Wheat",
    nass: {
      commodity_desc: "WHEAT",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / BU",
    },
  },
  {
    name: "Potatoes",
    nass: {
      commodity_desc: "POTATOES",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / CWT",
    },
  },
  {
    name: "Onions",
    nass: {
      commodity_desc: "ONIONS",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / CWT",
    },
  },
  {
    name: "Tomatoes",
    nass: {
      commodity_desc: "TOMATOES",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / CWT",
    },
  },
];

const MAX_MONITOR = 10;

function buildNassUrl({ commodity_desc, statisticcat_desc, unit_desc }, year) {
  // See: https://quickstats.nass.usda.gov/api
  return (
    `https://quickstats.nass.usda.gov/api/api_GET/?key=${USDA_API_KEY}` +
    `&commodity_desc=${encodeURIComponent(commodity_desc)}` +
    `&statisticcat_desc=${encodeURIComponent(statisticcat_desc)}` +
    `&unit_desc=${encodeURIComponent(unit_desc)}` +
    `&year__GE=${year - 4}&year__LE=${year}` +
    `&agg_level_desc=NATIONAL&format=JSON`
  );
}

export default function MarketPricesPage() {
  const [lang, setLang] = useState("EN");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([ALL_COMMODITIES[0]]);
  const [commodityData, setCommodityData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filter commodity list for search
  const filteredCommodities = useMemo(
    () =>
      ALL_COMMODITIES.filter((c) =>
        c.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [search],
  );

  // Fetch real USDA data for selected commodities (5 years price/year)
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError("");
      let nextData = { ...commodityData };
      const promises = selected.map(async (c) => {
        if (nextData[c.name]) return;
        const url = buildNassUrl(c.nass, new Date().getFullYear());
        try {
          const resp = await fetch(url);
          const json = await resp.json();
          // Parse actual price data per year
          const raw = json.data || [];
          // Group prices by year, take avg if multiple per year
          let byYear = {};
          raw.forEach((d) => {
            const yr = d.year;
            const price = parseFloat(d.Value.replace(",", ""));
            if (!isNaN(price)) {
              if (!byYear[yr]) byYear[yr] = [];
              byYear[yr].push(price);
            }
          });
          let years = Object.keys(byYear).sort();
          let prices = years.map(
            (yr) => byYear[yr].reduce((a, b) => a + b, 0) / byYear[yr].length,
          );
          nextData[c.name] = {
            years,
            prices,
            high: Math.max(...prices),
            low: Math.min(...prices),
            avg: prices.reduce((a, b) => a + b, 0) / prices.length,
          };
        } catch (e) {
          setError(`Failed to fetch ${c.name} from USDA.`);
        }
      });
      await Promise.all(promises);
      setCommodityData(nextData);
      setLoading(false);
    }
    if (selected.length) fetchAll();
  }, [selected]);

  const chartData = useMemo(() => {
    if (!selected.length || loading) return null;
    const years = commodityData[selected[0]?.name]?.years || [];
    return {
      labels: years,
      datasets: selected.map((c, i) => ({
        label: c.name,
        data: commodityData[c.name]?.prices || [],
        borderColor: CHART_COLORS[i % CHART_COLORS.length],
        backgroundColor: CHART_COLORS[i % CHART_COLORS.length] + "44",
        pointRadius: 3,
        pointHoverRadius: 7,
        borderWidth: 3,
        tension: 0.24,
      })),
    };
  }, [selected, commodityData, loading]);

  function renderStats() {
    return (
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          margin: "18px 0 10px",
        }}
      >
        {selected.map((c, idx) => {
          const d = commodityData[c.name] || {};
          return (
            <div
              key={c.name}
              style={{
                background: "#f8f9fc",
                border: `2px solid ${CHART_COLORS[idx % CHART_COLORS.length]}`,
                borderRadius: 13,
                padding: "12px 18px",
                minWidth: 110,
                boxShadow: "0 2px 10px rgba(203,53,107,0.07)",
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "1.01rem",
                  color: CHART_COLORS[idx % CHART_COLORS.length],
                }}
              >
                {c.name}
              </div>
              <div style={{ fontSize: ".97rem", color: "#222" }}>
                <span style={{ fontWeight: 600 }}>High:</span> $
                {d.high?.toFixed(2) || "-"}
              </div>
              <div style={{ fontSize: ".97rem", color: "#222" }}>
                <span style={{ fontWeight: 600 }}>Low:</span> $
                {d.low?.toFixed(2) || "-"}
              </div>
              <div style={{ fontSize: ".97rem", color: "#222" }}>
                <span style={{ fontWeight: 600 }}>Avg:</span> $
                {d.avg?.toFixed(2) || "-"}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fc" }}>
      {/* Dashboard Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
          padding: "12px 28px",
          borderBottom: "1.5px solid #e5e5e5",
          boxShadow: "0 2px 12px rgba(203,53,107,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontWeight: 700,
              fontSize: "1.22rem",
              color: "#cb356b",
            }}
          >
            <span
              role="img"
              aria-label="logo"
              style={{ fontSize: "1.45rem", marginRight: 7 }}
            >
              🍉
            </span>
            AuditDNA
          </span>
          <span
            style={{
              color: "#888",
              fontSize: "1.02rem",
              fontWeight: 450,
              marginLeft: 20,
            }}
          >
            Ticker: Multi-Commodity (USDA API)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a href="/services" style={headerLink}>
            Services
          </a>
          <a href="/cases" style={headerLink}>
            Cases
          </a>
          <a href="/market/prices" style={headerLink}>
            USDA Prices
          </a>
          <a href="/marketplace" style={headerLink}>
            Ag Marketplace
          </a>
          <a href="/admin" style={headerLink}>
            Admin
          </a>
          <button
            style={{
              border: "none",
              background: lang === "EN" ? "#222" : "#eee",
              color: lang === "EN" ? "#fff" : "#111",
              borderRadius: 18,
              fontWeight: 600,
              fontSize: ".97rem",
              padding: "6px 18px",
              cursor: "pointer",
              marginLeft: 30,
              boxShadow:
                lang === "EN" ? "0 2px 8px rgba(203,53,107,0.06)" : "none",
              outline: "2px solid #cb356b",
            }}
            onClick={() => setLang(lang === "EN" ? "ES" : "EN")}
          >
            {lang}
          </button>
        </div>
      </div>
      {/* Main Card */}
      <div
        style={{
          maxWidth: 900,
          margin: "40px auto 0 auto",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 6px 40px rgba(203,53,107,0.11)",
          padding: "2.2rem 2.2rem 1.5rem 2.2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: "1.45rem",
              color: "#cb356b",
              marginRight: 2,
            }}
          >
            📈
          </span>
          <span style={{ fontSize: "2rem", fontWeight: 700, color: "#1a2537" }}>
            USDA Produce Pricing Monitor
          </span>
        </div>
        {/* Commodity Search & Multi-Select */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 18,
          }}
        >
          <div style={{ flex: 3 }}>
            <input
              type="text"
              placeholder="Search commodities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "10px 16px",
                fontSize: "1.08rem",
                borderRadius: 13,
                border: "1.5px solid #e5e5e5",
                boxShadow: "0 2px 10px rgba(203,53,107,0.07)",
                outline: "none",
                width: "100%",
                fontWeight: 500,
                marginBottom: 10,
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {filteredCommodities.slice(0, 15).map((c) => {
                const isSelected = selected.find((s) => s.name === c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => {
                      if (isSelected) {
                        setSelected(selected.filter((s) => s.name !== c.name));
                      } else if (selected.length < MAX_MONITOR) {
                        setSelected([...selected, c]);
                      }
                    }}
                    style={{
                      background: isSelected
                        ? CHART_COLORS[
                            selected.findIndex((s) => s.name === c.name) %
                              CHART_COLORS.length
                          ]
                        : "#f3f3f6",
                      color: isSelected ? "#fff" : "#222",
                      border: "none",
                      borderRadius: 18,
                      fontWeight: 600,
                      fontSize: ".99rem",
                      padding: "8px 18px",
                      boxShadow: isSelected
                        ? "0 2px 12px rgba(203,53,107,0.13)"
                        : "none",
                      cursor:
                        isSelected || selected.length < MAX_MONITOR
                          ? "pointer"
                          : "not-allowed",
                      opacity:
                        isSelected || selected.length < MAX_MONITOR ? 1 : 0.5,
                    }}
                  >
                    {c.name}
                    {isSelected && (
                      <span
                        style={{
                          marginLeft: 7,
                          fontWeight: 900,
                          fontSize: "1.04em",
                        }}
                      >
                        ×
                      </span>
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => setSelected([])}
                style={{
                  background: "#e3e3e6",
                  color: "#cb356b",
                  border: "none",
                  borderRadius: 18,
                  fontWeight: 700,
                  fontSize: ".99rem",
                  padding: "8px 16px",
                  marginLeft: 12,
                  cursor: "pointer",
                }}
              >
                Clear All
              </button>
            </div>
            <div
              style={{
                marginTop: 7,
                fontSize: ".93rem",
                color: "#666",
              }}
            >
              Select up to {MAX_MONITOR} commodities to monitor.
            </div>
          </div>
          <div style={{ flex: 2, minWidth: 190, textAlign: "right" }}>
            <div
              style={{ fontWeight: 600, color: "#222", fontSize: "1.13rem" }}
            >
              Monitoring: {selected.length} / {MAX_MONITOR}
            </div>
            <div style={{ marginTop: 7 }}>
              {selected.map((c, i) => (
                <span
                  key={c.name}
                  style={{
                    display: "inline-block",
                    background: CHART_COLORS[i % CHART_COLORS.length],
                    color: "#fff",
                    borderRadius: 10,
                    padding: "3px 10px",
                    marginRight: 6,
                    fontWeight: 600,
                    fontSize: ".98rem",
                  }}
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Per-commodity stats */}
        {renderStats()}
        {/* Chart */}
        <div style={{ marginTop: 20 }}>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                color: "#cb356b",
                margin: "20px 0",
              }}
            >
              Loading price data...
            </div>
          ) : error ? (
            <div
              style={{
                textAlign: "center",
                color: "#c62828",
                margin: "20px 0",
              }}
            >
              {error}
            </div>
          ) : chartData && chartData.datasets.length > 0 ? (
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: "bottom" },
                  title: { display: false },
                },
                scales: {
                  x: { title: { display: true, text: "Year" } },
                  y: { title: { display: true, text: "Price (USD)" } },
                },
              }}
              height={210}
            />
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#a1a1aa",
                margin: "30px 0",
              }}
            >
              Select commodities above to display chart.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const headerLink = {
  color: "#cb356b",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: ".99rem",
  padding: "0 6px",
};
