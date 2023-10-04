import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';

import User from './User';

const ProfileContainer = styled('div')(({ theme }) => ({
  borderRadius: theme.border.radius.pill,
  '&:hover': {
    backgroundColor: theme.colors['gray-200'],
    color: theme.colors['gray-900'],
  },
}));

export default function Profile() {
  const { logout, user } = useAuth0();

  function SignOut() {
    logout();
  }

  return (
    user && (
      <ProfileContainer>
        <User name={user.name} username={user.nickname} photo={user.picture}>
          <div className="d-flex align-items-center">
            <DropdownButton
              drop="up"
              variant=""
              title={<i className="bi bi-three-dots fs-5"></i>}
            >
              <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
              <Dropdown.Item eventKey="2">Security & Password</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3" onClick={SignOut}>
                Sign Out
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </User>
      </ProfileContainer>
    )
  );
}
