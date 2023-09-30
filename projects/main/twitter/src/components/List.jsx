import { useMemo } from 'react';
import Tweet from './Tweet';

export default function List({ list = [], onSelect, onLike }) {
  // Expensive calculations should be wrapper in a useMemo
  // const data = useMemo(
  //   function () {
  //     return list.filter(function (item){
  //       return item.name.contains(filter)
  //     })
  //   },
  //   [list, filter]
  // )

  return list.map(function (item) {
    return (
      <Tweet
        key={item.id}
        id={item.id}
        name={item.user.name}
        username={item.user.username}
        profilePhoto={item.user.profilePhoto}
        content={item.content}
        tweetPhoto={item.photo}
        createdAt={item.createdAt}
        commentsCount={item.commentsCount}
        likesCount={item.likesCount}
        liked={item.isLiked}
        onSelect={onSelect}
        onLike={onLike}
      />
    );
  });
}
