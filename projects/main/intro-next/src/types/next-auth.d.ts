import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
  }
  interface Session {
    user: User & { id: string; email: string };
    token: {
      email: string;
    };
  }
}
