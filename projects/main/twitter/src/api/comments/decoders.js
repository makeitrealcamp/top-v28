import { CommentOutput } from './types';

export async function decodeCommentOutput(payload) {
  try {
    const data = await CommentOutput.parseAsync(payload);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
