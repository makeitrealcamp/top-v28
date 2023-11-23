import { setSession } from '../../session';
import { decodeUserOutput } from '../../users/decoders';
import { fetcher } from '../client';
import { LOGIN_MUTATION } from './typeDefs';

interface LoginResponse {
  login: {
    token: string;
    user: {
      id: string;
      name: string;
      username: string;
      avatar: string;
    };
  };
}

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetcher(LOGIN_MUTATION, {
      email,
      password,
    });
    console.log(response);
    // Handle successful login, store token, etc.
    const data = await decodeUserOutput(response.data);

    const { token = '' } = response.loginUser.token;

    setSession(token);

    const { user } = response.loginUser;
    return {
      user,
    };
  } catch (error) {
    // Handle errors (like invalid credentials)
    console.error(error);
  }
};
