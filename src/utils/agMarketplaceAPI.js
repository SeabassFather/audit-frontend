/* eslint-disable import/no-anonymous-default-export */
import { apiPost } from "./api";

export function submitAgOnboarding(payload) {
  return apiPost("/api/ag/onboarding", payload);
}
export function searchAgMarket(payload) {
  return apiPost("/api/market/search", payload);
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

export default {
  submitAgOnboarding,
  searchAgMarket,
  createAgListing,
  matchBuyers,
  matchSellers,
};
