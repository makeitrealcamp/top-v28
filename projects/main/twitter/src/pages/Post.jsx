import styled from '@emotion/styled';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import useComments from '../domain/useComments';
import useTweet from '../domain/useTweet';
import Create from '../components/Create';
import Tweet from '../components/Tweet';
import UserContext from '../containers/UserContext';

const CommentsContainer = styled('div')(({ theme }) => {
  return {
    paddingLeft: theme.space[5],
    paddingTop: theme.space[3],
  };
});

export default function Post() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    data,
    loading,
    error,
    actions: { like },
  } = useTweet({ id });
  const {
    data: comments,
    actions: { create, like: likeComment },
  } = useComments({ tweetId: id });

  async function onCreate(payload) {
    const formData = payload;
    formData.append('parentId', id);
    await create(formData);
  }

  async function onLike(event, item) {
    event.stopPropagation();
    await like({ id: item.id });
  }

  async function onLikeComment(event, item) {
    event.stopPropagation();
    await likeComment({ id: item.id });
  }

  function displayTweet(event, { id }) {
    navigate(`/tweet/${id}`);
  }

  return (
    <>
      <h1 className="fs-4 my-2 fw-bolder">Tweet</h1>
      {loading && <Spinner />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data && (
        <Tweet
          name={data.user.name}
          username={data.user.username}
          profilePhoto={data.user.profilePhoto}
          content={data.content}
          tweetPhoto={data.photo}
          createdAt={data.createdAt}
          commentsCount={data.commentsCount}
          likesCount={data.likesCount}
          liked={data.isLiked}
          onLike={(event) => onLike(event, data)}
        />
      )}
      <CommentsContainer>
        <Create
          onCreate={onCreate}
          profilePhoto={user.profilePhoto}
          createLabel="Comment"
        />
        {comments &&
          comments.map((item) => (
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
              onClick={(event) => displayTweet(event, item)}
              onLike={(event) => onLikeComment(event, item)}
            />
          ))}
      </CommentsContainer>
    </>
  );
}
