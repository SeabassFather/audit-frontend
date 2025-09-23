import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Programs from "./pages/Programs.jsx";
import LoanMatch from "./pages/LoanMatch.jsx";
import Compliance from "./pages/Compliance.jsx";
import Elite from "./pages/Elite.jsx";

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: "sans-serif" }}>
        <header style={{ background: "#eee", padding: "10px" }}>
          <h1>AuditDNA</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/programs">Programs</Link> |{" "}
            <Link to="/loan-match">Loan Match</Link> |{" "}
            <Link to="/compliance">Compliance</Link> |{" "}
            <Link to="/elite">Elite</Link>
          </nav>
        </header>
        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/loan-match" element={<LoanMatch />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/elite" element={<Elite />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
