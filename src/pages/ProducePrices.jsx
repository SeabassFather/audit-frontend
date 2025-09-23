import React, { useMemo, useState } from "react";
import PriceChart from "../components/PriceChart";
import prices from "../data/producePrices.sample.json";
import Fuse from "fuse.js";
import { Search, Leaf } from "lucide-react";
const ALL = Object.keys(prices);
const fuse = new Fuse(ALL.map(n => ({ name: n })), { keys: ["name"], threshold: 0.3 });
const years = ["2021","2022","2023","2024","2025"];
export default function ProducePrices() {
  const [q, setQ] = useState(""); const [commodity, setCommodity] = useState("Papaya");
  const options = useMemo(() => !q ? ALL : fuse.search(q).map(r=>r.item.name), [q]);
  const dataFor = prices[commodity] || {};
  const series = years.filter(y=>Array.isArray(dataFor[y])).map(y=>({ name:y, data:(dataFor[y]||[]).slice(1,27) }));
  const average = useMemo(()=>{ const out=Array(26).fill(null); for(let i=0;i<26;i++){ const vals=series.map(s=>s.data[i]).filter(v=>Number.isFinite(v)); out[i]=vals.length ? Number((vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(2)) : null; } return out; },[series]);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold flex items-center gap-2"><Leaf className="w-6 h-6" /> USDA Produce Pricing</h1></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 bg-white rounded-2xl shadow p-4">
          <div className="flex items-center gap-2 mb-3 border rounded-xl px-3 py-2"><Search className="w-4 h-4" /><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search commodity..." className="outline-none w-full"/></div>
          <div className="max-h-80 overflow-auto pr-1">
            {options.map(name => (<button key={name} onClick={()=>setCommodity(name)} className={"w-full text-left px-3 py-2 rounded-lg mb-1 " + (commodity===name ? "bg-green-100" : "hover:bg-gray-100")}>{name}</button>))}
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="mb-2 text-sm text-gray-500">Commodity: <span className="font-medium">{commodity}</span>  View: W1W26  Overlay: 5-yr average (dashed)</div>
          <PriceChart series={series} average={average} />
        </div>
      </div>
    </div>
  );
}
