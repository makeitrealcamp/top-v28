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
    const { debug } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>,
    );

    // 2. Click on 'Sign Up' button

    fireEvent.click(screen.getByText('Sign Up'));

    // 3. Visit 'Sign Up' page

    expect(await screen.findByText('Personal information')).toBeTruthy();

    // 4. Fill out form and Fill out field by field

    const name = screen.getByPlaceholderText('Enter Name');
    const username = screen.getByPlaceholderText(/Username/i);
    const biography = screen.getByPlaceholderText(/About/i);
    const location = screen.getByPlaceholderText(/location/i);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);

    fireEvent.change(name, {
      target: {
        value: user.name,
      },
    });

    fireEvent.change(username, {
      target: {
        value: user.username,
      },
    });

    fireEvent.change(biography, {
      target: {
        value:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem totam voluptatum, nihil sit accusamus minima rem corrupti adipisci nobis, commodi ratione voluptate non rerum molestiae porro dicta et officiis magnam.',
      },
    });

    fireEvent.change(location, {
      target: {
        value: 'Bogota',
      },
    });

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

    // 5. Click on Submit Button display no errors

    const submit = screen.getByText('Submit');

    fireEvent.click(submit);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(screen.queryByText('Required')).toBeNull();

    debug();
  });
});
