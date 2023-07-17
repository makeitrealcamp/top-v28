import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";

import theme from "../theme";
import App from "../App";
import { getUser } from "../fixtures/user.fixture";

describe("SingUp", () => {
  test("create the account", async () => {
    const user = getUser();

    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Sign Up"));

    expect(await screen.findByText("Personal information")).toBeTruthy();

    const name = screen.getByPlaceholderText("Enter Name");
    const username = screen.getByPlaceholderText("Enter Username");
    const biography = screen.getByPlaceholderText("About you");
    const location = screen.getByPlaceholderText("Location");
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
        value: "Biography Test",
      },
    });
    fireEvent.change(location, {
      target: {
        value: "Location test",
      },
    });
    fireEvent.change(email, {
      target: {
        value: user.email,
      },
    });

    fireEvent.change(password, {
      target: {
        value: "12345678",
      },
    });

    const submit = screen.getByText("Submit");

    fireEvent.click(submit);
    await waitFor(() => expect(screen.queryByText("Required")).toBeNull());
  });
});
