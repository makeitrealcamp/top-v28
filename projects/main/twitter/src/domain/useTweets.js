import useSWR from 'swr';

import { createTweet, getTweets, likeTweet, updateTweet } from '../api/tweets';

export default function useTweets() {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR('tweets', getTweets);

  async function create(payload) {
    const { data: item } = await createTweet(payload);
    mutate({
      data: [item, ...response?.data],
    });
  }

  async function update(payload) {
    const { data: item } = await updateTweet(payload);
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
    const { data: item } = await likeTweet({ id });
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
