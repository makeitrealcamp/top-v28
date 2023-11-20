import useSWR from 'swr';
import { fetcher } from '../api/graphql/client';
import {
  CREATE_TWEET_MUTATION,
  GET_ALL_TWEETS_QUERY,
} from '../api/graphql/tweets';

interface TweetsResponse {
  tweets: Tweet[];
}

interface Tweet {
  id: string;
  content: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
}

export default function useTweets() {
  const { data, error, mutate } = useSWR<any>(GET_ALL_TWEETS_QUERY,fetcher);

  async function create(input: FormData) {
    const newTweet = await fetcher(CREATE_TWEET_MUTATION, { input });
    mutate(
      (prevData: any) => ({
        tweets: [newTweet.createTweet, ...prevData.tweets],
      }),
      false
    );
  }


  return {
    data: data?.tweets,
    loading: !data && !error,
    error,
    actions: {
      create,

    },
  };
}
