import { render, screen } from '@testing-library/react';

import { getUser } from '../fixtures/user.fixture';
import User from './User';

describe('User component', () => {
  test('render basic information', () => {
    const user = getUser();

    render(
      <User name={user.name} username={user.username} photo={user.photo} />,
    );

    expect(screen.getByText(user.name)).toBeTruthy();
    expect(screen.getByText(`@${user.username}`)).toBeTruthy();
  });
});
