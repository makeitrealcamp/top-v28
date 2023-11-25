import React from 'react';

async function fetchPost(id: string) {
  const result = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return await result.json();
}

async function postPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await fetchPost(id);
  console.log({ post });
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

export default postPage;
