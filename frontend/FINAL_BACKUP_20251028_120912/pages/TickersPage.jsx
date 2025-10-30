import React from "react";
import RateTicker from "../components/RateTicker";
import StockTicker from "../components/StockTicker";
export default function TickersPage() {
  return (
    <div style={{ padding: "3rem 1rem", maxWidth: 1000, margin: "auto" }}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#253858",
          marginBottom: 24,
        }}
      >
        Market Tickers
      </h1>
      <RateTicker />
      <StockTicker />
    </div>
  );
}
