import axios from 'axios';

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
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_API_URL}/tweets/`,
    );
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
    const { data: response } = await axios.get(
      `${import.meta.env.VITE_API_URL}/tweets/${id}`,
    );
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
    const { data: response } = await axios.post(
      `${import.meta.env.VITE_API_URL}/tweets/`,
      {
        ...payload,
        userId: 'ee36e6ae-ee5e-4725-82ec-ca089bb419f8',
      },
    );

    const data = transformTweet(response.data);

    return {
      data,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}
