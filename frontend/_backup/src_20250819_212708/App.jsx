import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";`r`nimport MarketSearch from "./pages/MarketSearch";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import MortgageSearchPage from "./pages/MortgageSearchPage";
import WaterTechSearchPage from "./pages/WaterTechSearchPage";
import TradeFinancePage from "./pages/TradeFinancePage";
import MarketplacePage from "./pages/MarketplacePage";
import Compliance from "./pages/Compliance";
import Elite from "./pages/Elite";
import Settings from "./pages/Settings";
import { Home as IHome, Droplets, Landmark, Factory, ShoppingBag, Shield, Settings as ISettings } from "lucide-react";
import "./index.css";

function useHoverBeep(){
  const ctxRef = useMemo(()=>({ctx:null}),[]);
  return ()=>{
    try{
      const AC = window.AudioContext || window.webkitAudioContext;
      ctxRef.ctx = ctxRef.ctx || new AC();
      const ctx = ctxRef.ctx;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine"; o.frequency.value = 1100;
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
      o.connect(g).connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.09);
    }catch(_){}
  };
}

export default function App(){
  const beep = useHoverBeep();
  const links = [
    { to:"/", label:"Home", icon:<IHome className="ico" /> , end:true },
    { to:"/programs", label:"Programs", icon:<Landmark className="ico" /> },
    { to:"/water", label:"Water Tech", icon:<Droplets className="ico" /> },
    { to:"/mortgage", label:"Mortgage", icon:<Shield className="ico" /> },
    { to:"/trade", label:"Trade Finance", icon:<Factory className="ico" /> },
    { to:"/market", label:"Marketplace", icon:<ShoppingBag className="ico" /> },
    { to:"/compliance", label:"Compliance", icon:<Landmark className="ico" /> },
    { to:"/elite", label:"Elite", icon:<Shield className="ico" /> },
    { to:"/settings", label:"Settings", icon:<ISettings className="ico" /> },
  ];
  return (
    <Router>
      <div className="app-layout">
        <aside className="sidebar">
          <div className="brand"><span className="dot"></span> AUDITDNA</div>
          <nav>
            {links.map(l=>(
              <NavLink key={l.to}
                to={l.to}
                end={!!l.end}
                className={({isActive})=>"nav-link " + (isActive?"active-link":"")}
                onMouseEnter={beep}>
                {l.icon}{l.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/programs" element={<Programs/>} />
            <Route path="/water" element={<WaterTechSearchPage/>} />
            <Route path="/mortgage" element={<MortgageSearchPage/>} />
            <Route path="/trade" element={<TradeFinancePage/>} />
            <Route path="/market" element={<MarketplacePage/>} />
            <Route path="/compliance" element={<Compliance/>} />
            <Route path="/elite" element={<Elite/>} />
            <Route path="/settings" element={<Settings/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
