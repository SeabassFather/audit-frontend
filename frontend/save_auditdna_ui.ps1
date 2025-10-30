# Set your frontend src path:
$srcPath = "C:\AuditDNA\AUDIT_DNA_Frontend_Final\frontend\src"

# App.jsx
@"
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import UploadCenter from "./UploadCenter";
import Traceability from "./Traceability";
import Marketplace from "./Marketplace";

function NavBar() {
  const location = useLocation();
  const activeStyle = {
    background: "linear-gradient(90deg, #42a5f5 60%, #90caf9 100%)",
    color: "#fff",
    fontWeight: "bold"
  };

  const buttonStyle = {
    margin: "0 8px",
    padding: "10px 25px",
    borderRadius: "16px",
    background: "#f4fff4",
    border: "1px solid #b4e17b",
    color: "#2a4c60",
    fontWeight: "500",
    cursor: "pointer",
    textDecoration: "none"
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
      <Link to="/" style={location.pathname === "/" ? { ...buttonStyle, ...activeStyle } : buttonStyle}>Dashboard</Link>
      <Link to="/upload" style={location.pathname === "/upload" ? { ...buttonStyle, ...activeStyle } : buttonStyle}>Upload Center</Link>
      <Link to="/trace" style={location.pathname === "/trace" ? { ...buttonStyle, ...activeStyle } : buttonStyle}>Traceability</Link>
      <Link to="/marketplace" style={location.pathname === "/marketplace" ? { ...buttonStyle, ...activeStyle } : buttonStyle}>Marketplace</Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div style={{ background: "linear-gradient(90deg,#42a5f5 60%,#a3e073 100%)", padding: "32px 0 0 0", borderRadius: "0 0 16px 16px" }}>
        <h1 style={{ textAlign: "center", color: "#1a237e", fontWeight: "bold", fontSize: "2em", marginBottom: "6px" }}>
          AuditDNA Water Technology & Traceability
        </h1>
        <div style={{ textAlign: "center", color: "#388e3c", fontWeight: "500", marginBottom: "8px" }}>
          Powered by AI · Agriculture & Water Compliance
        </div>
      </div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadCenter />} />
        <Route path="/trace" element={<Traceability />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </Router>
  );
}
"@ | Set-Content "$srcPath\App.jsx"

# Dashboard.jsx
@"
import React from "react";
import AuditDNAEnvAI from "./AuditDNAEnvAI";

export default function Dashboard() {
  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 30 }}>
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      <div style={{ marginBottom: 30, background: "#fff", padding: 24, borderRadius: 8 }}>
        <div>
          <b>Lab Reports & Audits</b>
          <ul>
            <li>Upload Water Quality Data</li>
            <li>EPA/FDA/USDA Compliance</li>
            <li>Soil & Irrigation Analysis</li>
          </ul>
        </div>
        <div>
          <b>Traceability & Insights</b>
          <ul>
            <li>Track Commodities & Regions</li>
            <li>Certification Status</li>
            <li>GlobalGAP, SGMA, Produce Safety</li>
          </ul>
        </div>
        <div>
          <b>Marketplace & Sustainability</b>
          <ul>
            <li>Filtration & Desalination Vendors</li>
            <li>Eco-Footprint Reporting</li>
            <li>IoT Sensor Integration</li>
          </ul>
        </div>
        <div style={{ marginTop: 16 }}>
          <button style={{ marginRight: 8 }}>Print/Export PDF</button>
          <button>Email Findings</button>
        </div>
      </div>
      <table style={{ marginBottom: 40, border: "1px solid #cce", borderRadius: 6, width: "100%", background: "#f6fff6" }}>
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
            <td><a href="#">Download</a></td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: 40 }}>
        <AuditDNAEnvAI />
      </div>
    </div>
  );
}
"@ | Set-Content "$srcPath\Dashboard.jsx"

# UploadCenter.jsx
@"
import React from "react";
export default function UploadCenter() {
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 30, background: "#fff", borderRadius: 8 }}>
      <h2>Upload Center</h2>
      <p>Upload lab reports, water test results, or documents here.</p>
      <div style={{border:"1px dashed #8bc34a", padding:24, marginTop:14, borderRadius:8}}>
        <b>Coming soon: File upload module!</b>
      </div>
    </div>
  );
}
"@ | Set-Content "$srcPath\UploadCenter.jsx"

# Traceability.jsx
@"
import React from "react";
export default function Traceability() {
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 30, background: "#fff", borderRadius: 8 }}>
      <h2>Traceability</h2>
      <ul>
        <li>Track batch origins, certifications, and lab results</li>
        <li>Commodity movement and region mapping</li>
        <li>Compliance and audit trail</li>
      </ul>
      <div style={{border:"1px dashed #1976d2", padding:24, marginTop:14, borderRadius:8}}>
        <b>Traceability module coming soon!</b>
      </div>
    </div>
  );
}
"@ | Set-Content "$srcPath\Traceability.jsx"

# Marketplace.jsx
@"
import React from "react";
export default function Marketplace() {
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 30, background: "#fff", borderRadius: 8 }}>
      <h2>Marketplace</h2>
      <ul>
        <li>Filtration and desalination vendors</li>
        <li>Eco-footprint reporting solutions</li>
        <li>IoT sensor integration services</li>
      </ul>
      <div style={{border:"1px dashed #42a5f5", padding:24, marginTop:14, borderRadius:8}}>
        <b>Marketplace module coming soon!</b>
      </div>
    </div>
  );
}
"@ | Set-Content "$srcPath\Marketplace.jsx"

# AuditDNAEnvAI.jsx
@"
import React, { useState } from "react";
import axios from "axios";

const defaultInput = {
  trace: { batchId: "", origin: "", grower: "" },
  water: { pH: "", nitrate: "", turbidity: "", source: "" },
  soil: { salinity: "", pH: "", organic: "", moisture: "" },
  fertilizer: { type: "", amount: "" },
  environment: { temperature: "", humidity: "" }
};

export default function AuditDNAEnvAI() {
  const [inputs, setInputs] = useState(defaultInput);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleInputChange(e, category, field) {
    setInputs({
      ...inputs,
      [category]: {
        ...inputs[category],
        [field]: e.target.value
      }
    });
  }

  async function analyzeAI() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await axios.post("http://localhost:8001/api/ai/analyze", inputs);
      setResult(res.data);
    } catch (err) {
      setError(err.message || "API error");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 30, border: "1px solid #ccc", borderRadius: 8, background: "#fff" }}>
      <h2 style={{textAlign: "center"}}>AuditDNA Environment AI Analyzer</h2>
      <form onSubmit={e => { e.preventDefault(); analyzeAI(); }}>
        <fieldset style={{ marginBottom: 20, padding:10 }}>
          <legend><b>Trace Data</b></legend>
          <label style={{marginRight:10}}>
            Batch ID:
            <input type="text" value={inputs.trace.batchId} onChange={e => handleInputChange(e, "trace", "batchId")} style={{marginLeft:5}} />
          </label>
          <label style={{marginRight:10}}>
            Origin:
            <input type="text" value={inputs.trace.origin} onChange={e => handleInputChange(e, "trace", "origin")} style={{marginLeft:5}} />
          </label>
          <label>
            Grower:
            <input type="text" value={inputs.trace.grower} onChange={e => handleInputChange(e, "trace", "grower")} style={{marginLeft:5}} />
          </label>
        </fieldset>
        <fieldset style={{ marginBottom: 20, padding:10 }}>
          <legend><b>Water</b></legend>
          <label style={{marginRight:10}}>
            pH:
            <input type="number" step="0.01" value={inputs.water.pH} onChange={e => handleInputChange(e, "water", "pH")} style={{marginLeft:5, width:70}} />
          </label>
          <label style={{marginRight:10}}>
            Nitrate:
            <input type="number" step="0.01" value={inputs.water.nitrate} onChange={e => handleInputChange(e, "water", "nitrate")} style={{marginLeft:5, width:70}} />
          </label>
          <label style={{marginRight:10}}>
            Turbidity:
            <input type="number" step="0.01" value={inputs.water.turbidity} onChange={e => handleInputChange(e, "water", "turbidity")} style={{marginLeft:5, width:70}} />
          </label>
          <label>
            Source:
            <input type="text" value={inputs.water.source} onChange={e => handleInputChange(e, "water", "source")} style={{marginLeft:5}} />
          </label>
        </fieldset>
        <fieldset style={{ marginBottom: 20, padding:10 }}>
          <legend><b>Soil</b></legend>
          <label style={{marginRight:10}}>
            Salinity:
            <input type="number" step="0.01" value={inputs.soil.salinity} onChange={e => handleInputChange(e, "soil", "salinity")} style={{marginLeft:5, width:70}} />
          </label>
          <label style={{marginRight:10}}>
            pH:
            <input type="number" step="0.01" value={inputs.soil.pH} onChange={e => handleInputChange(e, "soil", "pH")} style={{marginLeft:5, width:70}} />
          </label>
          <label style={{marginRight:10}}>
            Organic (%):
            <input type="number" step="0.01" value={inputs.soil.organic} onChange={e => handleInputChange(e, "soil", "organic")} style={{marginLeft:5, width:70}} />
          </label>
          <label>
            Moisture (%):
            <input type="number" step="0.01" value={inputs.soil.moisture} onChange={e => handleInputChange(e, "soil", "moisture")} style={{marginLeft:5, width:70}} />
          </label>
        </fieldset>
        <fieldset style={{ marginBottom: 20, padding:10 }}>
          <legend><b>Fertilizer</b></legend>
          <label style={{marginRight:10}}>
            Type:
            <input type="text" value={inputs.fertilizer.type} onChange={e => handleInputChange(e, "fertilizer", "type")} style={{marginLeft:5}} />
          </label>
          <label>
            Amount:
            <input type="number" step="0.01" value={inputs.fertilizer.amount} onChange={e => handleInputChange(e, "fertilizer", "amount")} style={{marginLeft:5, width:70}} />
          </label>
        </fieldset>
        <fieldset style={{ marginBottom: 20, padding:10 }}>
          <legend><b>Environment</b></legend>
          <label style={{marginRight:10}}>
            Temperature (°C):
            <input type="number" step="0.01" value={inputs.environment.temperature} onChange={e => handleInputChange(e, "environment", "temperature")} style={{marginLeft:5, width:70}} />
          </label>
          <label>
            Humidity (%):
            <input type="number" step="0.01" value={inputs.environment.humidity} onChange={e => handleInputChange(e, "environment", "humidity")} style={{marginLeft:5, width:70}} />
          </label>
        </fieldset>
        <button type="submit" disabled={loading} style={{padding:"8px 24px", fontSize:"1.1em"}}>
          {loading ? "Analyzing..." : "Run AI Analysis"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 20 }}>Error: {error}</div>}
      {result && (
        <div style={{ marginTop: 30, background: "#f9f9f9", padding: 20, borderRadius: 8, border: "1px solid #ddd" }}>
          <h3>Results</h3>
          <div><b>EcoIndex:</b> {result.EcoIndex}</div>
          <div><b>Risk Flags:</b> {result.RiskFlags && result.RiskFlags.length ? result.RiskFlags.join(", ") : "None"}</div>
          <div><b>Recommended Actions:</b>
            <ul>
              {result.RecommendedActions && result.RecommendedActions.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>
          {result.Explain && (
            <div>
              <b>Explain:</b>
              <ul>
                {result.Explain.map((msg, i) => <li key={i}>{msg}</li>)}
              </ul>
            </div>
          )}
          {result.Summary && <div><b>Summary:</b> {result.Summary}</div>}
          {result.Trace && (
            <div style={{ marginTop: 20 }}>
              <h4>Trace Data:</h4>
              <div><b>Batch ID:</b> {result.Trace.batchId}</div>
              <div><b>Origin:</b> {result.Trace.origin}</div>
              <div><b>Grower:</b> {result.Trace.grower}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
"@ | Set-Content "$srcPath\AuditDNAEnvAI.jsx"

Write-Host "All AuditDNA React UI files saved to $srcPath!"