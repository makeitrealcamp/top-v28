import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { confirmUser } from '../api/users';
import { formatError } from '../utils';

export default function Confirmation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmit(event: React.MouseEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: { value: string };
    };

    setLoading(true);
    setError('');

    try {
      await confirmUser(target.email.value);

      setEmail(target.email.value);
    } catch (e) {
      if (e instanceof Error) {
        const message = formatError(e);
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Send Confirmation Link</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Spinner />}
      {email ? (
        <>
          <p>
            If your email is in our system, an email will be send to your inbox
          </p>
          <p>
            Check your email: <strong>{email}</strong> to activate your account.
          </p>
        </>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="rounded-pill text-white px-4"
          >
            Submit
          </Button>
        </Form>
      )}
    </>
  );
}
