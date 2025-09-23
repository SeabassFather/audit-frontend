import axios from "axios";
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5050";
export const api = axios.create({ baseURL: API_BASE, timeout: 20000 });

export async function getUSDAWeeklyPrices(params){
  try {
    const r = await api.get("/api/usda/weekly", { params });
    return r.data;
  } catch {
    const year = Number(params?.year) || new Date().getFullYear();
    const current = Array.from({length:26}, (_,i)=>({ week:i+1, price:+(18+Math.sin(i/3)*3).toFixed(2) }));
    const avg5    = Array.from({length:26}, (_,i)=>({ week:i+1, price:+(17+Math.sin(i/3)*2.2).toFixed(2) }));
    return { current, avg5, source: "synthetic", year };
  }
}

export async function searchMortgageRates({state="CA", score=720, ltv=70, term=30} = {}){
  try {
    const r = await api.get("/api/mortgage/search", { params: { state, score, ltv, term } });
    return r.data;
  } catch {
    const base = 6.75
      + (80 - Math.min(80, Math.max(0, (score - 620) / 10))) * 0.02
      + (ltv - 60) * 0.02
      + (term == 15 ? -0.8 : term == 20 ? -0.4 : 0);
    return {
      results: [
        { lender:"AuditDNA Capital", product:`Fixed ${term}`, rate:+base.toFixed(2),        apr:+(base+0.15).toFixed(2), payment: Math.round(1800 + base*12) },
        { lender:"BlueAg Finance",   product:`ARM 5/${term}`,  rate:+(base-0.35).toFixed(2), apr:+(base+0.05).toFixed(2), payment: Math.round(1700 + base*11) },
        { lender:"BorderTrust",      product:`Fixed ${term}`,  rate:+(base+0.25).toFixed(2), apr:+(base+0.40).toFixed(2), payment: Math.round(1900 + base*13) }
      ]
    };
  }
}

export async function listFactoringDeals(){
  try {
    const r = await api.get("/api/factoring/deals");
    return r.data;
  } catch {
    return {
      deals: [
        { debtor:"MX Growers Co.", lender:"AuditDNA Factoring", country:"MXUS", commodity:"Tomatoes", amount:250000, status:"Active" },
        { debtor:"Baja Citrus SA", lender:"AuditDNA Factoring", country:"MXUS", commodity:"Limes",    amount:180000, status:"Underwriting" },
        { debtor:"Nogales Fresh",  lender:"BorderTrust",        country:"MXUS", commodity:"Peppers",  amount:120000, status:"Paid" }
      ]
    };
  }
}