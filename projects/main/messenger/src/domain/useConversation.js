import useSWR from 'swr';
import { getConversation } from '../api/conversations';

export default function useConversation({ id }) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/conversations/${id}` : null,
    () => getConversation({ id }),
  );

  function addMessage({ newMessage }) {
    mutate((prevData) => {
      return {
        ...prevData,
        messages: [newMessage, ...prevData.messages],
      };
    }, false);
  }

  return {
    data,
    error,
    isLoading,
    actions: {
      addMessage,
    },
  };
}
