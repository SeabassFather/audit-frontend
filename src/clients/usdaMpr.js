export async function mprFetchReport({ sector, reportCode, filters }) {
 // sector: "cattle" | "hog" | "lamb" | "pork" | etc.
 // reportCode: e.g. "LM_CT100"
 // filters: array of { fieldName, operatorType, values }
 const base = "https://mpr.datamart.ams.usda.gov/ws/report/v1";
 const filterParam = filters ? ?filter=${encodeURIComponent(JSON.stringify({filters}))} : "";
 const url = ${base}/${encodeURIComponent(sector)}/${encodeURIComponent(reportCode)}${filterParam};
 const r = await fetch(url, { headers:{ "Accept":"application/json" }});
 if(!r.ok) throw new Error(MPR ${r.status} ${r.statusText});
 return r.json();
}
