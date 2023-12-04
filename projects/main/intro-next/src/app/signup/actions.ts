import { config, prisma } from '@/libs';
import { redirect } from 'next/navigation';

export async function singUp(data: FormData) {
  'use server';

  const email = data.get('email');
  const password = data.get('password');

  const response = await fetch(`${config.getApiUrl()}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
//   redirect('/login');
}

export async function createUser(data: FormData) {
  'use server';
  const email = data.get('email') as string;
  const password = data.get('password') as string;
  const user = await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });
}
