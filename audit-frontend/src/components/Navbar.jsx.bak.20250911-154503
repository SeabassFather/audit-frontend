import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Icon({label}){
  return (
    <span aria-hidden className="inline-grid place-items-center w-5 h-5 rounded bg-silver-200 text-gray-700 text-[10px] font-semibold">
      {label}
    </span>
  );
}

export default function Navbar(){
  const [mode,setMode] = useState(localStorage.getItem("adna-mode")||"Demo");
  useEffect(()=>{ localStorage.setItem("adna-mode", mode); },[mode]);
  return (
    <header className="bg-white/90 backdrop-blur border-b border-silver-200">
      <div className="container py-3 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 text-ocean-800 font-bold text-lg">
          <span className="inline-grid place-items-center w-9 h-9 rounded-xl2 bg-ocean-600 text-white shadow-soft">AD</span>
          <span>AuditDNA</span>
        </a>
        <nav className="hidden md:flex items-center gap-5 ml-6">
          <a href="/" className="active">Home</a>
          <a href="/services" className="flex items-center gap-1"><Icon label="SV"/>Services</a>
          <a href="/usda-pricing" className="flex items-center gap-1"><Icon label="PR"/>USDA Pricing</a>
          <a href="/files" className="flex items-center gap-1"><Icon label="FL"/>Files</a>
          <a href="/docusign" className="flex items-center gap-1"><Icon label="DS"/>DocuSign</a>
          <a href="/admin" className="flex items-center gap-1"><Icon label="AD"/>Admin</a>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="pill">{mode} Mode</span>
          <button className="btn" onClick={()=>setMode(m=> m==="Demo"?"Live":"Demo")}>Toggle Demo/Live</button>
          <a className="btn btn-primary" href="#demo" onClick={(e)=>e.preventDefault()}>
            <Icon label=":)"/> Demo Walkthrough
          </a>
        </div>
      </div>
    </header>
  );
}