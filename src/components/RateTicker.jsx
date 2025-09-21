import { useEffect, useState } from "react";
export default function RateTicker(){
 const [i,setI]=useState(0);
 const items=[
 {label:"30yr Fixed", value:"6.50%"},
 {label:"15yr Fixed", value:"6.20%"},
 {label:"FHA", value:"6.10%"},
 {label:"VA", value:"6.00%"}
 ];
 useEffect(()=>{const id=setInterval(()=>setI(v=>(v+1)%items.length),2500);return()=>clearInterval(id)},[]);
 const cur=items[i];
 return <div className="px-3 py-1 rounded bg-white shadow inline-block text-sm">{cur.label}: <span className="font-semibold">{cur.value}</span></div>;
}