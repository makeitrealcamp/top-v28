import { Col, Row } from 'react-bootstrap';

import List from '../components/List';
import Chat from '../components/Chat';

export default function Home() {
  return (
    <Row className="mt-4 d-flex flex-grow-1">
      <Col md={4}>
        <List />
      </Col>
      <Col md={8} className="d-flex flex-column">
        <Chat />
      </Col>
    </Row>
  );
}
