import { Card, Form } from 'react-bootstrap';

export default function Chat() {
  return (
    <>
      <div className="d-flex flex-column-reverse flex-grow-1 align-self-start justify-content-start w-100">
        <Card className="my-1 w-auto rounded-pill bg-light text-dark align-self-start">
          <Card.Body className="text-start">Recipient message</Card.Body>
        </Card>
        <Card className="my-1 w-auto rounded-pill bg-primary text-white align-self-end">
          <Card.Body className="text-end">Sender message</Card.Body>
        </Card>
      </div>
      <Form.Group className="my-3">
        <Form.Control type="text" placeholder="Type a message..." />
      </Form.Group>
    </>
  );
}
