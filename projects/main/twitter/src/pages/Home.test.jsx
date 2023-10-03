import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import theme from '../theme';
import Home from './Home';
import { getTweet } from '../fixtures/tweet.fixture';
import useTweets from '../domain/useTweets';
import { UserProvider } from '../containers/UserContext';
import { getUser } from '../fixtures/user.fixture';

vi.mock('../domain/useTweets', () => {
  return {
    default: vi.fn(),
  };
});

describe('Home Page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('display tweets', async () => {
    const tweet = getTweet();
    const user = getUser();

    useTweets.mockImplementation(() => {
      return {
        data: [tweet],
        loading: false,
        error: null,
        actions: {
          create: () => {},
          like: () => {},
        },
      };
    });

    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <UserProvider overrides={{ user }}>
            <Home />
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>,
    );

    expect(await screen.findByText(tweet.content)).toBeTruthy();
  });
});
