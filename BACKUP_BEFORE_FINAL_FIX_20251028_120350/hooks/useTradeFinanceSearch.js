import { useState, useCallback } from "react";
import TradeFinanceAPI from "../utils/tradeFinanceAPI";

export default function useTradeFinanceSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [rates, setRates] = useState({});

  const searchTradeFinance = useCallback(async (criteria) => {
    setLoading(true);
    setError(null);
    try {
      const data = await TradeFinanceAPI.searchTradeFinance(criteria);
      setResults(data.results || data || []);
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const createFactoring = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await TradeFinanceAPI.createFactoring(payload);
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateFee = useCallback(async (invoiceAmount, rate, term) => {
    setLoading(true);
    setError(null);
    try {
      const data = await TradeFinanceAPI.calculateFactoringFee(invoiceAmount, rate, term);
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRates = useCallback(async () => {
    try {
      const data = await TradeFinanceAPI.getTradeFinanceRates();
      setRates(data || {});
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    }
  }, []);

  return {
    loading,
    error,
    results,
    rates,
    searchTradeFinance,
    createFactoring,
    calculateFee,
    loadRates,
  };
}
