import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import Create from '../components/Create';
import UserContext from '../containers/UserContext';
import List from '../components/List';
import useTweets from '../domain/useTweets';
import useCreateTweet from '../domain/useCreateTweet';

export default function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const {
    data,
    loading: loadingList,
    error: errorList,
  } = useTweets({ refresh });
  const {
    loading: loadingCreate,
    error: errorCreate,
    actions: { create },
  } = useCreateTweet();

  const loading = loadingList || loadingCreate;
  const error = errorList || errorCreate;

  function displayTweet({ id }) {
    navigate(`/tweet/${id}`);
  }

  async function onCreate(payload) {
    await create(payload);
    setRefresh((prev) => prev + 1);
  }

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Home</h1>
      {user && <Create onCreate={onCreate} profilePhoto={user.profilePhoto} />}
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data && <List list={data} displayTweet={displayTweet} />}
    </>
  );
}
