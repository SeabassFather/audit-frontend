import { endpoints, apiPost } from "./api";
export async function searchTradeFinance(criteria = {}) {
  return apiPost(endpoints.trade.search, criteria);
}
export async function createFactoring(payload = {}) {
  return apiPost(endpoints.trade.factoring, payload);
}
export async function createPOFinance(payload = {}) {
  return apiPost(endpoints.trade.pofinance, payload);
}
export async function submitTradeFinance(payload = {}) {
  return apiPost(endpoints.trade.lead, payload);
}
const TradeFinanceAPI = { searchTradeFinance, createFactoring, createPOFinance, submitTradeFinance };
export default TradeFinanceAPI;