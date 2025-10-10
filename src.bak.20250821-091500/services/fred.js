import api from "./config";
export async function getMortgage30Y() {
  const r = await fetch(api.fred("MORTGAGE30US"));
  if (!r.ok) throw new Error("FRED error");
  return r.json();
}
export async function getFredSeries(seriesId) {
  const r = await fetch(api.fred(seriesId));
  if (!r.ok) throw new Error("FRED error");
  return r.json();
}
