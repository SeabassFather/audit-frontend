import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Example data for tickers (swap for APIs later!)
const tickerData = [
  // Financial indices
  { label: "S&P 500", value: "5,425.13", change: "+12.44", pct: "+0.23%", up: true },
  { label: "NASDAQ", value: "17,832.65", change: "+45.19", pct: "+0.25%", up: true },
  { label: "Dow", value: "39,123.78", change: "-85.91", pct: "-0.22%", up: false },

  // Mortgage rates
  { label: "30Y Fixed", value: "6.95%", change: "+0.02%", pct: "", up: true },
  { label: "15Y Fixed", value: "6.05%", change: "-0.01%", pct: "", up: false },
  { label: "5/1 ARM", value: "6.65%", change: "+0.01%", pct: "", up: true },

  // USDA/Commodities
  { label: "Corn (bu)", value: "$4.85", change: "-0.03", pct: "-0.62%", up: false },
  { label: "Soybeans (bu)", value: "$13.12", change: "+0.11", pct: "+0.84%", up: true },
  { label: "Wheat (bu)", value: "$6.24", change: "+0.02", pct: "+0.32%", up: true },
  { label: "Cattle (lb)", value: "$1.78", change: "-0.01", pct: "-0.56%", up: false }
];

export default function TickerBar() {
  return (
    <div style={{
      width: "100%",
      background: "linear-gradient(90deg,#232526,#414345)",
      color: "#fff",
      padding: "0.6rem 0",
      fontFamily: "Inter, Arial, sans-serif",
      fontWeight: 500,
      fontSize: "1.08rem",
      letterSpacing: "0.01em",
      display: "flex",
      alignItems: "center",
      overflowX: "auto",
      borderBottom: "2px solid #cb356b",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      zIndex: 40
    }}>
      <div style={{ display: "flex", gap: "2.5rem", width: "100%", padding: "0 2rem" }}>
        {tickerData.map((item, idx) => (
          <div key={idx} style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            minWidth: "160px",
            whiteSpace: "nowrap"
          }}>
            <span style={{
              color: "#ffc107",
              fontWeight: 700,
              fontSize: "1.07rem"
            }}>{item.label}</span>
            <span style={{
              fontWeight: 600,
              fontSize: "1.1rem",
              marginLeft: 2
            }}>{item.value}</span>
            <span style={{
              display: "flex",
              alignItems: "center",
              color: item.up ? "#4caf50" : "#e53935",
              fontWeight: 600,
              marginLeft: 4,
              fontSize: "1.01rem"
            }}>
              {item.up ? <FaArrowUp style={{marginRight:2}}/> : <FaArrowDown style={{marginRight:2}}/>}
              {item.change}
              {item.pct && <span style={{ marginLeft: 2 }}>{item.pct}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}