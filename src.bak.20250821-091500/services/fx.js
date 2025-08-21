import api from "./config";
export async function getFxLatest(base="USD", symbols="MXN,EUR,JPY") {
  const r = await fetch(api.fx(base, symbols)); if (!r.ok) throw new Error("FX error");
  return r.json();
}