import { useState, useEffect, useMemo } from "react";

function useFetch(url, transfromData = null, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedOptions = useMemo(() => {
    options;
  }, [options]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, memoizedOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        let result = await response.json();
        if (transfromData) {
          result = await transfromData(result);
        }
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, memoizedOptions, transfromData]);

  return { data, loading, error };
}

export { useFetch };
