import { Col, Container, Row } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import ProtectedRoute from './containers/ProtectedRoute';
import { UserProvider } from './containers/UserContext';
import Home from './pages/Home';
import Blank from './pages/Blank';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

export default function App() {
  return (
    <UserProvider>
      <Header />
      <Container className="d-flex flex-grow-1">
        <Row className="d-flex flex-grow-1">
          <Col className="d-flex flex-grow-1 flex-column">
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<Blank />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </UserProvider>
  );
}
