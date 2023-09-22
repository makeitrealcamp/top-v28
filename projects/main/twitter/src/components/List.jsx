import Tweet from './Tweet';

export default function List({ list = [], displayTweet }) {
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
        onClick={() => displayTweet(item)}
      />
    );
  });
}
