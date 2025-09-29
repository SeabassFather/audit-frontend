import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import USDA from "./pages/USDA";
import Mortgage from "./pages/Mortgage";
import Factoring from "./pages/Factoring";
import Compliance from "./pages/Compliance";
import WaterTech from "./pages/WaterTech";
import MexicoFinance from "./pages/MexicoFinance";
import Reports from "./pages/Reports";
import services from "./lib/services.json";

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usda" element={<USDA />} />
            <Route path="/mortgage" element={<Mortgage />} />
            <Route path="/factoring" element={<Factoring />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/watertech" element={<WaterTech />} />
            <Route path="/mexico-finance" element={<MexicoFinance />} />
            <Route path="/reports" element={<Reports />} />
            {services.map(svc => (
              <Route
                key={svc.id}
                path={svc.link}
                element={
                  <div>
                    <h1 className="text-xl font-bold">{svc.name}</h1>
                    <p>No Data Available</p>
                  </div>
                }
              />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}
