function transformTweet(item = {}) {
  return {
    ...item,
    user: {
      name: item.user?.name ?? 'Unknown',
      username: item.user?.username ?? 'unknown',
    },
  };
}

// API Agent
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
