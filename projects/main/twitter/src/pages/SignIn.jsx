import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SignIn() {
  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Sign In</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="rounded-pill text-white px-4"
        >
          Submit
        </Button>
      </Form>
    </>
  );
}
