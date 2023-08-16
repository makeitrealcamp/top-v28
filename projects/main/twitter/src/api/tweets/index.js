import { decodeTweetOutput } from './decoder';
import http from '../http';

export async function getTweets() {
  try {
    const { data: response } = await http.get('/tweets/');
    const data = response.data;

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
    const data = decodeTweetOutput(response.data);

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
    const data = decodeTweetOutput(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}
