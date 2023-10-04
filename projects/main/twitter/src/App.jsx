import { lazy, Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Aside from './components/Aside';
import ProtectedRoute from './containers/ProtectedRoute';

const Home = lazy(() => import('./pages/Home.jsx'));
const Blank = lazy(() => import('./pages/Blank.jsx'));
const Compose = lazy(() => import('./pages/Compose.jsx'));
const Blue = lazy(() => import('./pages/Blue.jsx'));
const BlueSuccess = lazy(() => import('./pages/BlueSuccess.jsx'));
const Post = lazy(() => import('./pages/Post.jsx'));

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Navigation />
          <Profile />
        </Col>
        <Col md={6} className="border-start border-end">
          <Suspense fallback={null}>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compose"
                element={
                  <ProtectedRoute>
                    <Compose />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blue/success"
                element={
                  <ProtectedRoute>
                    <BlueSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blue"
                element={
                  <ProtectedRoute>
                    <Blue />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tweet/:id"
                element={
                  <ProtectedRoute>
                    <Post />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Blank />} />
            </Routes>
          </Suspense>
        </Col>
        <Col>
          <Aside />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
