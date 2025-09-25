import { useState, useCallback } from "react";
import MortgageAPI from "../utils/mortgageSearchAPI";

export default function useMortgageSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const searchMortgages = useCallback(async (criteria) => {
    setLoading(true);
    setError(null);
    try {
      const data = await MortgageAPI.searchMortgages(criteria);
      setResults(data.results || data || []);
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const lockRate = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await MortgageAPI.lockRate(payload);
      return { ok: true, data };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const calculatePayment = useCallback(async (loanAmount, rate, term) => {
    setLoading(true);
    setError(null);
    try {
      const data = await MortgageAPI.calculatePayment(loanAmount, rate, term);
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
    searchMortgages,
    lockRate,
    calculatePayment,
  };
}
