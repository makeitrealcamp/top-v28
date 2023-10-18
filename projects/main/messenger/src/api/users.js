import http from './http';
import { setSession } from './session';

export async function signIn({ email, password }) {
  try {
    const { data: response } = await http.post('/users/signin', {
      email,
      password,
    });

    const { token = '' } = response;
    setSession(token);
    delete response.token;

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function signUp(payload) {
  try {
    const { data: response } = await http.post('/users/signup', payload);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getUsers() {
  try {
    const { data: response } = await http.get('/users');

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
