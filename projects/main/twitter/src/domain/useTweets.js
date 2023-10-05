import useSWR from 'swr';
import { useAuth0 } from '@auth0/auth0-react';

import { createTweet, getTweets, likeTweet, updateTweet } from '../api/tweets';

export default function useTweets() {
  const { getAccessTokenSilently } = useAuth0();

  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR('tweets', async () => {
    const token = await getAccessTokenSilently();
    return getTweets({}, token);
  });

  async function create(payload) {
    const token = await getAccessTokenSilently();
    console.log('token', token);
    const { data: item } = await createTweet(payload, token);
    mutate({
      data: [item, ...response?.data],
    });
  }

  async function update(payload) {
    const token = await getAccessTokenSilently();
    const { data: item } = await updateTweet(payload, token);
    mutate(
      {
        data: response?.data.map((tweet) => {
          if (tweet.id === item.id) {
            return item;
          }
          return tweet;
        }),
      },
      false,
    );
  }

  async function like({ id }) {
    const token = await getAccessTokenSilently();
    const { data: item } = await likeTweet({ id }, token);
    mutate(
      {
        data: response?.data.map((tweet) => {
          if (tweet.id === item.id) {
            return item;
          }
          return tweet;
        }),
      },
      false,
    );
  }

  return {
    data: response?.data,
    loading: isLoading,
    error,
    actions: {
      create,
      like,
      update,
    },
  };
}
