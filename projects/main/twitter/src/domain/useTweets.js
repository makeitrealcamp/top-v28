import { useEffect, useState } from 'react';

import { createTweet, getTweets } from '../api/tweets';

export default function useTweets() {
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

  async function create(payload) {
    setLoading(true);
    setError('');

    try {
      await createTweet(payload);
      loadTweets();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTweets();
  }, []);

  return {
    data,
    loading,
    error,
    actions: {
      create,
    },
  };
}
