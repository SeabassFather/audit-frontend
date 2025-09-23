import { endpoints, safeGet } from "../utils/api";
export default function useTradeFinanceSearch(){
  return async (payload)=>{
    const url = endpoints.tradeFin();
    if(!url) return { ok:false, error:"backend not configured" };
    return safeGet(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
  };
}