import React, { useState } from "react";
import "./watertech-agriculture.css";

// Dummy API function (replace with real API integration)
const fetchReport = async (type) => {
  // Simulate fetching data
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: 1,
          type,
          location: "San Joaquin Valley",
          date: "2025-10-01",
          summary: "All metrics within optimal range.",
          risk: "Low",
          aiScore: 92,
        },
        {
          id: 2,
          type,
          location: "Central Farm",
          date: "2025-09-20",
          summary: "Slight nitrate excess detected. Recommend filtration.",
          risk: "Medium",
          aiScore: 76,
        },
      ]);
    }, 800)
  );
};

const tabs = [
  { id: "water", label: "WaterTech", icon: "Ã°Å¸â€™Â§" },
  { id: "soil", label: "Soil Science", icon: "Ã°Å¸Å’Â±" },
  { id: "fertilizer", label: "Fertilizer Audit", icon: "Ã°Å¸Â§Âª" },
  { id: "environment", label: "Environmental Monitor", icon: "Ã°Å¸Å’Â" },
  { id: "certifications", label: "Certifications", icon: "Ã°Å¸â€œÅ“" },
  { id: "traceability", label: "Traceability Map", icon: "Ã°Å¸â€”ÂºÃ¯Â¸Â" },
];

export default function EnvironmentalTraceability() {
  const [activeTab, setActiveTab] = useState("water");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async (type) => {
    setLoading(true);
    const data = await fetchReport(type);
    setReports(data);
    setLoading(false);
  };

  // Main dashboard layout
  return (
    <div className="dashboard-bg">
      <header className="dashboard-header">
        <h1>
          AUDITDNA TRACEABILITY + WATERTECH + SOIL + FERTILIZER INTELLIGENCE MODULE
        </h1>
        <h2>
          Futuristic Environmental & Agricultural Traceability Ã‚Â· Real-Time AI Analysis Ã‚Â· Blockchain-Ready Compliance
        </h2>
      </header>

      {/* Tab Navigation */}
      <nav className="dashboard-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            <span style={{ fontSize: "1.2em", marginRight: "0.5em" }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="dashboard-main">
        {activeTab === "water" && (
          <WaterTechSuite onFetch={() => handleFetch("water")} reports={reports} loading={loading} />
        )}
        {activeTab === "soil" && (
          <SoilScienceModule onFetch={() => handleFetch("soil")} reports={reports} loading={loading} />
        )}
        {activeTab === "fertilizer" && (
          <FertilizerAuditModule onFetch={() => handleFetch("fertilizer")} reports={reports} loading={loading} />
        )}
        {activeTab === "environment" && (
          <EnvironmentalMonitor onFetch={() => handleFetch("environment")} reports={reports} loading={loading} />
        )}
        {activeTab === "certifications" && <CertificationUploadPanel />}
        {activeTab === "traceability" && <TraceabilityMap />}
      </main>
    </div>
  );
}

// WaterTech Suite Tab
function WaterTechSuite({ onFetch, reports, loading }) {
  return (
    <section>
      <h2 className="dashboard-card-title">Water Technology Suite</h2>
      <ul className="dashboard-feature-list">
        <li>Real-time water quality monitoring (pH, EC, TDS, heavy metals, bacteria)</li>
        <li>IoT sensor integration for flow, temperature, pressure</li>
        <li>GPS-tagged water source traceability</li>
        <li>Automated compliance checker (CONAGUA, EPA, GlobalGAP)</li>
        <li>AI-powered Water Quality Index (WQI) & anomaly detection</li>
        <li>Instant PDF certification and audit trail generation</li>
      </ul>
      <div className="dashboard-actions">
        <button className="dashboard-btn dashboard-btn-primary" onClick={onFetch}>
          Fetch Latest Water Reports
        </button>
      </div>
      {loading && <div className="dashboard-loader">Fetching water reports...</div>}
      <ReportTable reports={reports} />
    </section>
  );
}

// Soil Science Tab
function SoilScienceModule({ onFetch, reports, loading }) {
  return (
    <section>
      <h2 className="dashboard-card-title">Soil Science & Health</h2>
      <ul className="dashboard-feature-list">
        <li>Soil chemistry tests (NPK, pH, micronutrients, heavy metals)</li>
        <li>Physical soil analysis (texture, compaction, water-holding)</li>
        <li>Microbial & pathogen indicators</li>
        <li>ISO, USDA, NOM-021-RECNAT, GlobalGAP soil compliance</li>
        <li>AI-powered nutrient balance & irrigation efficiency prediction</li>
        <li>Soil health risk alerts and solution matching</li>
      </ul>
      <div className="dashboard-actions">
        <button className="dashboard-btn dashboard-btn-primary" onClick={onFetch}>
          Fetch Latest Soil Reports
        </button>
      </div>
      {loading && <div className="dashboard-loader">Fetching soil reports...</div>}
      <ReportTable reports={reports} />
    </section>
  );
}

// Fertilizer Audit Tab
function FertilizerAuditModule({ onFetch, reports, loading }) {
  return (
    <section>
      <h2 className="dashboard-card-title">Fertilizer Traceability & Audit</h2>
      <ul className="dashboard-feature-list">
        <li>Batch-linked N-P-K ratio tracking for every application</li>
        <li>GPS-based fertilizer mapping for farm plots</li>
        <li>Residue & runoff contamination testing</li>
        <li>ISO, COFEPRIS, EPA, Organic input certifications</li>
        <li>AI-driven risk alerts and eco-efficiency recommendations</li>
        <li>Blockchain-ready chain of custody records</li>
      </ul>
      <div className="dashboard-actions">
        <button className="dashboard-btn dashboard-btn-primary" onClick={onFetch}>
          Fetch Latest Fertilizer Audits
        </button>
      </div>
      {loading && <div className="dashboard-loader">Fetching fertilizer audits...</div>}
      <ReportTable reports={reports} />
    </section>
  );
}

// Environmental Monitor Tab
function EnvironmentalMonitor({ onFetch, reports, loading }) {
  return (
    <section>
      <h2 className="dashboard-card-title">Environmental Traceability & Compliance</h2>
      <ul className="dashboard-feature-list">
        <li>Air emission monitoring (CO2, CH4, N2O, PM2.5, VOCs)</li>
        <li>Waste management & recycling logs</li>
        <li>Geospatial mapping of all field data</li>
        <li>Live compliance status dashboard</li>
        <li>API integration for third-party certification uploads</li>
        <li>Eco Sustainability Index (0Ã¢â‚¬â€œ100) & AI risk flagging</li>
      </ul>
      <div className="dashboard-actions">
        <button className="dashboard-btn dashboard-btn-primary" onClick={onFetch}>
          Fetch Environmental Metrics
        </button>
      </div>
      {loading && <div className="dashboard-loader">Fetching environment metrics...</div>}
      <ReportTable reports={reports} />
    </section>
  );
}

// Certifications Tab
function CertificationUploadPanel() {
  return (
    <section>
      <h2 className="dashboard-card-title">Upload Certifications</h2>
      <ul className="dashboard-feature-list">
        <li>ISO, GlobalGAP, COFEPRIS, EPA, Rainforest Alliance certificates</li>
        <li>Instant blockchain verification and QR code output</li>
        <li>Secure PDF vault and compliance record management</li>
      </ul>
      <div className="dashboard-actions">
        <button className="dashboard-btn dashboard-btn-primary">Upload Certification</button>
      </div>
      {/* Add certification upload form here */}
    </section>
  );
}

// Traceability Map Tab
function TraceabilityMap() {
  return (
    <section>
      <h2 className="dashboard-card-title">Geospatial Traceability Map</h2>
      <ul className="dashboard-feature-list">
        <li>All water, soil, fertilizer, and sensor data mapped in real time</li>
        <li>Farm zones, water sources, soil sample points, IoT device locations</li>
        <li>Blockchain-ready data layers and QR code verification</li>
        <li>Mapbox and D3.js integration for advanced visualizations</li>
      </ul>
      <div className="dashboard-actions">
        <button className="dashboard-btn dashboard-btn-primary">View Interactive Map</button>
      </div>
      {/* Add map viewer integration here */}
    </section>
  );
}

// Advanced Report Table with AI Score
function ReportTable({ reports }) {
  if (!reports || !reports.length) return null;
  return (
    <div className="table-container">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Date</th>
            <th>Summary</th>
            <th>Risk Level</th>
            <th>AI Score</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id}>
              <td>{r.location}</td>
              <td>{r.date}</td>
              <td>{r.summary}</td>
              <td>
                <span className={`risk-badge risk-${r.risk.toLowerCase()}`}>
                  {r.risk}
                </span>
              </td>
              <td>
                <span className={`ai-score ai-score-${r.aiScore >= 80 ? "high" : r.aiScore >= 60 ? "medium" : "low"}`}>
                  {r.aiScore}
                </span>
              </td>
              <td>
                <button className="dashboard-btn dashboard-btn-pdf">Download PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}