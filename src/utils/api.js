const BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:3001";

async function jsonOrEmpty(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

export async function apiGet(path) {
  const r = await fetch(`${BASE}${path}`);
  const d = await jsonOrEmpty(r);
  if (!r.ok) throw new Error(d.error || r.statusText);
  return d;
}

export async function apiPost(path, body) {
  const r = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  const d = await jsonOrEmpty(r);
  if (!r.ok) throw new Error(d.error || r.statusText);
  return d;
}

export async function apiUpload(path, formData) {
  const r = await fetch(`${BASE}${path}`, { method: "POST", body: formData });
  const d = await jsonOrEmpty(r);
  if (!r.ok) throw new Error(d.error || r.statusText);
  return d;
}

export async function apiNotify(payload) {
  return apiPost("/api/notify", payload);
}

export async function apiAuthLogin(credentials) {
  return apiPost("/api/auth/login", credentials);
}

// API endpoints configuration
export const endpoints = {
  mortgage: {
    search: "/api/mortgage/search",
    lock: "/api/mortgage/lock-rate",
    price: "/api/mortgage/price-scenario",
    lead: "/api/mortgage/submit-lead",
  },
  ag: {
    search: "/api/ag/search",
    commodities: "/api/ag/commodities",
    prices: "/api/ag/prices",
    growers: "/api/ag/growers",
  },
  trade: {
    search: "/api/trade-finance/search",
    factoring: "/api/trade-finance/factoring",
    invoice: "/api/trade-finance/invoice",
    sba: "/api/trade-finance/sba",
  },
  tickers: {
    rates: "/api/tickers/rates",
    stocks: "/api/tickers/stocks",
    commodities: "/api/tickers/commodities",
  },
  upload: "/api/upload",
  ocr: "/api/ocr",
  facial: "/api/facial-recognition",
};

// Modern API wrapper
export const api = {
  get: (path) => apiGet(path),
  post: (path, body) => apiPost(path, body),
  upload: (path, formData) => apiUpload(path, formData),
  notify: (payload) => apiNotify(payload),
  auth: {
    login: (credentials) => apiAuthLogin(credentials),
  },
};

export { BASE as API_BASE };
