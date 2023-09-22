import { useEffect, useState } from 'react';

import { getTweet } from '../api/tweets';

export default function useTweet({ id }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadTweet() {
    setLoading(true);
    setError('');

    try {
      const response = await getTweet({ id });

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      loadTweet();
    }
  }, [id]);

  return {
    data,
    loading,
    error,
  };
}
