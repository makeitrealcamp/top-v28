import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import theme from '../theme';
import Home from './Home';
import { getTweet } from '../fixtures/tweet.fixture';
import { getTweets } from '../api/tweets';

vi.mock('../api/tweets', () => {
  return {
    getTweets: vi.fn(),
  };
});

describe('Home Page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('display tweets', async () => {
    const tweet = getTweet();

    getTweets.mockResolvedValueOnce([tweet]);

    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </BrowserRouter>,
    );

    expect(await screen.findByText(tweet.content)).toBeTruthy();
  });
});
