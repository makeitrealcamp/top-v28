import React from 'react';
import Form from 'react-bootstrap/Form';
import Follow from './Follow';

export default function Aside() {
  return (
    <aside>
      <Form.Control
        type="search"
        placeholder="Search Twitter"
        className="my-3 rounded-pill"
      />
      <div className="bg-light rounded py-2">
        <h2 className="fs-5 m-3">Who to follow</h2>
        <Follow />
        <Follow />
        <Follow />
        <Follow />
      </div>
    </aside>
  );
}
