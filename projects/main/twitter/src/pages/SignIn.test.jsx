import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SignIn from './SignIn';
import { getUser } from '../fixtures/user.fixture';

describe('Sign In Page', () => {
  test('display error when password is too short', async () => {
    const user = getUser();
    const message = 'String must contain at least 6 character(s)';

    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );

    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);

    fireEvent.change(email, {
      target: {
        value: user.email,
      },
    });

    fireEvent.change(password, {
      target: {
        value: '1234',
      },
    });

    const submit = screen.getByText('Submit');

    fireEvent.click(submit);

    expect(await screen.findByText(message)).toBeTruthy();
  });
});
