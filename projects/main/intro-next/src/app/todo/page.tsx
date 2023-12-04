import { prisma } from '@/libs';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createUser } from '../signup/actions';

async function fetchToDos() {
  'use server';
  //   const result = await prisma.todo.findMany();
  const response = await fetch('http://localhost:3000/api/todo', {
    next: {
      tags: ['todo-list'],
    },
  });

  const data = await response.json();
  return data 
}

async function fetchUsers() {
    'use server';
    const response = await fetch('http://localhost:3000/api/users', {
        next: {
        tags: ['users-list'],
        },
    });
    
    const data = await response.json();
    return data 
}

async function createTodo(data: FormData) {
  'use server';
  const title = data.get('title') as string;

  const response = await fetch('http://localhost:3000/api/todo', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });

  //   const result = await prisma.todo.create({
  //     data: {
  //       title,
  //     },
  //   });
  const todo = await response.json();
  console.log({ todo });

  //   revalidatePath('/todo');

  revalidateTag('todo-list');
}

export default async function postPages() {
  const toDos = await fetchToDos();
  console.log({ toDos });

  const users = await fetchUsers();
    console.log(users);
//   if (!toDos.length) return <div>Loading...</div>;
  return (
    <div>
      <h1>To do</h1>

      <form action={createTodo} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Task title
          </label>
          <input
            name="title"
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full px-4 py-2.5 text-sm font-medium leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
        >
          Submit
        </button>
      </form>

      <ul>
        {toDos.data.map((post: any) => (
          <li key={post.id}>
            {post.title}
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <ul>
        {users.users.map((user: any) => (
          <li key={user.id}>
            {user.email}
  
          </li>
        ))}
      </ul>
      <form action={createUser} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          name="email"
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@email.com"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          name="password"
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      {/* <div className='flex items-start mb-5'>
        <div className='flex items-center h-5'>
          <input
            id='remember'
            type='checkbox'
            value=''
            className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
            required
          />
        </div>
        <label
          htmlFor='remember'
          className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
          Remember me
        </label>
      </div> */}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
    </div>
  );
}
