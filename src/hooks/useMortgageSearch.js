import { endpoints, safeGet } from "../utils/api";
export default function useMortgageSearch() {
  return async (payload) => {
    const url = endpoints.mortgages();
    if (!url) return { ok: false, error: "backend not configured" };
    return safeGet(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };
}
