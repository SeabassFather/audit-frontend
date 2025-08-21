import React, { useState } from "react";
import Commodities from "./Commodities";
import WaterTech from "./WaterTech";
import Factoring from "./Factoring";
import POFinance from "./POFinance";

const Tabs = ["Commodities","Water Tech","Factoring","PO Finance"];

export default function Programs(){
  const [tab,setTab]=useState(Tabs[0]);
  return (
    <div className="page">
      <h2>Programs</h2>
      <div className="tabs">
        {Tabs.map(t=> <button key={t} className={t===tab?"on":""} onClick={()=>setTab(t)}>{t}</button>)}
      </div>
      <div style={{marginTop:8}}>
        {tab==="Commodities" && <Commodities/>}
        {tab==="Water Tech"  && <WaterTech/>}
        {tab==="Factoring"   && <Factoring/>}
        {tab==="PO Finance"  && <POFinance/>}
      </div>
    </div>
  );
}