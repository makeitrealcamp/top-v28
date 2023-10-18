import { useContext } from 'react';
import { Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import UserContext from '../containers/UserContext';

export default function NavUser() {
  const { user } = useContext(UserContext);
  const isAuthenticated = user !== null;

  return isAuthenticated ? (
    <Nav>
      <NavLink className="nav-link" href="#">
        @{user.username}
      </NavLink>
      <Link to="/signout" className="nav-link">
        Sign Out
      </Link>
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
