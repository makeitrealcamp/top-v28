import React from 'react';
import Tweet from './Tweet';
import { TweetType } from '../api/tweets/types';

type ListProps = {
  list: TweetType[];
  onSelect: (event: React.MouseEvent, { id }: { id: string }) => void;
  onLike: (event: React.MouseEvent, { id }: { id: string }) => void;
};

export default function List({
  list = [],
  onSelect,
  onLike,
}: ListProps): JSX.Element {
  return (
    <>
      {list.map(function (item) {
        return (
          <Tweet
            key={item.id}
            id={item.id}
            name={item.user.name}
            username={item.user.username}
            profilePhoto={item.user.profilePhoto}
            content={item.content}
            photo={item.photo}
            createdAt={item.createdAt}
            commentsCount={item.commentsCount}
            likesCount={item.likesCount}
            isLiked={item.isLiked}
            onSelect={onSelect}
            onLike={onLike}
          />
        );
      })}
    </>
  );
}
