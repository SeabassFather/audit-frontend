import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import USDA from "./pages/USDA.jsx";
import Produce from "./pages/Produce.jsx";
import Moxxi from "./pages/Moxxi.jsx";
import RealEstate from "./pages/RealEstate.jsx";

export default function App(){
  return <BrowserRouter><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/usda" element={<USDA/>}/>
    <Route path="/produce" element={<Produce/>}/>
    <Route path="/mortgage/moxxi" element={<Moxxi/>}/>
    <Route path="/real-estate" element={<RealEstate/>}/>
  </Routes></BrowserRouter>;
}