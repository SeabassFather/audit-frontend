import { useEffect, useMemo, useState } from "react";
import PriceChart from "../components/PriceChart.jsx";
import { listCommodities, fetchWeeklySeries } from "../lib/usda.js";

export default function PricingUSDA(){
  const [commodity,setCommodity] = useState("Papaya");
  const [series,setSeries] = useState([]);
  const commodities = useMemo(()=> listCommodities(),[]);

  useEffect(()=>{
    let alive = true;
    (async()=>{
      const rows = await fetchWeeklySeries(commodity);
      if(alive) setSeries(rows);
    })();
    return ()=>{ alive = false };
  },[commodity]);

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex flex-col md:flex-row gap-3 md:items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Commodity</label>
            <select className="w-full border border-silver-300 rounded-xl2 px-3 py-2" value={commodity} onChange={e=>setCommodity(e.target.value)}>
              {commodities.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="text-xs text-gray-600 mt-1">Data: AMS/NASS (fallback synthetic when offline). Weeks 126 shown.</div>
          </div>
        </div>
      </div>

      <PriceChart data={series} />

      <div className="card">
        <div className="font-semibold mb-2">Notes</div>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Plug your real NASS key in <code>.env</code> as <code>VITE_NASS_KEY</code> and restart dev.</li>
          <li>When AMS/NASS is unavailable during development, we autogenerate a smooth synthetic curve and a 5yr average band.</li>
        </ul>
      </div>
    </div>
  );
}