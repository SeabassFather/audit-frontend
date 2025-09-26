import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import USDA from "./pages/USDA";
import Mortgage from "./pages/Mortgage";
import Factoring from "./pages/Factoring";

export default function App(){
  return (
    <BrowserRouter>
      <nav className="flex gap-4 p-4 border-b">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/usda">USDA Pricing</NavLink>
        <NavLink to="/mortgage">Mortgage</NavLink>
        <NavLink to="/factoring">Ag Factoring</NavLink>
      </nav>
      <Routes>
        <Route path="/usda" element={<USDA/>}/>
        <Route path="/mortgage" element={<Mortgage/>}/>
        <Route path="/factoring" element={<Factoring/>}/>
        <Route path="/" element={<div className="p-6">Welcome to AuditDNA</div>}/>
      </Routes>
    </BrowserRouter>
  );
}