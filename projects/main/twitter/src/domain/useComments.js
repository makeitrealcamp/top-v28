import useSWR, { mutate as globalMutate } from 'swr';

import { createComment, getComments } from '../api/comments';

export default function useComments({ tweetId }) {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(tweetId ? 'comments' : null, () => getComments({ tweetId }));

  async function create(payload) {
    await createComment(payload);
    await mutate(true);
    globalMutate(`tweets/${id}`, true);
  }

  return {
    data: response?.data,
    loading: isLoading,
    error,
    actions: {
      create,
    },
  };
}
