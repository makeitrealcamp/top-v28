import useSWR from 'swr';
import { createConversation, getConversations } from '../api/conversations';

export default function useConversations() {
  const { data, error, isLoading, mutate } = useSWR(
    '/conversations',
    getConversations,
  );

  async function create(payload) {
    const conversation = await createConversation(payload);

    mutate((conversations) => {
      return [conversation, ...conversations];
    }, false);

    return conversation;
  }

  return {
    data,
    error,
    isLoading,
    actions: {
      create,
    },
  };
}
