import useSWR from 'swr';

import { getTweet, likeTweet, updateTweet } from '../api/tweets';

export default function useTweet({ id }) {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(id ? `tweets/${id}` : null, () => getTweet({ id }));

  async function update(payload) {
    const { data: item } = await updateTweet(payload);
    mutate({ data: item }, false);
  }

  async function like({ id }) {
    const { data: item } = await likeTweet({ id });
    mutate({ data: item }, false);
  }

  return {
    data: response?.data,
    loading: isLoading,
    error,
    actions: {
      like,
      update,
    },
  };
}
