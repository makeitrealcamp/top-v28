import useSWR, { mutate as globalMutate } from 'swr';

import { createTweet, getTweets, likeTweet } from '../api/tweets';

export default function useComments({
  tweetId,
}: {
  tweetId: string | undefined;
}) {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(tweetId ? `tweets/${tweetId}/comments` : null, () =>
    getTweets({ parentId: tweetId }),
  );

  async function create(payload: FormData) {
    const res = await createTweet(payload);
    if (res?.hasOwnProperty('data')) {
      const { data: item } = res;
      mutate({
        data: [item, ...(response?.data || [])],
      });
      globalMutate(`tweets/${tweetId}`, true);
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
    },
  };
}
