import useSWR, { mutate as globalMutate } from 'swr';

import { createTweet, getTweets, updateTweet } from '../api/tweets';

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
      data: [item.data, ...response?.data],
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
    globalMutate(`tweets/${payload.id}`, (prevData) => {
      return {
        data: {
          ...prevData.data,
          ...payload,
        },
      };
    });
  }

  return {
    data: response?.data,
    loading: isLoading,
    error,
    actions: {
      create,
      update,
    },
  };
}
