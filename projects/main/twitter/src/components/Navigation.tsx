import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styled from '@emotion/styled';
import { NavLink, useNavigate } from 'react-router-dom';

import UserContext from '../containers/UserContext';

const NavLinkStyled = styled(NavLink)(({ theme }) => {
  const color = theme.colors['gray-900'];
  const backgroundColor = theme.colors['gray-200'];

  return {
    borderRadius: theme.border.radius.pill,
    color,
    paddingRight: theme.space[4],
    '&:hover': {
      backgroundColor,
      color,
    },
    '&.active': {
      backgroundColor,
      color,
    },
  };
});

// Override NavLinkStyled for Twitter Icon
const NavLinkHomeStyled = styled(NavLinkStyled)(({ theme }) => ({
  color: theme.colors.primary,
  marginTop: theme.space[2],
  paddingRight: 0,
  '&:hover': {
    backgroundColor: theme.colors['gray-200'],
    color: theme.colors.primary,
  },
  '&.active': {
    backgroundColor: theme.colors.white,
    color: theme.colors.primary,
  },
}));

const IconStyled = styled('i')(({ theme }) => ({
  fontSize: theme.fonts[4],
  marginRight: theme.space[3],
}));

export default function Navigation() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav className="mb-4">
      <Nav
        defaultActiveKey="/home"
        className="flex-column fs-5 gap-2 align-items-start"
      >
        <NavLinkHomeStyled to="/" className="nav-link">
          <IconStyled className="bi bi-twitter fs-2" />
        </NavLinkHomeStyled>
        <NavLinkStyled to="/home" className="nav-link">
          <IconStyled className="bi bi-house-door-fill" />
          Home
        </NavLinkStyled>
        <NavLinkStyled to="/explore" className="nav-link">
          <IconStyled className="bi bi-hash" />
          Explore
        </NavLinkStyled>
        {user && (
          <>
            <NavLinkStyled to="/notifications" className="nav-link">
              <IconStyled className="bi bi-bell" />
              Notifications
            </NavLinkStyled>
            <NavLinkStyled to="/messages" className="nav-link">
              <IconStyled className="bi bi-envelope" />
              Messages
            </NavLinkStyled>
            <NavLinkStyled to="/lists" className="nav-link">
              <IconStyled className="bi bi-card-list" />
              Lists
            </NavLinkStyled>
            <NavLinkStyled to="/bookmarks" className="nav-link">
              <IconStyled className="bi bi-bookmark" />
              Bookmarks
            </NavLinkStyled>
            <NavLinkStyled to="/blue" className="nav-link">
              <IconStyled className="bi bi-twitter" />
              Twitter Blue
            </NavLinkStyled>
            <NavLinkStyled to="/profile" className="nav-link">
              <IconStyled className="bi bi-person" />
              Profile
            </NavLinkStyled>
          </>
        )}
      </Nav>
      {user && (
        <div className="d-flex">
          <Button
            className="rounded-pill text-white flex-grow-1 m-2 py-2 fs-5"
            onClick={() => navigate('/compose')}
          >
            Tweet
          </Button>
        </div>
      )}
    </nav>
  );
}
