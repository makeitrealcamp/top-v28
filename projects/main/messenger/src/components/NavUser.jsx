import { useContext } from 'react';
import { Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { clearSession } from '../api/session';
import UserContext from '../containers/UserContext';
import socket from '../socket';

export default function NavUser() {
  const { user, setUser } = useContext(UserContext);
  const isAuthenticated = user !== null;

  function SignOut() {
    socket.emit('offline', user);
    setUser(null);
    clearSession();
  }

  return isAuthenticated ? (
    <Nav>
      <NavLink className="nav-link" href="#">
        @{user.username}
      </NavLink>
      <NavLink className="nav-link" onClick={SignOut}>
        Sign Out
      </NavLink>
    </Nav>
  ) : (
    <Nav>
      <Link to="/signup" className="nav-link">
        Sign Up
      </Link>
      <Link to="/signin" className="nav-link">
        Sign In
      </Link>
    </Nav>
  );
}
