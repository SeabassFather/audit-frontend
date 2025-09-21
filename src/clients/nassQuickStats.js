const QS_BASE = "https://quickstats.nass.usda.gov/api/api_GET/";
export async function quickStatsPricesReceived({
 key = import.meta.env.VITE_USDA_QS_KEY,
 commodity_desc,
 year_from,
 year_to,
 agg_level_desc = "NATIONAL",
 statisticcat_desc = "PRICE RECEIVED"
}) {
 const params = new URLSearchParams({
 key, source_desc:"SURVEY", sector_desc:"CROPS",
 agg_level_desc, statisticcat_desc, commodity_desc,
 year__GE:String(year_from), year__LE:String(year_to), format:"JSON"
 });
 const r = await fetch(${QS_BASE}?${params.toString()});
 if(!r.ok) throw new Error(QuickStats ${r.status} ${r.statusText});
 return r.json();
}