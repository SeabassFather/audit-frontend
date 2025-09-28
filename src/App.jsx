import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import USDA from "./pages/Usda";
import Mortgage from "./pages/Mortgage";
import Factoring from "./pages/Factoring";
import Compliance from "./pages/Compliance";
import WaterTechPage from "./pages/WaterTechPage";
import Audit from "./pages/Audit";
import AuditReport from "./pages/AuditReport";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/usda" element={<USDA />} />
          <Route path="/mortgage" element={<Mortgage />} />
          <Route path="/factoring" element={<Factoring />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/water-tech" element={<WaterTechPage />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/audit-report" element={<AuditReport />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}