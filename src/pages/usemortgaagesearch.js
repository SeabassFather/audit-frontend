import { useState } from "react";
import { searchMortgages } from "../utils/mortgageSearchAPI";
export default function useMortgageSearch() {
  const [loading, setLoading] = useState(false), [results, setResults] = useState(null), [error, setError] = useState(null);
  const search = async (criteria) => {
    setLoading(true); setError(null);
    try { setResults(await searchMortgages(criteria || {})); }
    catch (e) { setError(e?.response?.data || e.message); }
    finally { setLoading(false); }
  };
  return { loading, results, error, search };
}