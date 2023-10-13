import React from 'react';
import { describe, test, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import theme from '../theme';
import Home from './Home';
import { getTweet } from '../fixtures/tweet.fixture';
import { UserProvider } from '../containers/UserContext';
import { getUser } from '../fixtures/user.fixture';

const tweet = getTweet();

vi.mock('../domain/useTweets', () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {
        data: [tweet],
        loading: false,
        error: null,
        actions: {
          create: () => {},
          like: () => {},
        },
      };
    }),
  };
});

describe('Home Page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('display tweets', async () => {
    const user = getUser();

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
