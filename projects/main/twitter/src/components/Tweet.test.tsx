import React from 'react';
import { describe, test, expect } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWithTheme } from '../test/utils';
import { getTweet } from '../fixtures/tweet.fixture';
import Tweet from './Tweet';

describe('Tweet component', () => {
  test('render basic information', () => {
    const { user, id, content, createdAt } = getTweet();

    renderWithTheme(
      <Tweet
        id={id}
        name={user.name}
        username={user.username}
        photo={user.profilePhoto}
        content={content}
        createdAt={createdAt}
        commentsCount={0}
        likesCount={0}
        isLiked={false}
        onSelect={() => {}}
        onLike={() => {}}
      />,
    );

    expect(screen.getByText(user.name)).toBeTruthy();
    expect(screen.getByText(`@${user.username}`)).toBeTruthy();
    expect(screen.getByText(content)).toBeTruthy();
  });
});
