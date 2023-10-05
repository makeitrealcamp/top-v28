import http from '../http';

import { decodeTweetOutput } from './decoders';

export async function getTweets({ parentId }, token) {
  try {
    const url = parentId ? `/tweets/${parentId}/comments` : '/tweets/';
    const { data: response } = await http.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await Promise.all(response.data.map(decodeTweetOutput));

    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function getTweet({ id }, token) {
  try {
    const { data: response } = await http.get(`/tweets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await decodeTweetOutput(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function createTweet(payload, token) {
  try {
    const { data: response } = await http.post(`/tweets/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await decodeTweetOutput(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function updateTweet(payload, token) {
  const { id, ...rest } = payload;
  try {
    const { data: response } = await http.patch(`/tweets/${id}`, rest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await decodeTweetOutput(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function likeTweet({ id }, token) {
  try {
    const { data: response } = await http.patch(
      `/tweets/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await decodeTweetOutput(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}
