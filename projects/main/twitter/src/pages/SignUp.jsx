import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SignUp() {
  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Sign Up</h1>
      <Form>
        <h2 className="fs-5 my-4">Personal information</h2>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Biography</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="About you" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Location" />
        </Form.Group>

        <h2 className="fs-5 my-4">Login information</h2>

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
