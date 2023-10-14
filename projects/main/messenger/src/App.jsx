import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Blank from './pages/Blank';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

export default function App() {
  return (
    <>
      <Header />
      <Container className="d-flex flex-grow-1">
        <Row className="d-flex flex-grow-1">
          <Col className="d-flex flex-grow-1 flex-column">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Blank />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}
