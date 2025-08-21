import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import ServiceDetail from "./pages/ServiceDetail";
import AgExplorer from "./pages/AgExplorer";
import USDA from "./pages/USDA";
import ProduceInquiry from "./pages/ProduceInquiry";
import LenderMatch from "./pages/LenderMatch";
import Elite from "./pages/Elite";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function Topbar(){
  const loc = useLocation();
  useEffect(()=>{ document.title = "AuditDNA"; }, [loc]);
  return (
    <header className="topbar">
      <div className="left"><span className="title">Control Panel</span></div>
      <div className="right"><span className="pill">Local 3000</span></div>
    </header>
  );
}

export default function App(){
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/cat/:slug" element={<Category/>}/>
            <Route path="/service/:id" element={<ServiceDetail/>}/>

            <Route path="/ag" element={<AgExplorer/>}/>
            <Route path="/usda" element={<USDA/>}/>
            <Route path="/inquiry" element={<ProduceInquiry/>}/>
            <Route path="/lenders" element={<LenderMatch/>}/>
            <Route path="/elite" element={<Elite/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}