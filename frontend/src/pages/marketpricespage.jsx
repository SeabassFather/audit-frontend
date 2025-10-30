import React, { useState } from "react";
import ProducePriceChart from "../components/ProducePriceChart";

// List your commodities and USDA NASS params here
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
    name: "Oranges (Navel)",
    nass: {
      commodity_desc: "ORANGES",
      statisticcat_desc: "PRICE RECEIVED",
      unit_desc: "DOLLARS / LB",
    },
  },
  // Add more as needed!
];

export default function MarketPricesPage() {
  const [query, setQuery] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState(
    ALL_COMMODITIES[0],
  );

  // Filter commodities by search box
  const filteredCommodities = ALL_COMMODITIES.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fc" }}>
      {/* Header */}
      <div
        style={{
          padding: "12px 0",
          background: "#fff",
          borderBottom: "1.5px solid #e5e5e5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.22rem",
              color: "#cb356b",
              marginLeft: 24,
            }}
          >
            <span
              role="img"
              aria-label="logo"
              style={{ fontSize: "1.45rem", marginRight: 7 }}
            >
<<<<<<< HEAD
              🍉
=======
              Ã°Å¸Ââ€°
>>>>>>> my/push-branch
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
            Ticker: {selectedCommodity.name} W1W26 avg (real USDA API)
          </span>
        </div>
        <div style={{ marginRight: 30 }}>
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
          <span
            style={{
              marginLeft: 30,
              background: "#222",
              color: "#fff",
              borderRadius: 18,
              fontWeight: 600,
              fontSize: ".97rem",
              padding: "6px 18px",
            }}
          >
            EN
          </span>
        </div>
      </div>

      {/* Main USDA Card */}
      <div
        style={{
          maxWidth: 520,
          margin: "40px auto 0 auto",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 6px 40px rgba(203,53,107,0.09)",
          padding: "2.2rem 2.2rem 1.5rem 2.2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 18,
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
<<<<<<< HEAD
            📈
=======
            Ã°Å¸â€œË†
>>>>>>> my/push-branch
          </span>
          <span style={{ fontSize: "2rem", fontWeight: 700, color: "#1a2537" }}>
            USDA Produce Pricing
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 25,
            alignItems: "flex-end",
            marginBottom: 14,
          }}
        >
          <div style={{ flex: 2 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                marginBottom: 10,
              }}
            >
<<<<<<< HEAD
              <span style={{ color: "#cb356b", fontSize: "1.1rem" }}>🔍</span>
=======
              <span style={{ color: "#cb356b", fontSize: "1.1rem" }}>Ã°Å¸â€Â</span>
>>>>>>> my/push-branch
              <input
                type="text"
                placeholder="Search commodity..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  padding: "9px 14px",
                  fontSize: "1.09rem",
                  borderRadius: 11,
                  border: "1.5px solid #e5e5e5",
                  boxShadow: "0 2px 10px rgba(203,53,107,0.07)",
                  outline: "none",
                  width: "82%",
                  fontWeight: 500,
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 11, flexWrap: "wrap" }}>
              {filteredCommodities.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCommodity(c)}
                  style={{
                    background:
                      selectedCommodity.name === c.name ? "#cb356b" : "#f3f3f6",
                    color: selectedCommodity.name === c.name ? "#fff" : "#222",
                    border: "none",
                    borderRadius: 18,
                    fontWeight: 600,
                    fontSize: ".98rem",
                    padding: "8px 22px",
                    boxShadow:
                      selectedCommodity.name === c.name
                        ? "0 2px 10px rgba(203,53,107,0.09)"
                        : "none",
                    cursor: "pointer",
                    transition: "all .13s",
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              flex: 3,
              marginLeft: 20,
              minHeight: 70,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{ fontSize: "1.08rem", fontWeight: 600, color: "#1a2537" }}
            >
              Commodity: {selectedCommodity.name} View:
            </div>
            <div
              style={{
                fontSize: ".99rem",
                color: "#444",
                marginTop: 2,
              }}
            >
              W1W26 Overlay: 5-yr average (dashed)
            </div>
          </div>
        </div>
        {/* Real Price Chart */}
        <div style={{ marginTop: 32 }}>
          <ProducePriceChart
            commodity={selectedCommodity.name}
            usdaParams={selectedCommodity.nass}
          />
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
