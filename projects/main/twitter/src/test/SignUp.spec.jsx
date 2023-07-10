import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import theme from '../theme';
import App from '../App';
import { getUser } from '../fixtures/user.fixture';

describe('prueba de integración hacia <SignUp/>', () => {
  test('Debe de ingrear a la pagina de signup y no mostrar error al hacer submit', async () => {
    const user = getUser();
    const fullUser = {
      ...user,
      biography: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      location: 'Bogota',
      password: '123456789',
    };

    // 1. Visit Home Page
    render(
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

    // 4. Fill out form
    // 4.x Fill out field by field
    fireEvent.click(screen.getByText('Submit'));
    expect((await screen.findAllByText('Required')).length).toBe(6);
    fireEvent.change(screen.getByPlaceholderText('Enter Name'), {
      target: {
        value: fullUser.name,
      },
    });
    expect(await screen.findByDisplayValue(fullUser.name));
    expect((await screen.findAllByText('Required')).length).toBe(5);
    fireEvent.change(screen.getByPlaceholderText('Enter Username'), {
      target: {
        value: fullUser.username,
      },
    });
    expect(await screen.findByDisplayValue(fullUser.username));
    expect((await screen.findAllByText('Required')).length).toBe(4);

    fireEvent.change(screen.getByPlaceholderText('About you'), {
      target: {
        value: fullUser.biography,
      },
    });
    expect(await screen.findByText(fullUser.biography));
    expect((await screen.findAllByText('Required')).length).toBe(3);
    fireEvent.change(screen.getByPlaceholderText('Location'), {
      target: {
        value: fullUser.location,
      },
    });
    expect(await screen.findByDisplayValue(fullUser.location));
    expect((await screen.findAllByText('Required')).length).toBe(2);
    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: {
        value: fullUser.email,
      },
    });
    expect(await screen.findByDisplayValue(fullUser.email));
    expect((await screen.findAllByText('Required')).length).toBe(1);
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: {
        value: fullUser.password,
      },
    });
    expect(await screen.findByDisplayValue(fullUser.password));
    expect(screen.queryAllByText('Required').length).toBe(0);

    // 5. Click on Submit Button display no errors
    fireEvent.click(screen.getByText('Submit'));
  });
});
