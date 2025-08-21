import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MortgageSearchPage from "./pages/MortgageSearch";
import TradeFinancePage from "./pages/TradeFinance";
import LendersPage from "./pages/Lenders";
import ServicesHub from "./pages/ServicesHub";

export default function App(){
  return (
    <BrowserRouter>
      <div>
        <nav style={{display:"flex",gap:12,padding:12,borderBottom:"1px solid #eee"}}>
          <Link to="/">Home</Link>
          <Link to="/mortgage">Mortgage</Link>
          <Link to="/trade-finance">Trade Finance</Link>
          <Link to="/lenders">Lenders</Link>
          <Link to="/services">Services</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/mortgage" element={<MortgageSearchPage/>} />
          <Route path="/trade-finance" element={<TradeFinancePage/>} />
          <Route path="/lenders" element={<LendersPage/>} />
          <Route path="/services" element={<ServicesHub/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}