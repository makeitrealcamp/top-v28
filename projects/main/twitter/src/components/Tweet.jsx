import { memo } from 'react';
import { formatRelative } from 'date-fns';

import { formatNumber } from '../utils';
import styled from '@emotion/styled';

const StatisticContainer = styled('div')(({ theme }) => ({
  fontSize: theme.fonts[0],
}));

const Tweet = memo(function Tweet({
  id = '',
  content = '',
  createdAt = '',
  name = '',
  profilePhoto = '',
  username = '',
  tweetPhoto = '',
  commentsCount = 0,
  retweetsCount = 0,
  likesCount = 0,
  viewsCount = 0,
  liked = false,
  onSelect = () => {},
  onLike = () => {},
}) {
  console.count(`render Tweet ${id}`);

  const handleSelect = (event) => onSelect(event, { id });
  const handleLike = (event) => onLike(event, { id });

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
        {tweetPhoto && (
          <img
            src={`${import.meta.env.VITE_API_URL}/${tweetPhoto}`}
            width="100%"
          />
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
              className={liked ? 'bi bi-heart-fill' : 'bi bi-heart'}
              style={{ color: liked ? 'red' : 'inherit' }}
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
