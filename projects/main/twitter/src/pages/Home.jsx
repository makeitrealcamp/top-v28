import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import UserContext from '../containers/UserContext';
import Create from '../components/Create';
import List from '../components/List';
import useTweets from '../domain/useTweets';

export default function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    data,
    loading,
    error,
    actions: { create },
  } = useTweets();

  function displayTweet({ id }) {
    navigate(`/tweet/${id}`);
  }

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Home</h1>
      {user && <Create onCreate={create} profilePhoto={user.profilePhoto} />}
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data && <List list={data} displayTweet={displayTweet} />}
    </>
  );
}
