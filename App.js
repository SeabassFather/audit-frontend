import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./simple-theme.css";

// === ROUTE COMPONENTS ===
import HomePage from "./Dashboard";
import LabDashboard from "./LabDashboard";
import WaterTechModuleAdvanced from "./WaterTechModuleAdvanced";
import SoilAnalysisModule from "./SoilAnalysisModule";
import AlcoholAnalysisModule from "./AlcoholAnalysisModule";
import FuelOilAnalysisModule from "./FuelOilAnalysisModule";
import EnginePerformanceModule from "./EnginePerformanceModule";
import TestingServicesHub from "./TestingServicesHub";
import ResultsPortal from "./ResultsPortal";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/lab", label: "Lab" },
    { to: "/water", label: "Water (50)" },
    { to: "/soil", label: "Soil (40)" },
    { to: "/alcohol", label: "Alcohol (25)" },
    { to: "/fuel", label: "Fuel (30)" },
    { to: "/engine", label: "Engine (20)" },
    { to: "/testing", label: "Testing Hub" },
    { to: "/results", label: "Results" },
  ];

  return (
    <Router>
      <div className={`app-shell ${collapsed ? "collapsed" : ""}`}>
        {/* ===== SIDEBAR ===== */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">⚙️ AuditDNA</h2>
            <button className="toggle-btn" onClick={toggleSidebar}>
              {collapsed ? "➡️" : "⬅️"}
            </button>
          </div>
          <nav className="nav-list">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="nav-item">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="main-content fade-in">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lab" element={<LabDashboard />} />
            <Route path="/water" element={<WaterTechModuleAdvanced />} />
            <Route path="/soil" element={<SoilAnalysisModule />} />
            <Route path="/alcohol" element={<AlcoholAnalysisModule />} />
            <Route path="/fuel" element={<FuelOilAnalysisModule />} />
            <Route path="/engine" element={<EnginePerformanceModule />} />
            <Route path="/testing" element={<TestingServicesHub />} />
            <Route path="/results" element={<ResultsPortal />} />
          </Routes>

          <footer className="footer">
            <p>
              Powered by <strong>AuditDNA Intelligence</strong> • MexaUSA Food Group ©{" "}
              {new Date().getFullYear()}
            </p>
          </footer>
        </main>
      </div>
    </Router>
  );
}

export default App;
