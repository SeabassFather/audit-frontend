import React, { useState } from "react";

// Demo commodity data
const commodities = [
  {
    name: "Papaya",
    stats: { high: 15.2, low: 13.1, avg: 14.2 },
    description: "Papaya W1W26 Overlay: 5-yr average (dashed)",
  },
  {
    name: "Oranges (Navel)",
    stats: { high: 12.5, low: 9.7, avg: 11.6 },
    description: "Oranges Navel W1W26 Overlay: 5-yr average (dashed)",
  }
];

export default function MarketPricesPage() {
  const [lang, setLang] = useState("EN");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(commodities[0]);

  const filtered = commodities.filter(c =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fc" }}>
      {/* Dashboard Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        padding: "12px 28px",
        borderBottom: "1.5px solid #e5e5e5",
        boxShadow: "0 2px 12px rgba(203,53,107,0.07)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            fontWeight: 700,
            fontSize: "1.22rem",
            color: "#cb356b"
          }}>
            <span role="img" aria-label="logo" style={{
              fontSize: "1.45rem",
              marginRight: 7
            }}>🍉</span>
            AuditDNA
          </span>
          <span style={{
            color: "#888", fontSize: "1.02rem", fontWeight: 450,
            marginLeft: 20
          }}>
            Ticker: Papaya W1W26 avg (placeholder)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a href="#" style={headerLink}>Services</a>
          <a href="#" style={headerLink}>Cases</a>
          <a href="#" style={headerLink}>USDA Prices</a>
          <a href="#" style={headerLink}>Ag Marketplace</a>
          <a href="#" style={headerLink}>Admin</a>
          <button style={{
            border: "none",
            background: lang === "EN" ? "#222" : "#eee",
            color: lang === "EN" ? "#fff" : "#111",
            borderRadius: 18,
            fontWeight: 600,
            fontSize: ".97rem",
            padding: "6px 18px",
            cursor: "pointer",
            marginLeft: 30,
            boxShadow: lang === "EN" ? "0 2px 8px rgba(203,53,107,0.06)" : "none",
            outline: "2px solid #cb356b"
          }} onClick={() => setLang(lang === "EN" ? "ES" : "EN")}>
            {lang}
          </button>
        </div>
      </div>

      {/* Main USDA Card */}
      <div style={{
        maxWidth: 650,
        margin: "40px auto 0 auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 6px 40px rgba(203,53,107,0.11)",
        padding: "2.2rem 2.2rem 1.5rem 2.2rem"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 18,
          gap: 10
        }}>
          <span style={{
            fontSize: "1.45rem",
            color: "#cb356b",
            marginRight: 2
          }}>📈</span>
          <span style={{ fontSize: "2rem", fontWeight: 700, color: "#1a2537" }}>
            USDA Produce Pricing
          </span>
        </div>
        <div style={{ display: "flex", gap: 25, alignItems: "flex-end", marginBottom: 14 }}>
          <div style={{ flex: 2 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 10
            }}>
              <span style={{ color: "#cb356b", fontSize: "1.1rem" }}>🔍</span>
              <input
                type="text"
                placeholder="Search commodity..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  padding: "9px 14px",
                  fontSize: "1.09rem",
                  borderRadius: 11,
                  border: "1.5px solid #e5e5e5",
                  boxShadow: "0 2px 10px rgba(203,53,107,0.07)",
                  outline: "none",
                  width: "82%",
                  fontWeight: 500
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 11, flexWrap: "wrap" }}>
              {filtered.map(c => (
                <button
                  key={c.name}
                  onClick={() => setSelected(c)}
                  style={{
                    background: selected.name === c.name ? "#cb356b" : "#f3f3f6",
                    color: selected.name === c.name ? "#fff" : "#222",
                    border: "none",
                    borderRadius: 18,
                    fontWeight: 600,
                    fontSize: ".98rem",
                    padding: "8px 22px",
                    boxShadow: selected.name === c.name ? "0 2px 10px rgba(203,53,107,0.09)" : "none",
                    cursor: "pointer",
                    transition: "all .13s"
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div style={{
            flex: 3,
            marginLeft: 20,
            minHeight: 70,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}>
            <div style={{ fontSize: "1.08rem", fontWeight: 600, color: "#1a2537" }}>
              Commodity: {selected.name} View:
            </div>
            <div style={{
              fontSize: ".99rem",
              color: "#444",
              marginTop: 2
            }}>
              {selected.description}
            </div>
          </div>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 18,
          marginTop: 20
        }}>
          <StatCard label="High" value={selected.stats.high} />
          <StatCard label="Low" value={selected.stats.low} />
          <StatCard label="Avg" value={selected.stats.avg} />
        </div>
        <div style={{ marginTop: 32 }}>
          <ChartPlaceholder commodity={selected.name} />
        </div>
      </div>
    </div>
  );
}

// StatCard: for showing high/low/avg
function StatCard({ label, value }) {
  return (
    <div style={{
      flex: 1,
      background: "#f8f9fc",
      border: "1.5px solid #e5e5e5",
      borderRadius: 13,
      padding: "19px 0 13px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: 100
    }}>
      <span style={{
        fontWeight: 700,
        fontSize: "1.03rem",
        color: "#555",
        letterSpacing: ".5px"
      }}>{label}</span>
      <span style={{
        fontWeight: 700,
        fontSize: "1.32rem",
        color: "#cb356b",
        marginTop: 2
      }}>${value}</span>
    </div>
  );
}

// ChartPlaceholder: fake chart for demo
function ChartPlaceholder({ commodity }) {
  return (
    <div style={{
      width: "100%",
      height: 170,
      background: "#f8f9fc",
      border: "1.5px solid #e5e5e5",
      borderRadius: 16,
      marginTop: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        color: "#cb356b",
        fontSize: "1.2rem",
        fontWeight: 600
      }}>
        [ {commodity} Price Graph Placeholder ]
      </div>
    </div>
  );
}

const headerLink = {
  color: "#cb356b",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: ".99rem",
  padding: "0 6px"
};