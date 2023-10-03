import { screen } from '@testing-library/react';

import { renderWithTheme } from '../test/utils';
import { getUser } from '../fixtures/user.fixture';
import { UserProvider } from '../containers/UserContext';
import Profile from './Profile';

describe('Profile component', () => {
  test('render basic information', () => {
    const user = getUser();

    renderWithTheme(
      <UserProvider overrides={{ user }}>
        <Profile />
      </UserProvider>,
    );

    expect(screen.getByText(user.name)).toBeTruthy();
    expect(screen.getByText(`@${user.username}`)).toBeTruthy();
  });
});
