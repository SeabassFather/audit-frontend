import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import "./styles.css";
import Dashboard from "./pages/Dashboard.jsx";
import Prices from "./pages/Prices.jsx";
import Mortgage from "./pages/Mortgage.jsx";
import Factoring from "./pages/Factoring.jsx";
import Services from "./pages/Services.jsx";
import Compliance from "./pages/Compliance.jsx";
import Search from "./pages/Search.jsx";
import EliteModulesPage from "./pages/EliteModulesPage.jsx";
const Tab = ({ to, label }) => (
  <NavLink to={to} className="tab">
    {label}
  </NavLink>
);
function App() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div className="topbar">
        <div className="topbar-inner">
          <span className="brand"> AuditDNA</span>
          <Tab to="/" label="Dashboard" />
          <Tab to="/prices" label="USDA Prices" />
          <Tab to="/mortgage" label="Mortgage" />
          <Tab to="/factoring" label="Ag Factoring" />
          <Tab to="/services" label="Services" />
          <Tab to="/compliance" label="Compliance" />
          <Tab to="/elite-modules" label="Elite Modules" />
          <Tab to="/search" label="Global Search" />
        </div>
      </div>
      <main className="container" style={{ flex: "1 1 auto" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/mortgage" element={<Mortgage />} />
          <Route path="/factoring" element={<Factoring />} />
          <Route path="/services" element={<Services />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/elite-modules" element={<EliteModulesPage />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
    </div>
  );
}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
