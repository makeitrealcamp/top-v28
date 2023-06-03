import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Create() {
  return (
    <div className="d-flex border-bottom pb-2 mb-2">
      <div className="d-flex">
        <div className="p-2">
          <img src="https://placehold.co/48x48" className="rounded-circle" />
        </div>
      </div>
      <div className="flex-grow-1">
        <Form className="d-flex flex-column">
          <Form.Group className="mb-3 border-bottom">
            <Form.Control
              as="textarea"
              rows={2}
              className="border border-0"
              placeholder="What is happening?!"
            />
          </Form.Group>
          <Button variant="primary" className="rounded-pill align-self-end">
            Tweet
          </Button>
        </Form>
      </div>
    </div>
  );
}
