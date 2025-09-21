const MARS_BASE = "https://marsapi.ams.usda.gov/services/v1.1";
function marsHeaders() {
 const key = import.meta.env.VITE_USDA_MARS_KEY || "";
 // API uses Basic auth with API key as username, blank password.
 const token = btoa(${key}:);
 return { "Authorization": Basic ${token}, "Accept":"application/json" };
}
export async function marsListReports() {
 const r = await fetch(${MARS_BASE}/reports, { headers: marsHeaders() });
 if (!r.ok) throw new Error(MARS ${r.status} ${r.statusText});
 return r.json();
}
export async function marsGetReportBySlug(slugId) {
 const r = await fetch(${MARS_BASE}/reports/${encodeURIComponent(slugId)}, { headers: marsHeaders() });
 if (!r.ok) throw new Error(MARS ${r.status} ${r.statusText});
 return r.json();
}