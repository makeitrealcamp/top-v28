import http from './http';

export async function createConversation(payload) {
  try {
    const { data: response } = await http.post('/conversations', payload);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getConversations() {
  try {
    const { data: response } = await http.get('/conversations');

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getConversation({ id }) {
  try {
    const { data: response } = await http.get(`/conversations/${id}`);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
