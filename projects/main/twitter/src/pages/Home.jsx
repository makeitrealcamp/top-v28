import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useAuth0 } from '@auth0/auth0-react';

import Create from '../components/Create';
import List from '../components/List';
import useTweets from '../domain/useTweets';

export default function Home() {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  const {
    data,
    loading,
    error,
    actions: { create, like },
  } = useTweets();

  const onSelect = useCallback(function (event, { id }) {
    event.stopPropagation();
    navigate(`/tweet/${id}`);
  }, []);

  const onLike = useCallback(async function (event, { id }) {
    event.stopPropagation();
    await like({ id });
  }, []);

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Home</h1>
      {isAuthenticated && (
        <Create onCreate={create} profilePhoto={user.picture} />
      )}
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data && <List list={data} onSelect={onSelect} onLike={onLike} />}
    </>
  );
}
