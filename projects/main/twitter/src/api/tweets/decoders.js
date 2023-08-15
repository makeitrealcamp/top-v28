import { TweetOutput } from "./types";

export async function decodeTweetsOutput(payload) {
  try {
    if (payload instanceof Array) {
      //si viene array
      const dataTweets = await Promise.all(
        payload.map((tweetData) => TweetOutput.parseAsync(tweetData))
      );
      return dataTweets;
    } else {
      return await TweetOutput.parseAsync(payload); //si viene obj
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

// export async function decodeTweetOutputCreate(payload) {
//   try {
//     const data = await TweetOutputCreate.parseAsync(payload);
//     return data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }
