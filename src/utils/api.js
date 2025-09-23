import { API_BASE } from "./constants";

async function req(path, { method="GET", json, headers={}, ...rest } = {}) {
  const init = { method, credentials:"include", headers, ...rest };
  if (json !== undefined) {
    init.headers = { "Content-Type":"application/json", ...headers };
    init.body = JSON.stringify(json);
  }
  const res = await fetch(`${API_BASE}${path}`, init);
  if (!res.ok) {
    const t = await res.text().catch(()=> "");
    throw new Error(`HTTP ${res.status}: ${t || res.statusText}`);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const api = {
  get: (p)=>req(p),
  post: (p, json)=>req(p,{method:"POST", json}),
  put: (p, json)=>req(p,{method:"PUT", json}),
  del: (p)=>req(p,{method:"DELETE"}),

  // Files (pre-signed URL flow expected on backend)
  requestPresign: (payload)=>req("/files/presign",{method:"POST", json:payload}),
  confirmUpload: (payload)=>req("/files/confirm",{method:"POST", json:payload}),
};