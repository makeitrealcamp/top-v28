import Link from 'next/link';
import React from 'react';

async function fetchPosts() {
  const result = await fetch('https://jsonplaceholder.typicode.com/posts');
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const Query =``

  return await result.json();
}

export default async function postPages() {
  const posts = await fetchPosts();
  console.log({ posts });
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            {post.title}
            <p>{post.body}</p>
            <Link href={`/posts/${post.id}`}>
              <span>Read more</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
