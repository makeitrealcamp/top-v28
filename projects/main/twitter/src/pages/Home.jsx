import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { createTweet, getTweets } from '../api/tweets';
import Create from '../components/Create';
import Tweet from '../components/Tweet';
import { useSelector } from 'react-redux';
import { getUser } from '../store/userReducer';

export default function Home() {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadTweets() {
    setLoading(true);
    setError('');

    try {
      const response = await getTweets();

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  function displayTweet({ id }) {
    navigate(`/tweet/${id}`);
  }

  async function onCreate(payload) {
    setLoading(true);
    setError('');

    try {
      await createTweet(payload);
      loadTweets();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTweets();
  }, []);

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Home</h1>
      {user && <Create onCreate={onCreate} profilePhoto={user.profilePhoto} />}
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data.map(function (item) {
        return (
          <Tweet
            key={item.id}
            name={item.user.name}
            username={item.user.username}
            profilePhoto={item.user.profilePhoto}
            content={item.content}
            tweetPhoto={item.photo}
            createdAt={item.createdAt}
            onClick={() => displayTweet(item)}
          />
        );
      })}
    </>
  );
}
