import { useState,useEffect } from "react";
export default function Produce(){
  const [commodity,setCommodity]=useState("TOMATOES");
  const [trends,setTrends]=useState([]);
  const fetchTrends=async()=>{ const r=await fetch(`/api/produce/trends?commodity=${commodity}`); const j=await r.json(); setTrends(j.trends);};
  useEffect(()=>{fetchTrends();},[]);
  return <main className="p-6"><h2 className="text-xl font-bold mb-3">Produce Analytics</h2>
    <input className="border p-2" value={commodity} onChange={e=>setCommodity(e.target.value.toUpperCase())}/>
    <button className="btn-primary ml-2" onClick={fetchTrends}>Run</button>
    <ul className="mt-4">{trends.map(t=><li key={t.year}>{t.year}: ${t.avgPrice}</li>)}</ul>
  </main>;
}
