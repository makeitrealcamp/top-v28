import { fetcher } from '../client';
import { LOGIN_MUTATION } from './typeDefs';

export const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
  try {
    const data = await fetcher(LOGIN_MUTATION, { email, password });
    // Handle successful login, store token, etc.
    console.log({ data });
    return data;
  } catch (error) {
    // Handle errors (like invalid credentials)
    console.error(error);
  }
};
