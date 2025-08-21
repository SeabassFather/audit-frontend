import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import "./index.css";

const Home        = lazy(()=>import("./components/Home"));
const USDACompare = lazy(()=>import("./components/USDACompare"));
const FXBoard     = lazy(()=>import("./components/FXBoard").catch(()=>({default:()=> <div className="card glass">FXBoard temporarily unavailable</div>})));
const Mortgage    = lazy(()=>import("./components/Mortgage").catch(()=>({default:()=> <div className="card glass">Mortgage temporarily unavailable</div>})));
const Services    = lazy(()=>import("./components/Services").catch(()=>({default:()=> <div className="card glass">Services temporarily unavailable</div>})));
const Water       = lazy(()=>import("./components/WaterProgram").catch(()=>({default:()=> <div className="card glass">Water Program temporarily unavailable</div>})));
const Finance     = lazy(()=>import("./components/Finance").catch(()=>({default:()=> <div className="card glass">Finance temporarily unavailable</div>})));

function Shell({children}){
  return (<div className="shell">
    <header className="nav glass">
      <div className="brand"><div className="logo3d">AD</div>
        <div><div className="brandTitle">AuditDNA</div><div className="brandSub">Ag  FX  Mortgage  Compliance</div></div>
      </div>
      <nav className="links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/programs">Programs</NavLink>
        <NavLink to="/mortgage">Mortgage</NavLink>
        <NavLink to="/fx">FX</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/water">Water</NavLink>
        <NavLink to="/finance">Financing</NavLink>
      </nav>
    </header>
    <div className="main">{children}</div>
    <footer className="foot"> {new Date().getFullYear()} AuditDNA</footer>
  </div>);
}

export default function App(){
  return (
    <HashRouter>
      <Shell>
        <Suspense fallback={<div className="card glass" style={{padding:24}}>Loading</div>}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/programs" element={<USDACompare/>}/>
            <Route path="/mortgage" element={<Mortgage/>}/>
            <Route path="/fx" element={<FXBoard/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/water" element={<Water/>}/>
            <Route path="/finance" element={<Finance/>}/>
          </Routes>
        </Suspense>
      </Shell>
    </HashRouter>
  );
}