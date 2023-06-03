import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigation from './components/Navigation';
import Account from './components/Account';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Navigation />
          <Account />
        </Col>
        <Col md={6} className="border-start border-end"></Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;
