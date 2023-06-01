import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

export default function Navigation() {
  return (
    <nav>
      <Nav defaultActiveKey="/home" className="flex-column fs-5 gap-2">
        <Nav.Link>
          <i className="bi bi-twitter fs-2"></i>
        </Nav.Link>
        <Nav.Link href="/home" className="text-dark">
          <i className="bi bi-house-door-fill me-3 fs-4"></i>
          Home
        </Nav.Link>
        <Nav.Link href="/" className="text-dark">
          <i className="bi bi-hash me-3 fs-4"></i>
          Explore
        </Nav.Link>
        <Nav.Link href="/" className="text-dark">
          <i className="bi bi-bell me-3 fs-4"></i>
          Notifications
        </Nav.Link>
        <Nav.Link href="/" className="text-dark">
          <i className="bi bi-envelope me-3 fs-4"></i>
          Messages
        </Nav.Link>
        <Nav.Link href="/" className="text-dark">
          <i className="bi bi-card-list me-3 fs-4"></i>
          Lists
        </Nav.Link>
        <Nav.Link href="/" className="text-dark">
          <i className="bi bi-bookmark me-3 fs-4"></i>
          Bookmarks
        </Nav.Link>
        <Nav.Link href="/" className="text-dark">
          <i className="bi bi-twitter me-3 fs-4"></i>
          Twitter Blue
        </Nav.Link>
        <Nav.Link href="/" className="text-dark">
          <i className="bi bi-person me-3 fs-4"></i>
          Profile
        </Nav.Link>
      </Nav>
      <div className="d-flex">
        <Button className="rounded-pill flex-grow-1 m-2 py-2 fs-5">
          Tweet
        </Button>
      </div>
    </nav>
  );
}
