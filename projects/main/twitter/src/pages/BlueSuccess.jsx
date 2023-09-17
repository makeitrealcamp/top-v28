import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation } from 'react-router-dom';

import { validateBlue } from '../api/users';

export default function BlueSuccess() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const session_id = query.get('session_id');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState();

  async function onValidareBlue(id) {
    setLoading(true);
    setError('');

    try {
      const response = await validateBlue(id);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session_id) {
      onValidareBlue(session_id);
    }
  }, [session_id]);

  const created = data && new Date(data.created * 1000).toISOString();

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Welcome to Blue</h1>
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      <h2>You are Premium from {created}</h2>
      <p>
        Premium includes a number of features* to improve your experience,
        including:
      </p>
      <ul>
        <li>
          Edit post: This highly requested feature gives you a 1 hour window to
          make a limited number of changes to published posts. Use it to make
          updates, tag someone, or reorder the media you attached. Edit post
          currently only applies to original posts and Quotes.
        </li>
      </ul>
    </>
  );
}
