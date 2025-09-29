import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import USDA from "./pages/USDA";
import MortgageSearchPage from "./pages/MortgageSearchPage";
import MexicoFinance from "./pages/MexicoFinance";
import WaterTech from "./pages/WaterTech";
import AuditReport from "./pages/AuditReport";
import ServicesPage from "./pages/Services";

import services from "./lib/services";

function App() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const match = services.find((svc) =>
      svc.name.toLowerCase().includes(query.toLowerCase())
    );

    if (match) {
      navigate(match.link);
    } else {
      navigate("/services");
    }
    setQuery("");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex justify-between items-center">
          <div className="font-bold text-xl text-blue-700">AuditDNA</div>
          <div className="flex gap-4 text-sm items-center">
            {[
              ["/", "Dashboard"],
              ["/usda", "USDA Pricing"],
              ["/mortgage", "Mortgage"],
              ["/finance", "Mexico Finance"],
              ["/water", "Water Tech"],
              ["/audit", "Audit Reports"],
              ["/services", "Services"]
            ].map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  "px-2 py-1 rounded-md " +
                  (isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100")
                }
              >
                {label}
              </NavLink>
            ))}
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search all services"
                className="px-2 py-1 border rounded text-sm"
              />
              <button
                type="submit"
                className="ml-2 px-2 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Go
              </button>
            </form>
          </div>
        </nav>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/usda" element={<USDA />} />
            <Route path="/mortgage" element={<MortgageSearchPage />} />
            <Route path="/finance" element={<MexicoFinance />} />
            <Route path="/water" element={<WaterTech />} />
            <Route path="/audit" element={<AuditReport />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
