import { useState, useCallback } from 'react';
import API from './apiService';

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const call = useCallback(async (fn) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn();
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || err.message);
      throw err;
    }
  }, []);

  return { loading, error, call, setError };
}
