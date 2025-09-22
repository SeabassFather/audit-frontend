// src/features/usda/mmnClient.js
export async function fetchCommodities() {
  const r = await fetch("/api/mmn/commodities");
  if (!r.ok) throw new Error("MMN commodities HTTP " + r.status);
  return r.json();
}

export async function searchReports({ commodity, days = 5 * 365 }) {
  const r = await fetch("/api/mmn/reports/");
  if (!r.ok) throw new Error("MMN reports HTTP " + r.status);
  const json = await r.json();
  const term = commodity.toLowerCase();
  const hits = (json.results || json || [])
    .filter((it) => {
      const t = `${it.report_title || ""} ${it.market_type || ""}`.toLowerCase();
      return t.includes("specialty") || t.includes("terminal") || t.includes(term);
    })
    .slice(0, 10);
  return hits;
}

export async function fetchReportSeries({ reportId, commodity, since, until }) {
  const fmt = (d) =>
    `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;
  const qs = new URLSearchParams();
  const parts = [];
  if (commodity) parts.push(`commodity=${encodeURIComponent(commodity)}`);
  if (since && until) parts.push(`report_begin_date=${fmt(since)}:${fmt(until)}`);
  else if (since) parts.push(`report_begin_date=${fmt(since)}`);
  if (parts.length) qs.set("q", parts.join(";"));
  const url = `/api/mmn/reports/${reportId}?${qs.toString()}`;
  const r = await fetch(url);
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`MMN report ${reportId} failed ${r.status}: ${text.slice(0, 200)}`);
  }
  return r.json();
}
