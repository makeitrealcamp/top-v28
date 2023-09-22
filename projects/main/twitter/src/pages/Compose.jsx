import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Create from '../components/Create';
import UserContext from '../containers/UserContext';
import useTweets from '../domain/useTweets';

export default function Compose() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const {
    actions: { create },
  } = useTweets();

  async function onCreate(payload) {
    await create(payload);
    navigate('/home');
  }

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Tweet</h1>
      <Create onCreate={onCreate} profilePhoto={user.profilePhoto} />
    </>
  );
}
