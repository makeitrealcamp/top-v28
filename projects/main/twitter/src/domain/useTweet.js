import useSWR from 'swr';
import { useAuth0 } from '@auth0/auth0-react';

import { getTweet, likeTweet, updateTweet } from '../api/tweets';

export default function useTweet({ id }) {
  const { getAccessTokenSilently } = useAuth0();
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(id ? `tweets/${id}` : null, async () => {
    const token = await getAccessTokenSilently();
    return getTweet({ id }, token);
  });

  async function update(payload) {
    const token = await getAccessTokenSilently();
    const { data: item } = await updateTweet(payload, token);
    mutate({ data: item }, false);
  }

  async function like({ id }) {
    const token = await getAccessTokenSilently();
    const { data: item } = await likeTweet({ id }, token);
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
