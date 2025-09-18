import { useEffect, useState } from "react";
export default function Ticker(){
  const [i,setI] = useState(0);
  const msgs = [
    "USDA W12 Lettuce avg: $12.50/case",
    "Mortgage 30yr fixed avg: 6.50%",
    "Factoring advances up to 80% · Avg fee ~2.2%"
  ];
  useEffect(()=>{ const id=setInterval(()=>setI(v=>(v+1)%msgs.length),3000); return ()=>clearInterval(id); },[]);
  return <div className="bg-dnaSilver text-sm px-4 py-1">{msgs[i]}</div>;
}