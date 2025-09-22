async function qs(path, params) {
 const u = new URL("/api/nass" + path, window.location.origin);
 Object.entries(params || {}).forEach(([k,v])=>{ if(v!=null) u.searchParams.set(k,v); });
 const r = await fetch(u.toString());
 if (!r.ok) throw new Error("NASS HTTP " + r.status);
 return r.json();
}
function toNassCommodity(label) {
 const map = { "Papaya":"PAPAYAS", "Oranges":"ORANGES", "Oranges Valencia":"ORANGES", "Avocado":"AVOCADOS", "Tomato Roma":"TOMATOES" };
 return map[label] || label.toUpperCase();
}
export async function fetchNassPriceOverlay(label) {
 const now = new Date(); const endY = now.getFullYear(); const startY = endY - 4;
 const commodity = toNassCommodity(label);
 const data = await qs("/api_GET/", {
 commodity_desc: commodity, statisticcat_desc: "PRICE RECEIVED",
 freq_desc: "MONTHLY", agg_level_desc: "NATIONAL", sector_desc: "ECONOMICS",
 year__GE: String(startY), year__LE: String(endY), format: "JSON"
 });
 const items = data?.data || data?.results || [];
 if (!items.length) throw new Error("No NASS data for " + label);
 const byYear = new Map();
 for (const it of items) {
 const y = +it.year; if (!(y>=startY && y<=endY)) continue;
 const month = toMonth(String(it.period || it.period_desc));
 const v = toNum(it.Value ?? it.VALUE ?? it.price ?? it.avg_price);
 if (!Number.isFinite(month) || !Number.isFinite(v)) continue;
 const arr = byYear.get(y) || Array(12).fill(null); arr[month-1] = v; byYear.set(y, arr);
 }
 const years = Array.from(byYear.keys()).sort((a,b)=>a-b);
 if (!years.length) throw new Error("NASS: parsed no monthly values");
 const rows = Array.from({length:52},(_,i)=>{
 const week=i+1; const row={week};
 for(const y of years){ const m = Math.min(12, Math.max(1, Math.ceil(week/4.33))); const arr=byYear.get(y)||[]; const val=arr[m-1]; if(Number.isFinite(val)) row[y]=+Number(val).toFixed(2); }
 return row;
 });
 return { years, rows };
}
function toNum(x){ if(x==null) return NaN; return Number(String(x).replace(/[^0-9.\-]/g,"")); }
function toMonth(m){ const T={JAN:1,FEB:2,MAR:3,APR:4,MAY:5,JUN:6,JUL:7,AUG:8,SEP:9,OCT:10,NOV:11,DEC:12}; const s=String(m||"").trim().slice(0,3).toUpperCase(); return T[s]||NaN; }