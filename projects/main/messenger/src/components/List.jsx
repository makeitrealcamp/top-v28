import { Badge, ListGroup } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
export default function List({ list = [], selected, onSelect }) {
  return (
    <ListGroup as="ul">
      {list.map((item) => (
        <ListGroup.Item
          active={selected === item.id}
          as="li"
          className="d-flex justify-content-between align-items-start"
          key={item.id}
          onClick={() => onSelect(item.id)}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{item.username}</div>
            {item.email}
          </div>
          <Badge bg="success" pill></Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
