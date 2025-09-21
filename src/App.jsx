import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Ticker from "./components/Ticker";
import Footer from "./components/Footer";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Services  = lazy(() => import("./pages/Services"));
const Engines   = lazy(() => import("./pages/Engines"));
const Findings  = lazy(() => import("./pages/Findings"));
const Results   = lazy(() => import("./pages/Results"));
const Uploads   = lazy(() => import("./pages/Uploads"));
const Modules   = lazy(() => import("./pages/Modules"));
const Admin     = lazy(() => import("./pages/Admin"));
const Login     = lazy(() => import("./pages/Login"));

function Spinner(){
  return <div className="p-6 text-center text-sm text-slate-500">Loading…</div>;
}

export default function App(){
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <Ticker/>
      <Navbar/>
      <main className="container px-3 md:px-4 py-6">
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/engines" element={<Engines/>}/>
            <Route path="/findings" element={<Findings/>}/>
            <Route path="/results" element={<Results/>}/>
            <Route path="/uploads" element={<Uploads/>}/>
            <Route path="/modules" element={<Modules/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Suspense>
      </main>
      <Footer/>
    </div>
  );
}