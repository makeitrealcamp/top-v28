import { useContext, useEffect, useState } from 'react';
import Create from '../components/Create';
import Tweet from '../components/Tweet';
import UserContext from '../containers/UserContext';
import { getTweets } from '../api/tweets';

export default function Home() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);

  async function loadTweets() {
    const response = await getTweets();
    setData(response);
  }

  useEffect(() => {
    loadTweets();
  }, []);

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Home</h1>
      {user && <Create />}
      {data.map(function (item, index) {
        return (
          <Tweet
            key={item.id}
            name={item.user.name}
            username={item.user.username}
            photo={item.user.photo}
            content={item.content}
            createdAt={item.createdAt}
          />
        );
      })}
    </>
  );
}
