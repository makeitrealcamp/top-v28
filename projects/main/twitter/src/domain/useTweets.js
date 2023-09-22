import { useEffect, useState } from 'react';

import { getTweets } from '../api/tweets';

export default function useTweets({ refresh }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadTweets() {
    setLoading(true);
    setError('');

    try {
      const response = await getTweets();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTweets();
  }, [refresh]);

  return {
    data,
    loading,
    error,
  };
}
