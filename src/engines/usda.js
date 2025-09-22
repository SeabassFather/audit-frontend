/**
 * USDA Engines (real calls)
 * - QuickStats (NASS): https://quickstats.nass.usda.gov/api/get_param_values/?param=...
 * Data: https://quickstats.nass.usda.gov/api/api_GET/
 * - AMS Market News: https://api.ams.usda.gov/services/v1/market-news/reports
 */
const QS_BASE = "https://quickstats.nass.usda.gov/api/api_GET/";
const AMS_BASE = import.meta.env.AMS_BASE || "https://api.ams.usda.gov/services/v1";
const NASS_KEY = import.meta.env.VITE_NASS_API_KEY || import.meta.env.NASS_API_KEY;

function qs(params) {
 const sp = new URLSearchParams();
 if (!NASS_KEY) throw new Error("Missing NASS API key (set VITE_NASS_API_KEY or NASS_API_KEY).");
 sp.set("key", NASS_KEY);
 for (const [k,v] of Object.entries(params || {})) {
 if (v !== undefined && v !== null && ${v}.trim() !== "") sp.set(k, v);
 }
 return ${QS_BASE}?${sp};
}

/**
 * QuickStats common price/production query
 * @param {object} opts - { commodity_desc, state_alpha, year__GE, year__LE, statisticcat_desc, unit_desc, agg_level_desc, source_desc }
 */
export async function fetchQuickStats(opts = {}) {
 // Reasonable defaults; caller can override
 const merged = {
 format: "JSON",
 source_desc: opts.source_desc || "SURVEY",
 sector_desc: opts.sector_desc, // e.g. "CROPS"
 group_desc: opts.group_desc,
 commodity_desc: opts.commodity_desc, // e.g. "CORN"
 statisticcat_desc: opts.statisticcat_desc, // e.g. "PRICE RECEIVED"
 unit_desc: opts.unit_desc, // e.g. "$ / BU"
 agg_level_desc: opts.agg_level_desc || "STATE",
 state_alpha: opts.state_alpha, // e.g. "IA"
 year__GE: opts.year__GE,
 year__LE: opts.year__LE,
 };
 const url = qs(merged);
 const res = await fetch(url, { mode: "cors" });
 if (!res.ok) throw new Error(QuickStats ${res.status});
 const data = await res.json();
 return Array.isArray(data?.data) ? data.data : [];
}

/**
 * AMS Market News text search across reports
 * @param {object} opts - { query, limit, page }
 */
export async function fetchAmsReports({ query, limit = 50, page = 1 } = {}) {
 const u = new URL(${AMS_BASE}/market-news/reports);
 if (query) u.searchParams.set("search", query);
 u.searchParams.set("page", ${page});
 u.searchParams.set("pageSize", ${limit});
 const res = await fetch(u.toString(), { mode: "cors" });
 if (!res.ok) throw new Error(AMS ${res.status});
 const data = await res.json();
 // AMS returns { results: [], totalCount: n } shape
 return Array.isArray(data?.results) ? data.results : [];
}
