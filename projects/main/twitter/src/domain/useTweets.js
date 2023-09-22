import useSWR from 'swr';

import { createTweet, getTweets } from '../api/tweets';

export default function useTweets() {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR('tweets', getTweets);

  async function create(payload) {
    // Update remotely
    await createTweet(payload);
    mutate(true);

    // Update locally
    // const item = await createTweet(payload);
    // mutate(
    //   {
    //     data: [item.data, ...response?.data],
    //   },
    //   false,
    // );
  }

  return {
    data: response?.data,
    loading: isLoading,
    error,
    actions: {
      create,
    },
  };
}
