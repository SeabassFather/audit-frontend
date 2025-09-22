import { useEffect, useState } from 'react';

export default function TickerStrip(){
 const [msgs,setMsgs]=useState([]);

 useEffect(()=>{
 const run=async()=>{
 try{
 const r=await fetch('http://localhost:5050/api/ticker');
 if(r.ok){
 const data=await r.json();
 if(Array.isArray(data) && data.length) setMsgs(data);
 else setMsgs([]);
 } else {
 setMsgs([]);
 }
 }catch{
 setMsgs([]);
 }
 };
 run(); const t=setInterval(run,60000); return ()=>clearInterval(t);
 },[]);

 if(!msgs.length) return null;

 return(
 <div className="ticker">
 <marquee behavior="scroll" direction="left" scrollamount="6">
 {msgs.join(' ')}
 </marquee>
 </div>
 );
}
