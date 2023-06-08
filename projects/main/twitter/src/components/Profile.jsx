import React from 'react';
import User from './User';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styled from '@emotion/styled';

const ProfileContainer = styled('div')(({ theme }) => ({
  borderRadius: theme.border.radius.pill,
  '&:hover': {
    backgroundColor: theme.colors['gray-200'],
    color: theme.colors['gray-900'],
  },
}));

export default function Profile() {
  return (
    <ProfileContainer>
      <User>
        <div className="d-flex align-items-center">
          <DropdownButton
            drop="up"
            variant=""
            title={<i className="bi bi-three-dots fs-5"></i>}
          >
            <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
            <Dropdown.Item eventKey="2">Security & Password</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="3">Sign Out</Dropdown.Item>
          </DropdownButton>
        </div>
      </User>
    </ProfileContainer>
  );
}
