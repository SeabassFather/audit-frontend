import api from "./config";
export async function listCommodities(){
  const r = await fetch("/api/usda/list"); if(!r.ok) throw new Error("USDA list error"); const j = await r.json(); return j.list || [];
}
export async function getCommodityWeeklyAvg(commodity="Tomatoes"){
  const r = await fetch(`/api/usda/market/avg?commodity=${encodeURIComponent(commodity)}`);
  if(!r.ok) throw new Error("USDA avg error");
  return r.json();
}