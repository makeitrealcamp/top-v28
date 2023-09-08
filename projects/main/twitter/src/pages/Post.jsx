import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import Tweet from '../components/Tweet';
import { getTweet } from '../api/tweets';

export default function Post() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadTweet({ id }) {
    setLoading(true);
    setError('');

    try {
      const response = await getTweet({ id });

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      loadTweet({ id });
    }
  }, [id]);

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Tweet</h1>
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data && (
        <Tweet
          name={data.user.name}
          username={data.user.username}
          photo={data.user.profilePhoto}
          content={data.content}
          tweetPhoto={data.photo}
          createdAt={data.createdAt}
        />
      )}
    </>
  );
}
