import { useEffect, useState } from "react";
export default function Toast({text, showFor=1800}){
 const [on,setOn] = useState(true);
 useEffect(()=>{ const id=setTimeout(()=>setOn(false),showFor); return ()=>clearTimeout(id); },[showFor]);
 if(!on) return null;
 return <div className="fixed bottom-4 right-4 bg-black text-white/95 px-4 py-2 rounded shadow">{text}</div>;
}