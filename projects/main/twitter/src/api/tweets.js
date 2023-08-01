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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tweets/`);
  if (response.ok) {
    const json = await response.json();
    const data = json.data.map(transformTweet);

    return {
      data,
      meta: json.meta,
    };
  } else {
    return Promise.reject('Network error');
  }
}

export async function getTweet({ id }) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tweets/${id}`);
  if (response.ok) {
    const json = await response.json();
    const data = transformTweet(json.data);

    return {
      data,
    };
  }
  if (response.status === 404) {
    return Promise.reject('Not found');
  }
  return Promise.reject('Network error');
}
