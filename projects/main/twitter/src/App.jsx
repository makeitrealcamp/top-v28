import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Tweet from './components/Tweet';
import Create from './components/Create';
import Aside from './components/Aside';

function App() {
  const user = null;
  return (
    <Container fluid>
      <Row>
        <Col>
          <Navigation />
          {user && <Profile />}
        </Col>
        <Col md={6} className="border-start border-end">
          <h1 className="fs-5 my-2 fw-bolder">Home</h1>
          {user && <Create />}
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
        </Col>
        <Col>
          <Aside />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
