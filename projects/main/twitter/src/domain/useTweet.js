import useSWR from 'swr';

import { getTweet, updateTweet } from '../api/tweets';

export default function useTweet({ id }) {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(`tweets/${id}`, () => getTweet({ id }));

  async function update(payload) {
    const { data: item } = await updateTweet(payload);
    mutate({ data: item }, false);
  }

  return {
    data: response?.data,
    loading: isLoading,
    error,
    actions: {
      update,
    },
  };
}
