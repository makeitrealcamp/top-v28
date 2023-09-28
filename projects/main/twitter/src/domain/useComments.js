import useSWR, { mutate as globalMutate } from 'swr';

import { createTweet, getTweets, likeTweet } from '../api/tweets';

export default function useComments({ tweetId }) {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(tweetId ? `tweets/${tweetId}/comments` : null, () =>
    getTweets({ parentId: tweetId }),
  );

  async function create(payload) {
    const { data: item } = await createTweet(payload);
    mutate({
      data: [item, ...response?.data],
    });
    globalMutate(`tweets/${tweetId}`, true);
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
    },
  };
}
