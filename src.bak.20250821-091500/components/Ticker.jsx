import React, { useEffect, useState } from "react";
const drift = (rows, amt) => rows.map(t => {
  const d = (Math.random()*2-1)*amt;
  const px = Math.max(t.min??0.0001, Math.min(t.max??1e9, t.px + d));
  return { ...t, chg: ((px - t.px)/t.px)*100, px };
});
export default function Ticker(){
  const [mkt,setMkt]=useState([{sym:"AAPL",px:229.3},{sym:"MSFT",px:425.8},{sym:"NVDA",px:122.4},{sym:"TSLA",px:236.9},{sym:"META",px:505.1},{sym:"GOOGL",px:192.7},{sym:"BTC",px:61123},{sym:"ETH",px:2880},{sym:"GLD",px:230.2},{sym:"SPY",px:555.3}]);
  const [fx,setFx]=useState([{sym:"EURUSD",px:1.09,fx:true,min:.8,max:1.6},{sym:"GBPUSD",px:1.28,fx:true,min:.9,max:1.8},{sym:"USDJPY",px:154,fx:true,min:90,max:200},{sym:"USDMXN",px:17.25,fx:true,min:10,max:30}]);
  useEffect(()=>{const id=setInterval(()=>{setMkt(m=>drift(m,1.2));setFx(f=>drift(f,0.004));},1500);return()=>clearInterval(id)},[]);
  const Row=({t})=>(<div className={`tick ${t.chg>=0?"up":"dn"}`}><span className="sym">{t.sym}</span><span className="px">{t.fx?t.px.toFixed(5):(t.px>1000?t.px.toFixed(0):t.px.toFixed(2))}</span><span className="chg">{t.chg>=0?"":""} {Math.abs(t.chg||0).toFixed(2)}%</span></div>);
  return(<div className="tapes glass">
    <div className="tape"><div className="tapeTitle">Market</div><div className="tapeRow">{mkt.map((t,i)=><Row key={i} t={t}/>)}</div></div>
    <div className="tape"><div className="tapeTitle">FX</div><div className="tapeRow">{fx.map((t,i)=><Row key={i} t={t}/>)}</div></div>
  </div>);
}