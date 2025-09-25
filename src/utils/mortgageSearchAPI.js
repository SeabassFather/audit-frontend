import { endpoints, apiPost, apiGet } from "./api";

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

export async function getMortgageRates() {
  return apiGet("/api/mortgage/rates");
}

export async function calculatePayment(loanAmount, rate, term) {
  return apiPost("/api/mortgage/calculate", { loanAmount, rate, term });
}

export async function validateMortgageDocument(formData) {
  return fetch(`${process.env.REACT_APP_API_BASE || "http://127.0.0.1:3001"}/api/mortgage/validate-document`, {
    method: "POST",
    body: formData,
  }).then(res => res.json());
}

const MortgageAPI = {
  searchMortgages,
  lockRate,
  priceScenario,
  submitMortgageLead,
  getMortgageRates,
  calculatePayment,
  validateMortgageDocument,
};

export default MortgageAPI;
