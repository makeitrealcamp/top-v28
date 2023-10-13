import { TweetOutput } from './types';

export async function decodeTweetOutput(payload: unknown) {
  try {
    const data = await TweetOutput.parseAsync(payload);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
