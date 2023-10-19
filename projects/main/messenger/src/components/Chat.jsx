import { Card } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
export default function Chat({ messages = [], userId = 0 }) {
  return (
    <div className="d-flex flex-column-reverse flex-grow-1 align-self-start justify-content-start w-100">
      {messages.map((message) => (
        <Card
          key={message.id}
          className={`my-1 w-auto rounded-pill ${
            message.userId === userId
              ? 'bg-primary text-white align-self-end'
              : 'bg-light text-dark align-self-start'
          }`}
        >
          <Card.Body
            className={message.userId === userId ? 'text-end' : 'text-start'}
          >
            {message.content}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
