﻿/**
 * NASS Quick Stats client (via Vite proxy at /api/nass).
 * We request monthly "PRICE RECEIVED" series for a commodity and spread across weeks.
 * Params are intentionally broad to maximize hits; refine later per commodity.
 */
async function qs(path, params) {
  const u = new URL("/api/nass" + path, window.location.origin);
  Object.entries(params || {}).forEach(([k, v]) => { if (v!=null) u.searchParams.set(k, v); });
  // NOTE: vite proxy auto-appends ?key=...
  const r = await fetch(u.toString());
  if (!r.ok) throw new Error("NASS HTTP " + r.status);
  return r.json();
}

// Try to map a UI commodity label to a NASS COMMODITY_DESC
function toNassCommodity(commodityLabel) {
  const map = {
    "Papaya": "PAPAYAS",
    "Oranges": "ORANGES",
    "Oranges Valencia": "ORANGES",
    "Avocado": "AVOCADOS",
    "Tomato Roma": "TOMATOES",
  };
  return map[commodityLabel] || commodityLabel.toUpperCase();
}

/**
 * Fetch monthly price series (last 5y) and convert to weekly rows format:
 * return { years:[...], rows:[ {week, Y1, Y2, ...} ] }
 */
export async function fetchNassPriceOverlay(commodityLabel) {
  const now = new Date();
  const endY = now.getFullYear();
  const startY = endY - 4;

  const commodity = toNassCommodity(commodityLabel);
  // Broad query: monthly price received, national
  const data = await qs("/api_GET/", {
    commodity_desc: commodity,
    statisticcat_desc: "PRICE RECEIVED",
    freq_desc: "MONTHLY",
    agg_level_desc: "NATIONAL",
    sector_desc: "ECONOMICS",
    year__GE: String(startY),
    year__LE: String(endY),
    format: "JSON",
  });

  const items = data?.data || data?.results || [];
  if (!items.length) throw new Error("No NASS data for " + commodityLabel);

  // Build per-year array of 12 monthly averages (use VALUE; fallback to PRICE/AVG_PRICE if present)
  const byYear = new Map();
  for (const it of items) {
    const y = +it.year;
    if (!(y >= startY && y <= endY)) continue;
    const mName = String(it.period) || String(it.period_desc); // e.g. "JAN", "FEB", or "#"
    const month = toMonth(mName);
    const v = toNum(it.Value ?? it.VALUE ?? it.price ?? it.avg_price);
    if (!Number.isFinite(month) || !Number.isFinite(v)) continue;
    const arr = byYear.get(y) || Array(12).fill(null);
    arr[month - 1] = v;
    byYear.set(y, arr);
  }

  const years = Array.from(byYear.keys()).sort((a,b)=>a-b);
  if (!years.length) throw new Error("NASS: parsed no monthly values");

  // Convert monthly to weekly: assign each week the month average it falls in
  const rows = Array.from({ length: 52 }, (_, i) => {
    const week = i + 1;
    const row = { week };
    for (const y of years) {
      const month = weekToMonth(week); // 1..12
      const mArr = byYear.get(y) || [];
      const val = mArr[month - 1];
      if (Number.isFinite(val)) row[y] = +Number(val).toFixed(2);
    }
    return row;
  });

  return { years, rows };
}

// Helpers
function toNum(x) {
  if (x == null) return NaN;
  const n = Number(String(x).replace(/[^0-9.\-]/g, ""));
  return n;
}
function toMonth(m) {
  const T = { JAN:1, FEB:2, MAR:3, APR:4, MAY:5, JUN:6, JUL:7, AUG:8, SEP:9, OCT:10, NOV:11, DEC:12 };
  const s = String(m || "").trim().slice(0,3).toUpperCase();
  return T[s] || NaN;
}
function weekToMonth(week) {
  // crude mapping: 4.33 weeks per month
  return Math.min(12, Math.max(1, Math.ceil(week / 4.33)));
}
