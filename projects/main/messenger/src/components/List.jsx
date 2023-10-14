import { Badge, ListGroup } from 'react-bootstrap';

export default function List() {
  return (
    <ListGroup as="ul">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        active
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">gmorales</div>
          gustavo.morales@gmail.com
        </div>
        <Badge bg="success" pill>
          Active
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">gmorales</div>
          gustavo.morales@gmail.com
        </div>
        <Badge bg="secondary" pill>
          Inactive
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">gmorales</div>
          gustavo.morales@gmail.com
        </div>
        <Badge bg="success" pill>
          Active
        </Badge>
      </ListGroup.Item>
    </ListGroup>
  );
}
