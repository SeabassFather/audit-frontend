import { endpoints, apiPost, apiGet } from "./api";

export async function searchTradeFinance(criteria = {}) {
  return apiPost(endpoints.trade.search, criteria);
}

export async function createFactoring(payload = {}) {
  return apiPost(endpoints.trade.factoring, payload);
}

export async function createInvoiceFinance(payload = {}) {
  return apiPost(endpoints.trade.invoice, payload);
}

export async function submitTradeFinanceLead(payload = {}) {
  return apiPost("/api/trade-finance/submit-lead", payload);
}

export async function getSBAEligibility(payload = {}) {
  return apiPost(endpoints.trade.sba, payload);
}

export async function uploadInvoice(formData) {
  return fetch(`${process.env.REACT_APP_API_BASE || "http://127.0.0.1:3001"}/api/trade-finance/upload-invoice`, {
    method: "POST",
    body: formData,
  }).then(res => res.json());
}

export async function getTradeFinanceRates() {
  return apiGet("/api/trade-finance/rates");
}

export async function calculateFactoringFee(invoiceAmount, rate, term) {
  return apiPost("/api/trade-finance/calculate-fee", { invoiceAmount, rate, term });
}

export async function crossBorderFactoring(payload = {}) {
  return apiPost("/api/trade-finance/cross-border", payload);
}

const TradeFinanceAPI = {
  searchTradeFinance,
  createFactoring,
  createInvoiceFinance,
  submitTradeFinanceLead,
  getSBAEligibility,
  uploadInvoice,
  getTradeFinanceRates,
  calculateFactoringFee,
  crossBorderFactoring,
};

export default TradeFinanceAPI;
