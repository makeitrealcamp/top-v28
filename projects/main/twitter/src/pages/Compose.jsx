import { useNavigate } from 'react-router-dom';

import { createTweet } from '../api/tweets';
import Create from '../components/Create';

export default function Compose() {
  const navigate = useNavigate();

  async function onCreate(payload) {
    await createTweet(payload);
    navigate('/home');
  }

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Tweet</h1>
      <Create onCreate={onCreate} />
    </>
  );
}
