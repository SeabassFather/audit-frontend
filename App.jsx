import React from "react";
import { Routes, Route } from "react-router-dom";
import MexicoLoanMatcher from "./pages/MexicoLoanMatcher";

function App() {
  return (
    <Routes>
      <Route path="/loan-match-mexico" element={<MexicoLoanMatcher />} />
      {/* ...other routes */}
    </Routes>
  );
}

export default App;
