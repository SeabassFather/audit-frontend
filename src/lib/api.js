const BASE = import.meta.env.VITE_API_BASE || '';
export async function getWeeklyPrices(commodity='avocado'){
  const r = await fetch(${BASE}/api/usda/prices?commodity=);
  if(!r.ok) throw new Error(HTTP );
  return r.json();
}
