import { getTweet } from '../fixtures/tweet.fixture';

export function getTweets() {
  const result = [];
  for (let index = 0; index < 10; index++) {
    const tweet = getTweet();
    result.push(tweet);
  }
  return result;
}
