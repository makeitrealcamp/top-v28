import { Form } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
export default function FormMessage({ onSend }) {
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSend(event.target.value);
      event.target.value = '';
    }
  }

  return (
    <Form.Group className="my-3">
      <Form.Control
        type="text"
        placeholder="Type a message and press Enter"
        onKeyDown={handleKeyDown}
      />
    </Form.Group>
  );
}
