import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import Tweet from '../components/Tweet';
import useTweet from '../domain/useTweet';

export default function Post() {
  const { id } = useParams();
  const { data, loading, error } = useTweet({ id });

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Tweet</h1>
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data && (
        <Tweet
          name={data.user.name}
          username={data.user.username}
          profilePhoto={data.user.profilePhoto}
          content={data.content}
          tweetPhoto={data.photo}
          createdAt={data.createdAt}
        />
      )}
    </>
  );
}
