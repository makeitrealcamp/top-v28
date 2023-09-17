import { useContext, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { getBlue } from '../api/users';
import UserContext from '../containers/UserContext';

export default function Blue() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleClick() {
    setLoading(true);
    setError('');

    const customer_email = user.email;
    const line_items = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Blue Subscription',
          },
          unit_amount: '2000',
        },
        quantity: 1,
      },
    ];

    try {
      const response = await getBlue({
        line_items,
        customer_email,
      });

      const { url } = response;
      document.location = url;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Blue</h1>
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      <p>
        X Premium is our premium subscription service that elevates quality
        conversations on the platform.
      </p>
      <Button
        variant="primary"
        type="button"
        className="rounded-pill text-white px-4"
        disabled={loading}
        onClick={handleClick}
      >
        Submit
      </Button>
    </>
  );
}
