import http from './http';

export async function createmessage(payload) {
  try {
    const { data: response } = await http.post('/messages', payload);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
