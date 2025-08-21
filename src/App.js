import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Shell from "./components/Shell";
import Dashboard from "./pages/Dashboard";
import Elite from "./pages/Elite";
import Compliance from "./pages/Compliance";
import USDA from "./pages/USDA";
import LenderMatch from "./pages/LenderMatch";
import ProduceInquiry from "./pages/ProduceInquiry";
import Zadarma from "./pages/Zadarma";
import Settings from "./pages/Settings";
import About from "./pages/About";
import ErrorBoundary from "./components/ErrorBoundary";
export default function App(){
  return(<ErrorBoundary><Shell>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/elite' element={<Elite/>}/>
      <Route path='/compliance' element={<Compliance/>}/>
      <Route path='/usda' element={<USDA/>}/>
      <Route path='/lender-match' element={<LenderMatch/>}/>
      <Route path='/forms/produce-inquiry' element={<ProduceInquiry/>}/>
      <Route path='/zadarma' element={<Zadarma/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='*' element={<Navigate to='/' replace/>}/>
    </Routes>
  </Shell></ErrorBoundary>);
}