import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';

import theme from '../theme';
import App from '../App';
import { getUser } from '../fixtures/user.fixture';

describe('Sign in', () => {
  test('redirects to home page after signing in', async () => {
    const user = getUser();

    // 1. Visit Home Page
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>,
    );

    // 2. Click on 'Sign In' button

    fireEvent.click(screen.getByText('Sign In'));

    // 3. Visit 'Sign In' page

    expect(await screen.findByText('Email address')).toBeTruthy();

    // 4. Fill out a valid email and password

    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);

    fireEvent.change(email, {
      target: {
        value: user.email,
      },
    });

    fireEvent.change(password, {
      target: {
        value: '12345678',
      },
    });

    const submit = screen.getByText('Submit');

    fireEvent.click(submit);

    // 5. Visit Home Page

    expect(await screen.findByText('Home')).toBeTruthy();
  });
});
