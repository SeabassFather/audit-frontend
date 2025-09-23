const MODE = process.env.REACT_APP_DATA_MODE || "bundle";

// Load JSON files under src/data/commodities (one file per commodity)
function loadBundle(){
  const ctx = require.context("../../data/commodities", false, /\.json$/);
  const db = {};
  ctx.keys().forEach(k => {
    const name = k.replace(/^.\//,"").replace(/\.json$/,"");
    db[name] = ctx(k);
  });
  return db;
}

async function httpList(){ const r = await fetch("/api/commodities"); if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }
async function httpGetOne(name){ const r = await fetch(`/api/commodity/${encodeURIComponent(name)}`); if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); }

export async function getCommodities(){ if(MODE==="http") return httpList(); const db = loadBundle(); return Object.keys(db).sort(); }
export async function getCommodityData(name){ if(MODE==="http") return httpGetOne(name); const db = loadBundle(); return db[name]; }

export function normalizeCommodityRecord(raw){
  const out = { unit: raw?.unit || "", years: {} };
  const ys = raw?.years || {};
  for (const y of Object.keys(ys)) {
    const arr = Array.isArray(ys[y]) ? ys[y].slice(0,52) : [];
    while (arr.length < 52) arr.push(null);
    out.years[y] = arr.map(v => Number.isFinite(v) ? Number(v) : (v==null ? null : Number(v)));
  }
  return out;
}