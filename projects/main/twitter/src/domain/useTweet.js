import useSWR from 'swr';

import { getTweet } from '../api/tweets';

export default function useTweet({ id }) {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`tweets/${id}`, () => getTweet({ id }));

  return {
    data: response?.data,
    loading: isLoading,
    error,
  };
}
