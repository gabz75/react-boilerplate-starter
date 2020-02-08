import { useCallback, useState } from 'react';

export const useFetch = (url, fetchConfig = {}) => {
  const [json, setJSON] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const makeRequest = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url, fetchConfig);
      const responseJson = await response.json();
      setJSON(responseJson);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }, [url, fetchConfig]);

  const state = { json, loading, error };

  return [state, makeRequest];
};
