import useSWR from 'swr';
import { getConversation } from '../api/conversations';

export default function useConversation({ id }) {
  const { data, error, isLoading } = useSWR(
    id ? `/conversations/${id}` : null,
    () => getConversation({ id }),
  );
  return {
    data,
    error,
    isLoading,
  };
}
