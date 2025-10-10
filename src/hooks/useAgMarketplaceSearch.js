import { useState, useCallback } from "react";
import AgMarketplaceAPI from "../utils/agMarketplaceAPI";

export default function useAgMarketplaceSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [prices, setPrices] = useState({});

  const searchAgMarket = useCallback(async (criteria) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AgMarketplaceAPI.searchAgMarket(criteria);
      setResults(data.results || data || []);
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCommodities = useCallback(async () => {
    try {
      const data = await AgMarketplaceAPI.getCommodities();
      setCommodities(data || []);
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    }
  }, []);

  const loadPrices = useCallback(async () => {
    try {
      const data = await AgMarketplaceAPI.getCommodityPrices();
      setPrices(data || {});
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    }
  }, []);

  const submitOnboarding = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AgMarketplaceAPI.submitAgOnboarding(payload);
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    results,
    commodities,
    prices,
    searchAgMarket,
    loadCommodities,
    loadPrices,
    submitOnboarding,
  };
}
