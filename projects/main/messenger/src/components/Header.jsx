import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavUser from './NavUser';

export default function Header() {
  return (
    <Navbar expand="lg" className="bg-light">
      <Container>
        <Link to="/home" className="navbar-brand">
          Messenger
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/create" className="btn btn-primary">
              Create
            </Link>
          </Nav>
          <NavUser />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
