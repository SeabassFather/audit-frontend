export async function fetchCommodities() {
 const r = await fetch("/api/mmn/commodities");
 if (!r.ok) throw new Error("MMN commodities HTTP " + r.status);
 return r.json();
}
export async function searchReports({ commodity }) {
 const r = await fetch("/api/mmn/reports/");
 if (!r.ok) throw new Error("MMN reports HTTP " + r.status);
 const json = await r.json();
 const term = commodity.toLowerCase();
 return (json.results || json || []).filter((it) => {
 const t = ${it.report_title || ""} ${it.market_type || ""}.toLowerCase();
 return t.includes("specialty") || t.includes("terminal") || t.includes(term);
 }).slice(0,10);
}
export async function fetchReportSeries({ reportId, commodity, since, until }) {
 const fmt = (d)=>${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}/${d.getFullYear()};
 const qs = new URLSearchParams();
 const parts = [];
 if (commodity) parts.push(commodity=${encodeURIComponent(commodity)});
 if (since && until) parts.push(report_begin_date=${fmt(since)}:${fmt(until)}); else if (since) parts.push(report_begin_date=${fmt(since)});
 if (parts.length) qs.set("q", parts.join(";"));
 const r = await fetch(/api/mmn/reports/${reportId}?${qs.toString()});
 if (!r.ok) { const t = await r.text(); throw new Error(MMN report ${reportId} failed ${r.status}: ${t.slice(0,200)}); }
 return r.json();
}