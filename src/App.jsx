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
  const [suggestions, setSuggestions] = useState([]);
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
    setSuggestions([]);
  };

  const handleInput = (val) => {
    setQuery(val);
    if (!val) {
      setSuggestions([]);
      return;
    }
    const results = services
      .filter((svc) =>
        svc.name.toLowerCase().includes(val.toLowerCase())
      )
      .slice(0, 10);
    setSuggestions(results);
  };

  const handleSelect = (svc) => {
    navigate(svc.link);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex justify-between items-center relative">
          <div className="font-bold text-xl text-blue-700">AuditDNA</div>
          <div className="flex gap-4 text-sm items-center relative">
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

            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => handleInput(e.target.value)}
                placeholder="Search all services…"
                className="px-2 py-1 border rounded text-sm"
              />
              {suggestions.length > 0 && (
                <ul className="absolute left-0 top-9 bg-white border border-gray-200 shadow-md rounded w-72 max-h-72 overflow-y-auto z-50">
                  {suggestions.map((svc) => (
                    <li
                      key={svc.id}
                      onClick={() => handleSelect(svc)}
                      className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                    >
                      <span className="font-medium">{svc.name}</span>
                      <span className="text-gray-500 text-xs ml-2">
                        — {svc.category}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
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
