import React from "react";

const searchEngines = [
  {
    id: "E-1001",
    name: "Google",
    type: "General",
    country: "Global",
    url: "https://www.google.com",
    status: "Active",
    lastChecked: "2025-09-06",
  },
  {
    id: "E-1002",
    name: "Bing",
    type: "General",
    country: "Global",
    url: "https://www.bing.com",
    status: "Active",
    lastChecked: "2025-09-06",
  },
  {
    id: "E-1003",
    name: "DuckDuckGo",
    type: "Privacy",
    country: "Global",
    url: "https://duckduckgo.com",
    status: "Active",
    lastChecked: "2025-09-06",
  },
  {
    id: "E-1004",
    name: "Yahoo",
    type: "General",
    country: "Global",
    url: "https://search.yahoo.com",
    status: "Active",
    lastChecked: "2025-09-05",
  },
  {
    id: "E-1005",
    name: "Yandex",
    type: "General",
    country: "Russia, Global",
    url: "https://yandex.com",
    status: "Active",
    lastChecked: "2025-09-05",
  },
  {
    id: "E-1006",
    name: "Baidu",
    type: "General",
    country: "China",
    url: "https://www.baidu.com",
    status: "Active",
    lastChecked: "2025-09-04",
  },
  {
    id: "E-1007",
    name: "USDA Market News",
    type: "Agriculture",
    country: "USA",
    url: "https://www.ams.usda.gov/market-news",
    status: "Active",
    lastChecked: "2025-09-04",
  },
  {
    id: "E-1008",
    name: "AgWeb",
    type: "Agriculture News",
    country: "USA",
    url: "https://www.agweb.com/markets",
    status: "Active",
    lastChecked: "2025-09-02",
  },
  {
    id: "E-1009",
    name: "Commodity Markets Council",
    type: "Commodity",
    country: "USA",
    url: "https://www.commoditymarketscouncil.org/",
    status: "Active",
    lastChecked: "2025-09-01",
  },
  {
    id: "E-1010",
    name: "AgFunderNews",
    type: "AgTech News",
    country: "Global",
    url: "https://agfundernews.com/",
    status: "Active",
    lastChecked: "2025-09-01",
  },
  {
    id: "E-1011",
    name: "Startpage",
    type: "Privacy",
    country: "Global",
    url: "https://www.startpage.com",
    status: "Active",
    lastChecked: "2025-09-06",
  },
  {
    id: "E-1012",
    name: "Ecosia",
    type: "Eco-conscious",
    country: "Global",
    url: "https://www.ecosia.org",
    status: "Active",
    lastChecked: "2025-09-03",
  },
];

const thStyle = {
  padding: "0.75rem",
  borderBottom: "2px solid #e1e1e1",
  textAlign: "left",
  fontWeight: "bold",
  fontSize: "1rem",
};
const tdStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid #e1e1e1",
  fontSize: "0.97rem",
};

export default function SearchEnginesPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Search Engines</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#f6f6f6" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Country/Region</th>
            <th style={thStyle}>URL</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Last Checked</th>
          </tr>
        </thead>
        <tbody>
          {searchEngines.map((e) => (
            <tr key={e.id}>
              <td style={tdStyle}>{e.id}</td>
              <td style={tdStyle}>{e.name}</td>
              <td style={tdStyle}>{e.type}</td>
              <td style={tdStyle}>{e.country}</td>
              <td style={tdStyle}>
                <a href={e.url} target="_blank" rel="noopener noreferrer">
                  {e.url}
                </a>
              </td>
              <td style={tdStyle}>
                <span
                  style={{
                    color: e.status === "Active" ? "#19733b" : "#b71c1c",
                    fontWeight: 600,
                  }}
                >
                  {e.status}
                </span>
              </td>
              <td style={tdStyle}>{e.lastChecked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
