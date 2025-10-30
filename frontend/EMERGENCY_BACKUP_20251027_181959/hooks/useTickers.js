import { useState, useEffect, useCallback } from "react";
import { apiGet, endpoints } from "../utils/api";

export default function useTickers() {
  const [rates, setRates] = useState({});
  const [stocks, setStocks] = useState({});
  const [commodities, setCommodities] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchRates = useCallback(async () => {
    try {
      const data = await apiGet(endpoints.tickers.rates);
      setRates(data || {});
      setLastUpdate(new Date());
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    }
  }, []);

  const fetchStocks = useCallback(async () => {
    try {
      const data = await apiGet(endpoints.tickers.stocks);
      setStocks(data || {});
      setLastUpdate(new Date());
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    }
  }, []);

  const fetchCommodities = useCallback(async () => {
    try {
      const data = await apiGet(endpoints.tickers.commodities);
      setCommodities(data || {});
      setLastUpdate(new Date());
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    }
  }, []);

  const fetchAllTickers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchRates(),
        fetchStocks(),
        fetchCommodities()
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchRates, fetchStocks, fetchCommodities]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchAllTickers();
    
    const interval = setInterval(() => {
      fetchAllTickers();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchAllTickers]);

  return {
    rates,
    stocks,
    commodities,
    loading,
    error,
    lastUpdate,
    refresh: fetchAllTickers,
    fetchRates,
    fetchStocks,
    fetchCommodities,
  };
}