import React from "react";
import TradeFinanceForm from "../components/TradeFinanceForm";
export default function TradeFinanceSearchPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#253858", marginBottom: 12 }}>Trade Finance Search</h1>
      <TradeFinanceForm />
    </div>
  );
}