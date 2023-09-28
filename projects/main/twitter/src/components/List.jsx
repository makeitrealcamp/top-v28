import Tweet from './Tweet';

export default function List({ list = [], onSelect, onLike }) {
  return list.map(function (item) {
    return (
      <Tweet
        key={item.id}
        name={item.user.name}
        username={item.user.username}
        profilePhoto={item.user.profilePhoto}
        content={item.content}
        tweetPhoto={item.photo}
        createdAt={item.createdAt}
        commentsCount={item.commentsCount}
        likesCount={item.likesCount}
        liked={item.isLiked}
        onClick={(event) => onSelect(event, item)}
        onLike={(event) => onLike(event, item)}
      />
    );
  });
}
