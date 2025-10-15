import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TradePortal from "./pages/TradePortal";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trade-portal" element={<TradePortal />} />
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;
