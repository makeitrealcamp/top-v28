import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Signed() {
  const location = useLocation();
  const { state } = location;
  const { email } = state;

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Account created</h1>
      <p>Your account has been created.</p>
      <p>
        Check your email: <strong>{email}</strong> to activate your account.
      </p>
    </>
  );
}
