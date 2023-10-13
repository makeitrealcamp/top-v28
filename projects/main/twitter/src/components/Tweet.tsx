import React, { memo } from 'react';
import { formatRelative } from 'date-fns';

import { formatNumber } from '../utils';
import styled from '@emotion/styled';
import { TweetType } from '../api/tweets/types';
import { UserType } from '../api/users/types';

const StatisticContainer = styled('div')(({ theme }) => ({
  fontSize: theme.fonts[0],
}));

type TweetProps = Omit<TweetType, 'user' | 'userId' | 'updatedAt'> &
  Omit<UserType, 'email'> & {
    retweetsCount?: number;
    viewsCount?: number;
  } & {
    onSelect: (event: React.MouseEvent, { id }: { id: string }) => void;
    onLike: (event: React.MouseEvent, { id }: { id: string }) => void;
  };

const Tweet = memo(function Tweet({
  id = '',
  content = '',
  photo = '',
  createdAt = '',
  commentsCount = 0,
  likesCount = 0,
  isLiked = false,
  retweetsCount = 0,
  viewsCount = 0,
  name = '',
  username = '',
  profilePhoto = '',
  onSelect = () => {},
  onLike = () => {},
}: TweetProps) {
  const handleSelect = (event: React.MouseEvent) => onSelect(event, { id });
  const handleLike = (event: React.MouseEvent) => onLike(event, { id });

  return (
    <section
      className="tweet d-flex gap-2 border-bottom py-3"
      onClick={handleSelect}
    >
      <div className="d-flex">
        <div className="p-2">
          {profilePhoto ? (
            <img
              src={`${import.meta.env.VITE_API_URL}/${profilePhoto}`}
              className="rounded-circle object-fit-cover"
              width={48}
              height={48}
            />
          ) : (
            <img src="https://placehold.co/48x48" className="rounded-circle " />
          )}
        </div>
      </div>
      <article className="d-flex flex-column gap-1 flex-grow-1">
        <header>
          <strong>{name}</strong>{' '}
          <span className="text-secondary">@{username}</span>
          <span className="text-secondary">
            {' '}
            • {formatRelative(new Date(createdAt), new Date())}
          </span>
        </header>
        <section>{content}</section>
        {photo && (
          <img src={`${import.meta.env.VITE_API_URL}/${photo}`} width="100%" />
        )}
        <footer className="d-flex justify-content-between mt-3 border-top pt-3">
          <StatisticContainer data-cy="comment">
            <i className="bi bi-chat"></i> {formatNumber(commentsCount)}
          </StatisticContainer>
          <StatisticContainer>
            <i className="bi bi-repeat"></i> {formatNumber(retweetsCount)}
          </StatisticContainer>
          <StatisticContainer data-cy="likes" onClick={handleLike}>
            <i
              className={isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'}
              style={{ color: isLiked ? 'red' : 'inherit' }}
            ></i>{' '}
            {formatNumber(likesCount)}
          </StatisticContainer>
          <StatisticContainer>
            <i className="bi bi-bar-chart"></i> {formatNumber(viewsCount)}
          </StatisticContainer>
          <StatisticContainer className="me-5">
            <i className="bi bi-box-arrow-up"></i>
          </StatisticContainer>
        </footer>
      </article>
    </section>
  );
});

export default Tweet;
