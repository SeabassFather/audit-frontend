import { useState, useEffect } from "react";
export default function USDA(){
  const [commodity,setCommodity]=useState("TOMATOES");
  const [data,setData]=useState(null);
  const fetchData=async()=>{
    const r=await fetch(`/api/usda/qstats?commodity=${commodity}&year_from=2020`);
    const j=await r.json(); setData(j);
  };
  useEffect(()=>{fetchData();},[]);
  return <main className="p-6">
    <h2 className="text-xl font-bold mb-3">USDA Pricing</h2>
    <input className="border p-2" value={commodity} onChange={e=>setCommodity(e.target.value.toUpperCase())}/>
    <button className="btn-primary ml-2" onClick={fetchData}>Fetch</button>
    <pre className="bg-slate-100 p-3 mt-4 rounded text-xs overflow-x-auto">{JSON.stringify(data,null,2)}</pre>
  </main>;
}