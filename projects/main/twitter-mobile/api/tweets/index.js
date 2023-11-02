import http from '../http';

import { decodeTweetOutput } from './decoders';
import { TweetType } from './types';

export async function getTweets({ parentId }) {
  try {
    const url = parentId ? `/tweets/${parentId}/comments` : '/tweets/';
    const { data: response } = await http.get(url);
    const data = await Promise.all(response.data.map(decodeTweetOutput));

    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error.message);
    }
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
    if (error instanceof Error) {
      return Promise.reject(error.message);
    }
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
    if (error instanceof Error) {
      return Promise.reject(error.message);
    }
  }
}

export async function updateTweet(payload) {
  const { id, ...rest } = payload;
  try {
    const { data: response } = await http.patch(`/tweets/${id}`, rest);
    const data = await decodeTweetOutput(response.data);

    return {
      data,
    };
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error.message);
    }
  }
}

export async function likeTweet({ id }) {
  try {
    const { data: response } = await http.patch(`/tweets/${id}/like`, {});
    const data = await decodeTweetOutput(response.data);

    return {
      data,
    };
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error.message);
    }
  }
}
