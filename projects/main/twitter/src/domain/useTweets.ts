import useSWR from 'swr';

import { createTweet, getTweets, likeTweet, updateTweet } from '../api/tweets';

export default function useTweets() {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR('tweets', getTweets);

  async function create(payload: FormData) {
    const res = await createTweet(payload);
    if (res?.hasOwnProperty('data')) {
      const { data: item } = res;
      mutate({
        data: [item, ...(response?.data || [])],
      });
    }
  }

  async function update(payload: FormData & { id: string }) {
    const res = await updateTweet(payload);
    if (res?.hasOwnProperty('data')) {
      const { data: item } = res;
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
  }

  async function like({ id }: { id: string }) {
    const res = await likeTweet({ id });
    if (res?.hasOwnProperty('data')) {
      const { data: item } = res;
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
