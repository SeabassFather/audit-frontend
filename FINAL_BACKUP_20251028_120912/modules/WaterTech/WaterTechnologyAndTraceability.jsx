import React, { useState } from "react";
import "./watertech-agriculture.css";

function DashboardCards() {
  return (
    <div className="dashboard-cards">
      <div className="dashboard-card">
        <h3>Lab Reports & Audits</h3>
        <ul>
          <li>Upload Water Quality Data</li>
          <li>EPA/FDA/USDA Compliance</li>
          <li>Soil & Irrigation Analysis</li>
        </ul>
      </div>
      <div className="dashboard-card">
        <h3>Traceability & Insights</h3>
        <ul>
          <li>Track Commodities & Regions</li>
          <li>Certification Status</li>
          <li>GlobalGAP, SGMA, Produce Safety</li>
        </ul>
      </div>
      <div className="dashboard-card">
        <h3>Marketplace & Sustainability</h3>
        <ul>
          <li>Filtration & Desalination Vendors</li>
          <li>Eco-Footprint Reporting</li>
          <li>IoT Sensor Integration</li>
        </ul>
      </div>
    </div>
  );
}

function DataTable() {
  return (
    <div className="table-container">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Region</th>
            <th>Lab</th>
            <th>Test Date</th>
            <th>Certification</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Central Farm</td>
            <td>San Joaquin Valley</td>
            <td>AgriLabX</td>
            <td>2025-10-01</td>
            <td>USDA/SGMA</td>
            <td><a href="#" className="dashboard-link">Download</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function WaterTechnologyAndTraceability() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="dashboard-bg">
      {/* Sticky Header */}
      <header className="dashboard-header">
        <h1>AuditDNA Water Technology & Traceability</h1>
        <h2>Powered by AI Ã‚Â· Agriculture & Water Compliance</h2>
      </header>

      {/* Tabs */}
      <nav className="dashboard-tabs">
        <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button className={activeTab === "upload" ? "active" : ""} onClick={() => setActiveTab("upload")}>Upload Center</button>
        <button className={activeTab === "traceability" ? "active" : ""} onClick={() => setActiveTab("traceability")}>Traceability</button>
        <button className={activeTab === "marketplace" ? "active" : ""} onClick={() => setActiveTab("marketplace")}>Marketplace</button>
      </nav>

      <main className="dashboard-main">
        {activeTab === "dashboard" && (
          <>
            <DashboardCards />
            <div className="dashboard-actions">
              <button className="dashboard-btn dashboard-btn-primary">Print/Export PDF</button>
              <button className="dashboard-btn dashboard-btn-secondary">Email Findings</button>
            </div>
            <DataTable />
          </>
        )}
        {activeTab !== "dashboard" && (
          <div className="dashboard-placeholder">
            <h3>Coming soon: {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} module!</h3>
          </div>
        )}
      </main>
    </div>
  );
}