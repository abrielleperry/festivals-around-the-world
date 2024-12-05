import React, { useState, useEffect, useCallback } from 'react';

export default function DataFetcher({ endpoint }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]); // Include endpoint as a dependency

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Add fetchData as a dependency

  if (loading) {
    return <div className="animate-pulse bg-gray-700 h-20 rounded-md"></div>;
  }

  if (error) {
    return <div className="text-red-400">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-purple-400">Fetched Data</h3>
      <pre className="text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
