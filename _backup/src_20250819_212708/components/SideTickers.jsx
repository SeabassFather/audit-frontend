import React, { useState } from "react";
import { apiGet } from "../utils/api";
import { LineChart, Landmark, Factory, DollarSign } from "lucide-react";

export default function SideTickers(){
  return (
    <div className="grid" style={{gap:10}}>
      <TickerStock/>
      <TickerMortgage/>
      <TickerUsda/>
      <TickerFX/>
    </div>
  );
}
function Card({icon:Icon, title, children}){
  return (
    <div className="page-card">
      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6,color:"#4d5660"}}>
        <Icon size={16}/><strong>{title}</strong>
      </div>
      {children}
    </div>
  );
}
function TickerStock(){
  const [symbol,setSymbol]=useState("AAPL"); const [d,setD]=useState(null); const [e,setE]=useState("");
  const go=async()=>{ setE(""); setD(null); try{ setD(await apiGet(`/api/tickers/stock?symbol=${encodeURIComponent(symbol)}`)); }catch(err){ setE(String(err)); } };
  return (
    <Card icon={LineChart} title="Stock">
      <input className="input" value={symbol} onChange={e=>setSymbol(e.target.value)} />
      <button className="btn" style={{marginTop:6}} onClick={go}>Get</button>
      {e && <small className="muted">{e}</small>}
      {d && <div style={{marginTop:6,fontFamily:"ui-monospace"}}>{d.symbol}: {d.price ?? ""}</div>}
    </Card>
  );
}
function TickerMortgage(){
  const [series,setSeries]=useState("MORTGAGE30US"); const [d,setD]=useState(null); const [e,setE]=useState("");
  const go=async()=>{ setE(""); setD(null); try{ setD(await apiGet(`/api/tickers/mortgage?series=${encodeURIComponent(series)}`)); }catch(err){ setE(String(err)); } };
  return (
    <Card icon={Landmark} title="Mortgage (FRED)">
      <input className="input" value={series} onChange={e=>setSeries(e.target.value)} />
      <button className="btn" style={{marginTop:6}} onClick={go}>Get</button>
      {e && <small className="muted">{e}</small>}
      {d && <div style={{marginTop:6,fontFamily:"ui-monospace"}}>{d.series}: {d.value ?? ""}</div>}
    </Card>
  );
}
function TickerUsda(){
  const [commodity,setCommodity]=useState("Tomatoes"); const [d,setD]=useState(null); const [e,setE]=useState("");
  const go=async()=>{ setE(""); setD(null); try{ setD(await apiGet(`/api/tickers/usda-crossings?region=Western&commodity=${encodeURIComponent(commodity)}`)); }catch(err){ setE(String(err)); } };
  return (
    <Card icon={Factory} title="USDA Western Crossings">
      <input className="input" value={commodity} onChange={e=>setCommodity(e.target.value)} placeholder="Commodity"/>
      <button className="btn" style={{marginTop:6}} onClick={go}>Get</button>
      {e && <small className="muted">{e}</small>}
      {d && <pre className="json" style={{marginTop:6}}>{JSON.stringify(d,null,2)}</pre>}
    </Card>
  );
}
function TickerFX(){
  const [pair,setPair]=useState("USD/MXN"); const [d,setD]=useState(null); const [e,setE]=useState("");
  const go=async()=>{ setE(""); setD(null); try{ setD(await apiGet(`/api/tickers/forex?pair=${encodeURIComponent(pair)}`)); }catch(err){ setE(String(err)); } };
  return (
    <Card icon={DollarSign} title="FX">
      <select className="select" value={pair} onChange={e=>setPair(e.target.value)}>
        <option>USD/MXN</option><option>USD/COP</option><option>USD/GTQ</option><option>USD/PEN</option>
      </select>
      <button className="btn" style={{marginTop:6}} onClick={go}>Get</button>
      {e && <small className="muted">{e}</small>}
      {d && <div style={{marginTop:6,fontFamily:"ui-monospace"}}>{d.pair}: {d.rate ?? ""}</div>}
    </Card>
  );
}