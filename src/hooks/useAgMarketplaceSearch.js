import { endpoints, safeGet } from "../utils/api";
export default function useAgMarketplaceSearch(){
  return async (payload)=>{
    const url = endpoints.agMarket();
    if(!url) return { ok:false, error:"backend not configured" };
    return safeGet(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) });
  };
}