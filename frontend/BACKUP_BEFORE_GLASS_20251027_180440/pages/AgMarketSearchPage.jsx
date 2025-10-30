import React from "react";
import AgSearchForm from "../components/AgSearchForm";
export default function AgMarketplaceSearchPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#253858", marginBottom: 12 }}>
        Ag Marketplace Search
      </h1>
      <AgSearchForm />
    </div>
  );
}
