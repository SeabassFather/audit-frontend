import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5050";
export const api = axios.create({ baseURL: API_BASE, timeout: 20000 });

export async function getUSDAWeeklyPrices(params){
 const res = await api.get("/api/usda/weekly", { params });
 return res.data;
}

export async function searchMortgageRates(params){
 const res = await api.get("/api/mortgage/search", { params });
 return res.data;
}

export async function listFactoringDeals(params){
 const res = await api.get("/api/factoring/deals", { params });
 return res.data;
}