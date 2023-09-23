import http from '../http';

import { decodeCommentOutput } from './decoders';

export async function getComments({ tweetId }) {
  try {
    const { data: response } = await http.get(`/tweets/${tweetId}/comments/`);
    const data = await Promise.all(response.data.map(decodeCommentOutput));

    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function createComment(payload) {
  try {
    const { data: response } = await http.post(`/comments/`, payload);
    const data = await decodeCommentOutput(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}
