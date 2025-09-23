import { endpoints, apiPost } from "./api";
export async function searchMortgages(criteria = {}) {
  return apiPost(endpoints.mortgage.search, criteria);
}
export async function lockRate(payload = {}) {
  return apiPost(endpoints.mortgage.lock, payload);
}
export async function priceScenario(payload = {}) {
  return apiPost(endpoints.mortgage.price, payload);
}
export async function submitMortgageLead(payload = {}) {
  return apiPost(endpoints.mortgage.lead, payload);
}
const MortgageAPI = { searchMortgages, lockRate, priceScenario, submitMortgageLead };
export default MortgageAPI;