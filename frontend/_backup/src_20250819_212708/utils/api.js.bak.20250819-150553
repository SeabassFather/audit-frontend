const BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:3001";
async function jsonOrEmpty(res){ try { return await res.json(); } catch { return {}; } }

export async function apiGet(path){
  const r = await fetch(`${BASE}${path}`);
  const d = await jsonOrEmpty(r);
  if(!r.ok) throw new Error(d.error || r.statusText);
  return d;
}
export async function apiPost(path, body){
  const r = await fetch(`${BASE}${path}`, {
    method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body||{})
  });
  const d = await jsonOrEmpty(r);
  if(!r.ok) throw new Error(d.error || r.statusText);
  return d;
}
export async function apiUpload(path, formData){
  const r = await fetch(`${BASE}${path}`, { method:"POST", body: formData });
  const d = await jsonOrEmpty(r);
  if(!r.ok) throw new Error(d.error || r.statusText);
  return d;
}
export async function apiNotify(payload){ return apiPost("/api/notify", payload); }
export async function apiAuthLogin(credentials){ return apiPost("/api/auth/login", credentials); }
export { BASE as API_BASE };