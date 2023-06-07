import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styled from '@emotion/styled';

const NavLinkStyled = styled(Nav.Link)(({ theme }) => ({
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
    <nav className='mb-4'>
      <Nav
        defaultActiveKey='/home'
        className='flex-column fs-5 gap-2 align-items-start'
      >
        <Nav.Link>
          <IconStyled className='bi bi-twitter fs-2' />
        </Nav.Link>
        <NavLinkStyled href='/home' active>
          <IconStyled className='bi bi-house-door-fill' />
          Home
        </NavLinkStyled>
        <NavLinkStyled href='/'>
          <IconStyled className='bi bi-hash' />
          Explore
        </NavLinkStyled>
        {user && (
          <>
            <NavLinkStyled href='/'>
              <IconStyled className='bi bi-bell' />
              Notifications
            </NavLinkStyled>
            <NavLinkStyled href='/'>
              <IconStyled className='bi bi-envelope' />
              Messages
            </NavLinkStyled>
            <NavLinkStyled href='/'>
              <IconStyled className='bi bi-card-list' />
              Lists
            </NavLinkStyled>
            <NavLinkStyled href='/'>
              <IconStyled className='bi bi-bookmark' />
              Bookmarks
            </NavLinkStyled>
            <NavLinkStyled href='/'>
              <IconStyled className='bi bi-twitter' />
              Twitter Blue
            </NavLinkStyled>
            <NavLinkStyled href='/'>
              <IconStyled className='bi bi-person' />
              Profile
            </NavLinkStyled>
          </>
        )}
      </Nav>
      {user && (
        <div className='d-flex'>
          <Button className='rounded-pill text-white flex-grow-1 m-2 py-2 fs-5'>
            Tweet
          </Button>
        </div>
      )}
    </nav>
  );
}
