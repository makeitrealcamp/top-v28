import { lazy, Suspense, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Aside from './components/Aside';
import { UserProvider } from './containers/UserContext';
import ProtectedRoute from './containers/ProtectedRoute';

const Home = lazy(() => import('./pages/Home.jsx'));
const Compose = lazy(() => import('./pages/Compose.jsx'));
const SignIn = lazy(() => import('./pages/SignIn.jsx'));
const SignUp = lazy(() => import('./pages/SignUp.jsx'));
const Signed = lazy(() => import('./pages/Signed.jsx'));
const Activate = lazy(() => import('./pages/Activate.jsx'));
const Confirmation = lazy(() => import('./pages/Confirmation.jsx'));
const Blue = lazy(() => import('./pages/Blue.jsx'));
const BlueSuccess = lazy(() => import('./pages/BlueSuccess.jsx'));
const Post = lazy(() => import('./pages/Post.jsx'));

function App() {
  return (
    <UserProvider>
      <Container fluid>
        <Row>
          <Col>
            <Navigation />
            <Profile />
          </Col>
          <Col md={6} className="border-start border-end">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route
                  path="/compose"
                  element={
                    <ProtectedRoute>
                      <Compose />
                    </ProtectedRoute>
                  }
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signed" element={<Signed />} />
                <Route path="/activate/:token" element={<Activate />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/blue/success" element={<BlueSuccess />} />
                <Route path="/blue" element={<Blue />} />
                <Route path="/tweet/:id" element={<Post />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </Col>
          <Col>
            <Aside />
          </Col>
        </Row>
      </Container>
    </UserProvider>
  );
}

export default App;
