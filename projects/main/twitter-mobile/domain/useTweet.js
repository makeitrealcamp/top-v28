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
    const res = await updateTweet(payload);
    if (res?.hasOwnProperty('data')) {
      const { data: item } = res;
      mutate({ data: item }, false);
    }
  }

  async function like({ id }) {
    const res = await likeTweet({ id });
    if (res?.hasOwnProperty('data')) {
      const { data: item } = res;
      mutate({ data: item }, false);
    }
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
