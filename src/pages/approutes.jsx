import React from "react";
import { Routes, Route } from "react-router-dom";
import AgPage from "./pages/AgPage";
// import WaterTechPage from "./pages/WaterTechPage";
// import FactoringPage from "./pages/FactoringPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/ag" element={<AgPage />} />
      {/* <Route path="/water-tech" element={<WaterTechPage />} /> */}
      {/* <Route path="/factoring" element={<FactoringPage />} /> */}
      {/* ...other routes... */}
    </Routes>
  );
}
