import { useEffect, useState } from "react";
export default function StockTicker(){
  const [i,setI]=useState(0);
  const items=[{s:"SPY",p:500.10},{s:"QQQ",p:430.22},{s:"IWM",p:211.44}];
  useEffect(()=>{const id=setInterval(()=>setI(v=>(v+1)%items.length),2200);return()=>clearInterval(id)},[]);
  const cur=items[i];
  return <div className="px-3 py-1 rounded bg-white shadow inline-block text-sm">{cur.s}: <span className="font-semibold">{cur.p}</span></div>;
}