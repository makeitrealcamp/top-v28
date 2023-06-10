import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  borderRadius: theme.border.radius.pill,
  color: theme.colors['gray-900'],
  paddingRight: theme.space[4],
  '&:hover': {
    backgroundColor: theme.colors['gray-200'],
    color: theme.colors['gray-900'],
  },
}));

const IconStyled = styled('i')(({ theme }) => ({
  fontSize: theme.fonts[4],
  marginRight: theme.space[3],
}));

export default function Navigation() {
  const user = null;
  return (
    <nav className="mb-4">
      <Nav
        defaultActiveKey="/home"
        className="flex-column fs-5 gap-2 align-items-start"
      >
        <NavLink to="/" className="nav-link">
          <IconStyled className="bi bi-twitter fs-2" />
        </NavLink>
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
            <NavLinkStyled to="/" className="nav-link">
              <IconStyled className="bi bi-bell" />
              Notifications
            </NavLinkStyled>
            <NavLinkStyled to="/" className="nav-link">
              <IconStyled className="bi bi-envelope" />
              Messages
            </NavLinkStyled>
            <NavLinkStyled to="/" className="nav-link">
              <IconStyled className="bi bi-card-list" />
              Lists
            </NavLinkStyled>
            <NavLinkStyled to="/" className="nav-link">
              <IconStyled className="bi bi-bookmark" />
              Bookmarks
            </NavLinkStyled>
            <NavLinkStyled to="/" className="nav-link">
              <IconStyled className="bi bi-twitter" />
              Twitter Blue
            </NavLinkStyled>
            <NavLinkStyled to="/" className="nav-link">
              <IconStyled className="bi bi-person" />
              Profile
            </NavLinkStyled>
          </>
        )}
      </Nav>
      {user && (
        <div className="d-flex">
          <Button className="rounded-pill text-white flex-grow-1 m-2 py-2 fs-5">
            Tweet
          </Button>
        </div>
      )}
    </nav>
  );
}
