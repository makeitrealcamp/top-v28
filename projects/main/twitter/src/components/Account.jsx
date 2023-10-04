import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';

export default function Account() {
  const { loginWithRedirect } = useAuth0();

  function onSignUp() {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }

  function onSignIn() {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signin',
      },
    });
  }

  return (
    <div className="d-flex mt-2 py-4">
      <div className="d-flex flex-grow-1 flex-column">
        <span>New on Twitter?</span>
        <Button
          className="rounded-pill flex-grow-1 m-2 py-2 fs-6 text-white"
          onClick={onSignUp}
        >
          Sign Up
        </Button>
        <span>Already have an account?</span>
        <Button
          variant="light"
          className="rounded-pill flex-grow-1 m-2 py-2 fs-6"
          onClick={onSignIn}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
