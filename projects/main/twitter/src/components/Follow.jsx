import React from 'react';
import User from './User';
import Button from 'react-bootstrap/esm/Button';

export default function Follow() {
  return (
    <User>
      <div className="m-1">
        <Button variant="dark">Follow</Button>
      </div>
    </User>
  );
}
