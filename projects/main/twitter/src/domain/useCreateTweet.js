import { useState } from 'react';
import { createTweet } from '../api/tweets';

export default function useCreateTweet() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function create(payload) {
    setLoading(true);
    setError('');

    try {
      const response = await createTweet(payload);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    actions: {
      create,
    },
  };
}
