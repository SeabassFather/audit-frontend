export const API_BASE = process.env.REACT_APP_API_BASE || "/api";

export async function apiGet(url, opts={}) {
  const res = await fetch(url, { method:"GET", ...opts });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.json();
}
export async function apiPost(url, body={}, opts={}) {
  const res = await fetch(url, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(body),
    ...opts,
  });
  if (!res.ok) throw new Error(`POST ${url} -> ${res.status}`);
  return res.json();
}

// same signature components use; NO fallback/mocks
export async function safeGet(url, opts={}) { return apiGet(url, opts); }

// functions for tickers + structured endpoints
export const endpoints = {
  tickersRate:  () => `${API_BASE}/market/rates/ticker`,
  tickersStock: () => `${API_BASE}/market/stocks/ticker`,
  rates:  { ticker: `${API_BASE}/market/rates/ticker` },
  stocks: { ticker: `${API_BASE}/market/stocks/ticker` },
  mortgage: {
    search: `${API_BASE}/search/mortgages`,
    lock:   `${API_BASE}/mortgage/lock`,
    price:  `${API_BASE}/mortgage/price`,
    lead:   `${API_BASE}/mortgage/lead`,
  },
  trade: {
    search:    `${API_BASE}/search/trade-finance`,
    factoring: `${API_BASE}/trade/factoring`,
    pofinance: `${API_BASE}/trade/pofinance`,
    lead:      `${API_BASE}/trade/lead`,
  },
};
export default { API_BASE, apiGet, apiPost, safeGet, endpoints };