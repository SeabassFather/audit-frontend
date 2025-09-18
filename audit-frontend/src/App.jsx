import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import PricingUSDA from "./pages/PricingUSDA.jsx";
import Admin from "./pages/Admin.jsx";

function Icon({label}){ return <span aria-hidden className="inline-grid place-items-center w-5 h-5 rounded bg-silver-200 text-gray-700 text-[10px] font-semibold">{label}</span>; }

function Navbar(){
  return (
    <header className="bg-white/90 backdrop-blur border-b border-silver-200">
      <div className="container py-3 flex items-center gap-4">
        <NavLink to="/" className="flex items-center gap-2 text-ocean-700 font-bold text-lg">
          <span className="inline-grid place-items-center w-9 h-9 rounded-xl2 bg-ocean-600 text-white shadow-soft">AD</span>
          <span>AuditDNA</span>
        </NavLink>
        <nav className="hidden md:flex items-center gap-5 ml-6">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/services" className="flex items-center gap-1"><Icon label="SV" />Services</NavLink>
          <NavLink to="/usda-pricing" className="flex items-center gap-1"><Icon label="PR" />USDA Pricing</NavLink>
          <NavLink to="/admin" className="flex items-center gap-1"><Icon label="AD" />Admin</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-6 space-y-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/usda-pricing" element={<PricingUSDA/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </main>
    </div>
  );
}