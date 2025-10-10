import React from "react";

export default function Programs() {
  return (
    <div className="container">
      <h1>📑 Programs & Services</h1>
      <p>Select a category below to explore available programs.</p>

      <div className="card-grid">
        <div className="card">
          <h3>Agriculture Loans 🌱</h3>
          <p>Support for farming, crops, and agri-business projects.</p>
        </div>
        <div className="card">
          <h3>Water Projects 💧</h3>
          <p>Financing irrigation, conservation, and sustainability.</p>
        </div>
        <div className="card">
          <h3>Factoring 📊</h3>
          <p>
            Improve cash flow with invoice factoring and receivables funding.
          </p>
        </div>
        <div className="card">
          <h3>Mortgage Loans 🏠</h3>
          <p>Find mortgage options tailored to your financial needs.</p>
        </div>
      </div>

      {/* Example Toggle */}
      <div className="toggle">
        <input type="checkbox" id="alerts" />
        <label htmlFor="alerts">Enable Email Alerts</label>
      </div>
    </div>
  );
}
