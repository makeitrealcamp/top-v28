import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { Link, useParams } from 'react-router-dom';
import { activateUser } from '../api/users';
import { formatError } from '../utils';

export default function Activate() {
  const params = useParams();
  const { token } = params;

  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function activate(userToken) {
    setLoading(true);
    setError('');

    try {
      await activateUser(userToken);

      setSuccess(true);
    } catch (e) {
      const message = formatError(e);
      setSuccess(false);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      activate(token);
    }
  }, [token]);

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Account activation</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner />
      ) : success ? (
        <p>
          Your account has been activated. Go to{' '}
          <Link to="/signin">Sign In</Link>
        </p>
      ) : (
        <p>
          If you want to generate a new activation link{' '}
          <Link to="/confirmation">Click here</Link>
        </p>
      )}
    </>
  );
}
