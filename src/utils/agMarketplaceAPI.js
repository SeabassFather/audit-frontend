import { apiPost, apiGet, endpoints } from "./api";

export function submitAgOnboarding(payload) {
  return apiPost("/api/ag/onboarding", payload);
}

export function searchAgMarket(payload) {
  return apiPost(endpoints.ag.search, payload);
}

export function createAgListing(payload) {
  return apiPost("/api/market/listings/create", payload);
}

export function matchBuyers(payload) {
  return apiPost("/api/market/match-buyers", payload);
}

export function matchSellers(payload) {
  return apiPost("/api/market/match-sellers", payload);
}

export function getCommodityPrices() {
  return apiGet(endpoints.ag.prices);
}

export function getCommodities() {
  return apiGet(endpoints.ag.commodities);
}

export function getGrowerProfiles() {
  return apiGet(endpoints.ag.growers);
}

export function submitPACAVerification(payload) {
  return apiPost("/api/ag/paca-verification", payload);
}

export function uploadCertificate(formData) {
  return fetch(`${process.env.REACT_APP_API_BASE || "http://127.0.0.1:3001"}/api/ag/upload-certificate`, {
    method: "POST",
    body: formData,
  }).then(res => res.json());
}

const AgMarketplaceAPI = {
  submitAgOnboarding,
  searchAgMarket,
  createAgListing,
  matchBuyers,
  matchSellers,
  getCommodityPrices,
  getCommodities,
  getGrowerProfiles,
  submitPACAVerification,
  uploadCertificate,
};

export default AgMarketplaceAPI;
