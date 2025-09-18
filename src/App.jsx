import { Routes, Route } from "react-router-dom";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Auditing from "./pages/Auditing";
import Compliance from "./pages/Compliance";
import Pricing from "./pages/Pricing";
import Mortgage from "./pages/Mortgage";
import Factoring from "./pages/Factoring";
import CaseFlow from "./pages/CaseFlow";
import Tickers from "./pages/Tickers";
import Engines from "./pages/Engines";
import Findings from "./pages/Findings";
import Results from "./pages/Results";
import MortgageSearchPage from "./pages/MortgageSearchPage";
import AgMarketplaceSearchPage from "./pages/AgMarketplaceSearchPage";
import TradeFinanceSearchPage from "./pages/TradeFinanceSearchPage";

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-sky-50 to-green-50 text-gray-900">
      <Ticker/>
      <Navbar/>
      <main className="container px-4 py-6 space-y-8">
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/service/:id" element={<ServiceDetail/>}/>
          <Route path="/auditing" element={<Auditing/>}/>
          <Route path="/compliance" element={<Compliance/>}/>
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/mortgage" element={<Mortgage/>}/>
          <Route path="/factoring" element={<Factoring/>}/>
          <Route path="/caseflow" element={<CaseFlow/>}/>
          <Route path="/tickers" element={<Tickers/>}/>
          <Route path="/engines" element={<Engines/>}/>
          <Route path="/findings" element={<Findings/>}/>
          <Route path="/results" element={<Results/>}/>
          <Route path="/mortgage-search" element={<MortgageSearchPage/>}/>
          <Route path="/ag-market" element={<AgMarketplaceSearchPage/>}/>
          <Route path="/trade-finance" element={<TradeFinanceSearchPage/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}