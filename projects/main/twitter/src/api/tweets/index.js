import http from '../http';

import { decodeTweetOutput } from './decoders';

export async function getTweets() {
  try {
    const { data: response } = await http.get('/tweets/');
    const data = await Promise.all(response.data.map(decodeTweetOutput));

    return {
      data,
      meta: response.meta,
    };
} catch (error) {
    return Promise.reject(error.message);
  }
}

export async function getTweet({ id }) {
  try {
    const { data: response } = await http.get(`/tweets/${id}`);
    const data = await decodeTweetOutput(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function createTweet(payload) {
  try {
    const { data: response } = await http.post(`/tweets/`, payload);
    const data = await decodeTweetOutput(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}