import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { userService } from '../../users/(services)';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/libs/prismaClient';
import { NextAuthOptions } from 'next-auth';
import { authService } from '../(authService)';
import { config } from '@/libs';

export const authOptions: NextAuthOptions = {
  secret: config.getNextAuthSecret(),

  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: config.getGithubClientId(),
      clientSecret: config.getGithubSecret(),
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await authService.loginUser({
          email: credentials?.email,
          password: credentials?.password,
        });
        if (user) {
          console.log('*****');
          console.log({ user });
          console.log('*****');
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token, user }) {
      console.log({ session, token, user });

      if (user) {
        return {
          ...session,
          id: user.id,
          email: user.email,
        };
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log({ token, user, account, profile, isNewUser });

      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
        };
      }
      return token;
    },
  },
};
