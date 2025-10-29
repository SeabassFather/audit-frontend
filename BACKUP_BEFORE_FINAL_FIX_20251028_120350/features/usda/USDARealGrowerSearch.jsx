import React, { useState } from "react";
import api from "../../api"; // Adjust path if needed

export default function USDARealGrowerSearch() {
  const [query, setQuery] = useState("");
  const [commodity, setCommodity] = useState("");
  const [region, setRegion] = useState("");
  const [growers, setGrowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Fetch USDA grower/commodity data
  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const params = {};
      if (commodity) params.commodity = commodity;
      if (region) params.state = region;
      if (query) params.q = query;
      const res = await api.get("/usda/prices/search", { params });
      setGrowers(res.data.data || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch USDA grower data."
      );
      setGrowers([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h1 style={{
        fontSize: 32,
        fontWeight: 900,
        color: "#17853b",
        marginBottom: 18
      }}>
        USDA Grower Search Engine
      </h1>
      <form onSubmit={handleSearch} style={{
        display: "flex",
        gap: 8,
        marginBottom: 18
      }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by grower, commodity, location, etc."
          style={{
            flex: 2,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            padding: "10px 16px"
          }}
        />
        <input
          value={commodity}
          onChange={e => setCommodity(e.target.value)}
          placeholder="Commodity (e.g. Avocado)"
          style={{
            flex: 1,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            padding: "10px 16px"
          }}
        />
        <input
          value={region}
          onChange={e => setRegion(e.target.value)}
          placeholder="Region/State"
          style={{
            flex: 1,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            padding: "10px 16px"
          }}
        />
        <button
          type="submit"
          style={{
            background: "#17853b",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 22px",
            fontWeight: 700,
            cursor: "pointer"
          }}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Status and Error Messages */}
      <div style={{ marginBottom: 12, fontWeight: 600 }}>
        {growers.length > 0 && (
          <span>
            <span style={{ color: "#17853b" }}>{growers.length}</span> Growers found
          </span>
        )}
        {searched && !loading && growers.length === 0 && (
          <span style={{ color: "#e11d48" }}>
            No growers found. Try adjusting your filters or search terms.
          </span>
        )}
        {error && (
          <div style={{ color: "#e11d48", marginTop: 8 }}>
            {error}
          </div>
        )}
      </div>

      {/* Results Table */}
      {growers.length > 0 && (
        <div style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          background: "#fff"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f1f5f9" }}>
              <tr>
                <th style={th}>Commodity</th>
                <th style={th}>State/Region</th>
                <th style={th}>City/Market</th>
                <th style={th}>Price (Avg)</th>
                <th style={th}>Price (Low-High)</th>
                <th style={th}>Report Date</th>
              </tr>
            </thead>
            <tbody>
              {growers.map((g, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={td}>{g.commodity}</td>
                  <td style={td}>{g.location?.state || g.location?.region || "-"}</td>
                  <td style={td}>{g.location?.city || "-"}</td>
                  <td style={td}>
                    {g.priceData?.average ? `$${g.priceData.average.toFixed(2)}` : "-"}
                  </td>
                  <td style={td}>
                    {g.priceData?.low && g.priceData?.high
                      ? `$${g.priceData.low.toFixed(2)} - $${g.priceData.high.toFixed(2)}`
                      : "-"}
                  </td>
                  <td style={td}>
                    {g.reportDate
                      ? new Date(g.reportDate).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Table header and cell styles
const th = {
  textAlign: "left",
  padding: "12px 14px",
  fontWeight: 700,
  color: "#17853b",
  fontSize: 15,
  borderBottom: "2px solid #e5e7eb"
};
const td = {
  padding: "10px 14px",
  fontSize: 14
};