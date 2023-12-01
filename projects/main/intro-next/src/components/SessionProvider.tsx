'use client';

import { SessionProvider as AuthProvider } from 'next-auth/react';

export default function SessionProvider({
  session,
  children,
}: {
  session: any;
  children: React.ReactNode;
}) {
  return <AuthProvider session={session}>{children}</AuthProvider>;
}
