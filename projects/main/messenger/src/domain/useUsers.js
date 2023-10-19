import useSWR from 'swr';
import { getUsers } from '../api/users';

export default function useUsers() {
  const { data, error, isLoading } = useSWR('/users', getUsers);

  return {
    data,
    error,
    isLoading,
  };
}
