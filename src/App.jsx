import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Protected from "./components/Protected";
import Spinner from "./components/Spinner";

// Lazy pages
const Dashboard            = lazy(()=>import("./pages/Dashboard"));
const Services             = lazy(()=>import("./pages/Services"));
const ServiceDetail        = lazy(()=>import("./pages/ServiceDetail"));
const Auditing             = lazy(()=>import("./pages/Auditing"));
const Compliance           = lazy(()=>import("./pages/Compliance"));
const Pricing              = lazy(()=>import("./pages/Pricing"));
const Mortgage             = lazy(()=>import("./pages/Mortgage"));
const Factoring            = lazy(()=>import("./pages/Factoring"));
const CaseFlow             = lazy(()=>import("./pages/CaseFlow"));
const Tickers              = lazy(()=>import("./pages/Tickers"));
const Engines              = lazy(()=>import("./pages/Engines"));
const Findings             = lazy(()=>import("./pages/Findings"));
const Results              = lazy(()=>import("./pages/Results"));
const Modules              = lazy(()=>import("./pages/Modules"));
const ModuleAg             = lazy(()=>import("./pages/ModuleAg"));
const ModuleMortgage       = lazy(()=>import("./pages/ModuleMortgage"));
const ModuleAudit          = lazy(()=>import("./pages/ModuleAudit"));
const ModuleCompliance     = lazy(()=>import("./pages/ModuleCompliance"));
const Login                = lazy(()=>import("./pages/Login"));
const Admin                = lazy(()=>import("./pages/Admin"));
const MortgageSearchPage   = lazy(()=>import("./pages/MortgageSearchPage"));
const AgMarketplaceSearchPage = lazy(()=>import("./pages/AgMarketplaceSearchPage"));
const TradeFinanceSearchPage  = lazy(()=>import("./pages/TradeFinanceSearchPage"));

import Uploads from "./pages/Uploads";
export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-sky-50 to-green-50 text-gray-900">
      <Ticker/>
      <Navbar/>
      <main className="container px-3 md:px-4 py-6 space-y-8">
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/modules" element={<Modules/>}/>
            <Route path="/module/ag" element={<ModuleAg/>}/>
            <Route path="/module/mortgage" element={<ModuleMortgage/>}/>
            <Route path="/module/audit" element={<ModuleAudit/>}/>
            <Route path="/module/compliance" element={<ModuleCompliance/>}/>

            <Route path="/services" element={<Services/>}/>
            <Route path="/service/:id" element={<ServiceDetail/>}/>

            <Route path="/auditing" element={<Auditing/>}/>
            <Route path="/compliance" element={<Compliance/>}/>
            <Route path="/pricing" element={<Pricing/>}/>
            <Route path="/mortgage" element={<Mortgage/>}/>
            <Route path="/mortgage-search" element={<MortgageSearchPage/>}/>
            <Route path="/ag-market" element={<AgMarketplaceSearchPage/>}/>
            <Route path="/trade-finance" element={<TradeFinanceSearchPage/>}/>
            <Route path="/factoring" element={<Factoring/>}/>
            <Route path="/caseflow" element={<CaseFlow/>}/>
            <Route path="/tickers" element={<Tickers/>}/>
            <Route path="/engines" element={<Engines/>}/>
            <Route path="/findings" element={<Findings/>}/>
            <Route path="/results" element={<Results/>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path="/admin" element={<Protected><Admin/></Protected>}/>
            <Route path="/uploads" element={<Uploads/>}/> 
        </Routes>
        </Suspense>
      </main>
      <Footer/>
    </div>
  );
}