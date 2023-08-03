import http from './http';

function transformTweet(item = {}) {
  return {
    ...item,
    user: {
      name: item.user?.name ?? 'Unknown',
      username: item.user?.username ?? 'unknown',
    },
  };
}

export async function getTweets() {
  try {
    const { data: response } = await http.get('/tweets/');
    const data = response.data.map(transformTweet);

    return {
      data,
      meta: response.meta,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function getTweet({ id }) {
  try {
    const { data: response } = await http.get(`/tweets/${id}`);
    const data = transformTweet(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function createTweet(payload) {
  try {
    const { data: response } = await http.post(`/tweets/`, payload);
    const data = transformTweet(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}
